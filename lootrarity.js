/**
 * 1. Initialize new node project (npm init -y)
 * 2. Run: npm install ethers
 * 3. Add private key where PRIVATE_KEY
 * 4. Add the ID of your LOOTRARITY Tokens
 * 5. Run: node lootrarity.js
 */
const ethers = require("ethers");
const { parseUnits, formatUnits } = require("@ethersproject/units");
var colors = require("colors");

let keys = require("dotenv").config({ path: __dirname + "/.env" });
const PVT_KEY = keys.parsed.PVT_KEY;
const LOOT_MEMBERS = keys.parsed.LOOT_IDS.split(",").map(Number);
const GAS_THRESHOLD = keys.parsed.GAS_THRESHOLD ?? "60";
const GAS_MULTIPLIER = parseFloat(keys.parsed.GAS_MULTIPLIER ?? "1.00");
// Provider
const provider = new ethers.providers.JsonRpcProvider("https://rpc.ftm.tools/");
const wallet = new ethers.Wallet(PVT_KEY, provider);
const account = wallet.connect(provider);

const rarityAbi = require("./abis/rarity.json");
const goldAbi = require("./abis/gold.json");
const cellarAbi = require("./abis/cellar.json");

const lootContract = new ethers.Contract(
  "0xce761D788DF608BD21bdd59d6f4B54b2e27F25Bb",
  rarityAbi,
  account
);

const goldContract = new ethers.Contract(
  "0x2069B76Afe6b734Fb65D1d099E7ec64ee9CC76B2",
  goldAbi,
  account
);

const cellarContract = new ethers.Contract(
  "0x2A0F1cB17680161cF255348dDFDeE94ea8Ca196A",
  cellarAbi,
  account
);

function gasChecker(gasPrice) {
  if (Number(formatUnits(gasPrice, "gwei")) < Number(GAS_THRESHOLD)) {
    return true;
  }
  return false;
}

async function adventure(id) {
  // get the data for the tx
  const gasPrice = await provider.getGasPrice();
  if (gasChecker(gasPrice)) {
    console.log(
      "Sending tx | GasNow = %s gwei -> Using = %s gwei".green,
      formatUnits(gasPrice, "gwei"),
      formatUnits(gasPrice, "gwei") * GAS_MULTIPLIER
    );
    const nonce = await provider.getTransactionCount(wallet.address);
    // construct the tx
    const tx = await lootContract.adventure(id, {
      gasLimit: 210000,
      gasPrice: gasPrice * GAS_MULTIPLIER,
      nonce,
    });
    // Get tx details
    const receipt = await tx.wait();
    // Show tx on log
    console.log("ID %s went to farm XP - Transaction receipt: %s", id, receipt);
  } else {
    console.log("Damm! Gas too high! [%s]".red, formatUnits(gasPrice, "gwei"));
  }
}

async function adventure_cellar(id) {
  // get the data for the tx
  const gasPrice = await provider.getGasPrice();
  if (gasChecker(gasPrice)) {
    const scoutResult = await cellarContract.scout(id);
    if (scoutResult.gt(ethers.BigNumber.from(0))) {
      console.log(
        "Sending tx | GasNow = %s gwei -> Using = %s gwei".green,
        formatUnits(gasPrice, "gwei"),
        formatUnits(gasPrice, "gwei") * GAS_MULTIPLIER
      );
      const nonce = await provider.getTransactionCount(wallet.address);
      // construct the tx
      const tx = await cellarContract.adventure(id, {
        gasLimit: 210000,
        gasPrice: gasPrice * GAS_MULTIPLIER,
        nonce,
      });
      // Get tx details
      const receipt = await tx.wait();
      // Show tx on log
      console.log(
        "ID %s went to The Cellar - Transaction receipt: %s",
        id,
        receipt
      );
    } else {
      console.log(
        "You are not eligible for any loot from The Cellar, skipping summoner.."
      );
    }
  } else {
    console.log("Damm! Gas too high! [%s]".red, formatUnits(gasPrice, "gwei"));
  }
}

