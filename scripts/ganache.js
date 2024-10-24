#!/usr/bin/env node

const ganache = require("ganache");



const mnemonic = "whisper faint more drastic flat weather elegant lemon permit flock enrich oxygen";
/*
[
  "0xd88095e542065C17353d1c351559717401657A7f", // deployer - owner
  "0x29547dA16312577914D412A06100Bb52dcCCBf43", // signer
  "0xA8Ba9791903b75b3532AFc7d21DA6A924e789B28",
  "0xD65EC868d515e41AD705979E7498E9479B3D13cA",
  "0x4207CFaE26C0377dF7044e31b307c599758b14c2",
  "0x968C26f2634984D84178EDe66947Ec4A5b98F2d8",
  "0xe73756788633e60DB24Dadd09e8A65c992344DB0",
  "0x6839314F6824A8f42C0428BD19980cA421A0e2fE",
  "0x37712180374E4940f06fB8844DE8cBe1e8b7C00D",
  "0xe69b5ED01b5E06772Bb0DC5a215638d4d7304a79"
]
*/

const options = {
  mnemonic,
};
const server = ganache.server(options);


const PORT = 9545; // 0 means any available port
server.listen(PORT, async err => {
  if (err) throw err;
  console.log(`ganache listening on port ${server.address().port}...`);

  /*const provider = server.provider;
  const accounts = await provider.request({
    method: "eth_accounts",
    params: [],
  });
  console.log(`ganache accounts: \n${JSON.stringify(accounts, null, 2)}`);*/
});
