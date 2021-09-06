# LootRarity Experience Farmer

Best practice is to use a VPS and put a cronjob for let it farm every day.

 1. Initialize new node project (npm init -y)
 2. Run: npm install ethers
 3. Add private key where PRIVATE_KEY (Line 46)
 4. Add the ID of your LOOTRARITY Tokens (Line 50)
 6. Run: node lootrarity.js
 
## Crontab Config:

1. enable start script: `chmod +x start.sh`
2. open crontab: `crontab -e`
3. set add a new row: `0 X * * * /full_path_to_start.sh` Change X for 1 hour after (24h format) when you claimed the xp last time.
5. save the script

---
 Use under your responsability. Feedback always appreciated.

---
FTM Donations: 0xc616E565A17BC8c158619eD0090eC83972E91F92