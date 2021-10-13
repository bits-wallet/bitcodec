// https://en.bitcoin.it/wiki/Protocol_documentation#Message_structure
export enum MAGIC {
  Mainnet = 3652501241, // 0xD9B4BEF9
  Regtest = 3669344250, // 0xDAB5BFFA
  Testnet3 = 118034699, // 0x0709110B
  Signet = 1087308554, // 0x40CF030A (default)
  Namecoin = 4273258233, // 0xFEB4BEF9
}