async function level_up(id) {
  // get the data for the tx
  const gasPrice = await provider.getGasPrice();
  if (gasChecker(gasPrice)) {
    console.log(
      "Sending tx | GasNow = %s gwei -> Using = %s gwei",
      formatUnits(gasPrice, "gwei"),
      formatUnits(gasPrice, "gwei") * GAS_MULTIPLIER
    );
    const nonce = await provider.getTransactionCount(wallet.address);

    // construct the tx
    const tx = await lootContract.level_up(id, {
      gasLimit: 210000,
      gasPrice: gasPrice,
      nonce,
    });
    // Get tx details
    const receipt = await tx.wait();
    // Show tx on log
    console.log("Upgrading level of %s. Transaction receipt: %s", id, receipt);
  } else {
    console.log("Damm! Gas too high! [%s]", formatUnits(gasPrice, "gwei"));
  }
}

async function claim_gold(id) {
  // get the data for the tx
  const gasPrice = await provider.getGasPrice();
  if (gasChecker(gasPrice)) {
    console.log(
      "Sending tx | GasNow = %s gwei -> Using = %s gwei",
      formatUnits(gasPrice, "gwei"),
      formatUnits(gasPrice, "gwei") * GAS_MULTIPLIER
    );
    const nonce = await provider.getTransactionCount(wallet.address);

    // construct the tx
    const tx = await goldContract.claim(id, {
      gasLimit: 210000,
      gasPrice: gasPrice,
      nonce,
    });
    // Get tx details
    const receipt = await tx.wait();
    // Show tx on log
    console.log(
      "Claiming Gold for ID[%s]. Transaction receipt: %s",
      id,
      receipt
    );
  } else {
    console.log("Damm! Gas too high! [%s]", formatUnits(gasPrice, "gwei"));
  }
}

const farm = async () => {
  for (let i = 0; i < LOOT_MEMBERS.length; i++) {
    console.log("--------------------------------------------------");
    try {
      // Time to farm checker
      const nextAdventureTime = await lootContract.adventurers_log(
        LOOT_MEMBERS[i]
      );
      const now = Date.now();

      // Get Display Info
      const loot_class = await lootContract.class(LOOT_MEMBERS[i]);
      let loot_level = await lootContract.level(LOOT_MEMBERS[i]);
      const loot_exp = await lootContract.xp(LOOT_MEMBERS[i]);
      const loot_exp_req = await lootContract.xp_required(loot_level);
      console.log(
        `ID:${LOOT_MEMBERS[i]} |`.yellow,
        `class: ${loot_class.toNumber()}`.green,
        " - ",
        `Level[${loot_level}]`.blue,
        "|",
        `XP:[${loot_exp / 1000000000000000000}] | Required XP: [${
          loot_exp_req / 1000000000000000000
        }]`.magenta
      );

      if (now < nextAdventureTime.toNumber() * 1000) {
        console.log(
          `ID ${LOOT_MEMBERS[i]} |`.yellow,
          " NOT ready to adventure".bold.red
        );
        console.log(
          "Next Adventure Time:".cyan,
          new Date(nextAdventureTime.toNumber() * 1000).toString()
        );
        continue;
      }
      console.log("ID %s is ready to adventure".bold.green, LOOT_MEMBERS[i]);

      if (loot_exp_req - loot_exp <= 0) {
        console.log("Upgrade level!".green);
        // Upgrade Level
        await level_up(LOOT_MEMBERS[i]);
      }

      loot_level = await lootContract.level(LOOT_MEMBERS[i]);
      if (loot_level >= 2) {
        // Claim Gold
        await claim_gold(LOOT_MEMBERS[i]);
      }
      // Claim xp
      await adventure(LOOT_MEMBERS[i]);
      // Send to The Cellar
      await adventure_cellar(LOOT_MEMBERS[i]);
    } catch (e) {
      console.log("Error Happened: %s", e);
    }
  }
  console.log("--------------------------------------------------");
};

const main = async () => {
  console.log("--------------- LOOT&RARITY Farmer ---------------".bold.cyan);
  console.log(
    "GAS_THRESHOLD:",
    GAS_THRESHOLD,
    "| GAS_MULTIPLIER:",
    GAS_MULTIPLIER
  );
  const gasPrice = await provider.getGasPrice();
  if (Number(formatUnits(gasPrice, "gwei")) > Number(GAS_THRESHOLD)) {
    console.log(
      "Gas Price is too damn high: %s",
      formatUnits(gasPrice, "gwei")
    );
  } else {
    await farm();
  }
};

main();
