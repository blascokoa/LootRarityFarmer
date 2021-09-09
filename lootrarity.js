/**
 * 1. Initialize new node project (npm init -y)
 * 2. Run: npm install ethers
 * 3. Add private key where PRIVATE_KEY
 * 4. Add the ID of your LOOTRARITY Tokens
 * 5. Run: node lootrarity.js
 */
const ethers = require("ethers");
const { parseUnits, formatUnits } = require("@ethersproject/units");
var colors = require('colors');

let keys = require('dotenv').config({path: __dirname + '/.env'});
const PVT_KEY = keys.parsed.PVT_KEY;
const LOOT_MEMBERS = keys.parsed.LOOT_IDS.split(",").map(Number)
const GAS_THRESHOLD = keys.parsed.GAS_THRESHOLD ?? "60"
const GAS_MULTIPLIER = parseFloat(keys.parsed.GAS_MULTIPLIER ?? "1.00")

// Provider
const wallet = new ethers.Wallet(PVT_KEY, provider)
const account = wallet.connect(provider)
const provider = new ethers.providers.JsonRpcProvider("https://rpc.ftm.tools/");

// LootRarity contract
const lootContract = new ethers.Contract(
    "0xce761D788DF608BD21bdd59d6f4B54b2e27F25Bb",
    [{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":false,"internalType":"uint256","name":"level","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"summoner","type":"uint256"}],"name":"leveled","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":false,"internalType":"uint256","name":"class","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"summoner","type":"uint256"}],"name":"summoned","type":"event"},{"inputs":[{"internalType":"uint256","name":"_summoner","type":"uint256"}],"name":"adventure","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"adventurers_log","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"class","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"id","type":"uint256"}],"name":"classes","outputs":[{"internalType":"string","name":"description","type":"string"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"level","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_summoner","type":"uint256"}],"name":"level_up","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"next_summoner","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_summoner","type":"uint256"},{"internalType":"uint256","name":"_xp","type":"uint256"}],"name":"spend_xp","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_class","type":"uint256"}],"name":"summon","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_summoner","type":"uint256"}],"name":"summoner","outputs":[{"internalType":"uint256","name":"_xp","type":"uint256"},{"internalType":"uint256","name":"_log","type":"uint256"},{"internalType":"uint256","name":"_class","type":"uint256"},{"internalType":"uint256","name":"_level","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_summoner","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"xp","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"curent_level","type":"uint256"}],"name":"xp_required","outputs":[{"internalType":"uint256","name":"xp_to_next_level","type":"uint256"}],"stateMutability":"pure","type":"function"}],
    account
);

const goldContract = new ethers.Contract(
    "0x2069B76Afe6b734Fb65D1d099E7ec64ee9CC76B2",
    [{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"from","type":"uint256"},{"indexed":true,"internalType":"uint256","name":"to","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"from","type":"uint256"},{"indexed":true,"internalType":"uint256","name":"to","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"from","type":"uint256"},{"internalType":"uint256","name":"spender","type":"uint256"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"summoner","type":"uint256"}],"name":"claim","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"summoner","type":"uint256"}],"name":"claimable","outputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"claimed","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"from","type":"uint256"},{"internalType":"uint256","name":"to","type":"uint256"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"executor","type":"uint256"},{"internalType":"uint256","name":"from","type":"uint256"},{"internalType":"uint256","name":"to","type":"uint256"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"level","type":"uint256"}],"name":"wealth_by_level","outputs":[{"internalType":"uint256","name":"wealth","type":"uint256"}],"stateMutability":"pure","type":"function"}],
    account
);

const cellarContract = new ethers.Contract(
  "0x2A0F1cB17680161cF255348dDFDeE94ea8Ca196A",
  [
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "uint256",
          name: "from",
          type: "uint256",
        },
        { indexed: true, internalType: "uint256", name: "to", type: "uint256" },
        {
          indexed: false,
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "Approval",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "uint256",
          name: "from",
          type: "uint256",
        },
        { indexed: true, internalType: "uint256", name: "to", type: "uint256" },
        {
          indexed: false,
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "Transfer",
      type: "event",
    },
    {
      inputs: [{ internalType: "uint256", name: "_summoner", type: "uint256" }],
      name: "adventure",
      outputs: [{ internalType: "uint256", name: "reward", type: "uint256" }],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      name: "adventurers_log",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "uint256", name: "", type: "uint256" },
        { internalType: "uint256", name: "", type: "uint256" },
      ],
      name: "allowance",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "uint256", name: "from", type: "uint256" },
        { internalType: "uint256", name: "spender", type: "uint256" },
        { internalType: "uint256", name: "amount", type: "uint256" },
      ],
      name: "approve",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "_dex", type: "uint256" }],
      name: "armor_class",
      outputs: [{ internalType: "int256", name: "", type: "int256" }],
      stateMutability: "pure",
      type: "function",
    },
    {
      inputs: [
        { internalType: "uint256", name: "_class", type: "uint256" },
        { internalType: "uint256", name: "_str", type: "uint256" },
        { internalType: "uint256", name: "_level", type: "uint256" },
      ],
      name: "attack_bonus",
      outputs: [{ internalType: "int256", name: "", type: "int256" }],
      stateMutability: "pure",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      name: "balanceOf",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "_class", type: "uint256" }],
      name: "base_attack_bonus_by_class",
      outputs: [{ internalType: "uint256", name: "attack", type: "uint256" }],
      stateMutability: "pure",
      type: "function",
    },
    {
      inputs: [
        { internalType: "uint256", name: "_class", type: "uint256" },
        { internalType: "uint256", name: "_level", type: "uint256" },
      ],
      name: "base_attack_bonus_by_class_and_level",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "pure",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "_str", type: "uint256" }],
      name: "damage",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "pure",
      type: "function",
    },
    {
      inputs: [],
      name: "decimals",
      outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "dungeon_armor_class",
      outputs: [{ internalType: "int256", name: "", type: "int256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "dungeon_damage",
      outputs: [{ internalType: "int256", name: "", type: "int256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "dungeon_health",
      outputs: [{ internalType: "int256", name: "", type: "int256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "dungeon_to_hit",
      outputs: [{ internalType: "int256", name: "", type: "int256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "_class", type: "uint256" }],
      name: "health_by_class",
      outputs: [{ internalType: "uint256", name: "health", type: "uint256" }],
      stateMutability: "pure",
      type: "function",
    },
    {
      inputs: [
        { internalType: "uint256", name: "_class", type: "uint256" },
        { internalType: "uint256", name: "_level", type: "uint256" },
        { internalType: "uint32", name: "_const", type: "uint32" },
      ],
      name: "health_by_class_and_level",
      outputs: [{ internalType: "uint256", name: "health", type: "uint256" }],
      stateMutability: "pure",
      type: "function",
    },
    {
      inputs: [
        { internalType: "uint256", name: "_attribute", type: "uint256" },
      ],
      name: "modifier_for_attribute",
      outputs: [{ internalType: "int256", name: "_modifier", type: "int256" }],
      stateMutability: "pure",
      type: "function",
    },
    {
      inputs: [],
      name: "name",
      outputs: [{ internalType: "string", name: "", type: "string" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "_summoner", type: "uint256" }],
      name: "scout",
      outputs: [{ internalType: "uint256", name: "reward", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "symbol",
      outputs: [{ internalType: "string", name: "", type: "string" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "int256", name: "_attack_bonus", type: "int256" },
      ],
      name: "to_hit_ac",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "pure",
      type: "function",
    },
    {
      inputs: [],
      name: "totalSupply",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "uint256", name: "from", type: "uint256" },
        { internalType: "uint256", name: "to", type: "uint256" },
        { internalType: "uint256", name: "amount", type: "uint256" },
      ],
      name: "transfer",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "uint256", name: "executor", type: "uint256" },
        { internalType: "uint256", name: "from", type: "uint256" },
        { internalType: "uint256", name: "to", type: "uint256" },
        { internalType: "uint256", name: "amount", type: "uint256" },
      ],
      name: "transferFrom",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "nonpayable",
      type: "function",
    },
  ],
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
    if (gasChecker(gasPrice)){
        console.log("Sending tx | GasNow = %s gwei -> Using = %s gwei".green,
                formatUnits(gasPrice, 'gwei'),
                formatUnits(gasPrice, 'gwei')*GAS_MULTIPLIER
            );
        const nonce = await provider.getTransactionCount(wallet.address);
        // construct the tx
        const tx = await lootContract.adventure(id, {
            gasLimit: 210000,
            gasPrice: gasPrice*GAS_MULTIPLIER,
            nonce
        });
        // Get tx details
        const receipt = await tx.wait();
        // Show tx on log
        console.log("ID %s went to farm XP - Transaction receipt: %s", id, receipt);
    }
    else {
        console.log("Damm! Gas too high! [%s]".red, formatUnits(gasPrice, 'gwei'))
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
        console.log("Sending tx | GasNow = %s gwei -> Using = %s gwei",
            formatUnits(gasPrice, 'gwei'),
            formatUnits(gasPrice, 'gwei') * GAS_MULTIPLIER
        );
        const nonce = await provider.getTransactionCount(wallet.address);

        // construct the tx
        const tx = await lootContract.level_up(id, {
            gasLimit: 210000,
            gasPrice: gasPrice,
            nonce
        });
        // Get tx details
        const receipt = await tx.wait();
        // Show tx on log
        console.log("Upgrading level of %s. Transaction receipt: %s", id, receipt);
    }
    else {
        console.log("Damm! Gas too high! [%s]", formatUnits(gasPrice, 'gwei'))
    }
}

async function claim_gold(id){
    // get the data for the tx
    const gasPrice = await provider.getGasPrice();
    if (gasChecker(gasPrice)) {
        console.log("Sending tx | GasNow = %s gwei -> Using = %s gwei",
            formatUnits(gasPrice, 'gwei'),
            formatUnits(gasPrice, 'gwei') * GAS_MULTIPLIER
        );
        const nonce = await provider.getTransactionCount(wallet.address);

        // construct the tx
        const tx = await goldContract.claim(id, {
            gasLimit: 210000,
            gasPrice: gasPrice,
            nonce
        });
        // Get tx details
        const receipt = await tx.wait();
        // Show tx on log
        console.log("Claiming Gold for ID[%s]. Transaction receipt: %s", id, receipt);
    }
    else {
        console.log("Damm! Gas too high! [%s]", formatUnits(gasPrice, 'gwei'))
    }
}

const farm = async () => {
    for (let i = 0; i < LOOT_MEMBERS.length ; i++) {
        console.log('--------------------------------------------------');
        try {
            // Time to farm checker
            const nextAdventureTime = await lootContract.adventurers_log(LOOT_MEMBERS[i]);
            const now = Date.now();

            // Get Display Info
            const loot_class = await lootContract.class(LOOT_MEMBERS[i]);
            let loot_level = await lootContract.level(LOOT_MEMBERS[i]);
            const loot_exp = await lootContract.xp(LOOT_MEMBERS[i]);
            const loot_exp_req = await lootContract.xp_required(loot_level);
            console.log(
                `ID:${LOOT_MEMBERS[i]} |`.yellow,
                `class: ${loot_class.toNumber()}`.green," - ",
                `Level[${loot_level}]`.blue,
                "|", `XP:[${loot_exp/1000000000000000000}] | Required XP: [${loot_exp_req/1000000000000000000}]`.magenta,
            );

            if (now < nextAdventureTime.toNumber() * 1000) {
                console.log(`ID ${LOOT_MEMBERS[i]} |`.yellow, " NOT ready to adventure".bold.red);
                console.log('Next Adventure Time:'.cyan , new Date(nextAdventureTime.toNumber() * 1000).toString());
                continue;
            }
            console.log('ID %s is ready to adventure'.bold.green, LOOT_MEMBERS[i]);

            if ((loot_exp_req - loot_exp) <= 0){
                console.log("Upgrade level!".green);
                // Upgrade Level
                await level_up(LOOT_MEMBERS[i]);
            }

            loot_level = await lootContract.level(LOOT_MEMBERS[i]);
            if (loot_level >= 2){
              // Claim Gold
              await claim_gold(LOOT_MEMBERS[i])
            }
            // Claim xp
            await adventure(LOOT_MEMBERS[i]);
        } catch(e) {
            console.log("Error Happened: %s", e);
        }
    }
    console.log('--------------------------------------------------');
};

const main = async () => {
    console.log('--------------- LOOT&RARITY Farmer ---------------'.bold.cyan);
    console.log("GAS_THRESHOLD:", GAS_THRESHOLD, "| GAS_MULTIPLIER:", GAS_MULTIPLIER);
    const gasPrice = await provider.getGasPrice();
    if (formatUnits(gasPrice, "gwei") > GAS_THRESHOLD) {
        console.log("Gas Price is too damn high: %s", formatUnits(gasPrice, "gwei"));
    }
    else {
        await farm();
    }
}
  if (Number(formatUnits(gasPrice, "gwei")) > Number(GAS_THRESHOLD)) {

main();