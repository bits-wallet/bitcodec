import { buffer2hex, hex2buffer } from "../../src/btc/helper";
import { TxWitness } from "../../src/btc/someCodecs";

// https://bitcoindata.science/bitcoin-raw-transaction-hex.html

const txWitness = {
  version: 1,
  marker: 0,
  flag: 1,
  ins: [
    {
      hash: "ab24eae5f3f9f99c91272842f68ad2d8b55a7d1e0fc3fb102db7f9919be20655",
      index: 11,
      script: "",
      sequence: 0,
    },
  ],
  outs: [
    {
      value: 347738,
      script: "a914afe725b77815467468687128938bd04d6f90b6d387",
    },
    {
      value: 1076,
      script: "00149d83cbdc00e9f919f241b278d5e5ff694e72e097",
    },
  ],
  locktime: 1160792066,
};

// witness tx decode 1
test("witness tx decode 1", () => {
  // https://chain.so/api/v2/tx/BTC/ccc51ba425b0b87d902ee83935c8dd76fe60005a5c5c490b31a6c90354596d29
  // ccc51ba425b0b87d902ee83935c8dd76fe60005a5c5c490b31a6c90354596d29
  const testHex =
    "01000000000101ab24eae5f3f9f99c91272842f68ad2d8b55a7d1e0fc3fb102db7f9919be206550b0000000000000000025a4e05000000000017a914afe725b77815467468687128938bd04d6f90b6d38734040000000000001600149d83cbdc00e9f919f241b278d5e5ff694e72e09702483045022100a254d88afee2018b266b353c084b7b6744a3fc84223fa1f82a2ac3052aad911602204f54af6168ef80ffb6f1892814ff47b1eae34bc2d19f5a3edf38106e96416dab0121031bb117adb562ac702299eb7cf3505aa4d23877a9efe1148d98963087920d679600000000";

  const resultBuffer = TxWitness.decode(hex2buffer(testHex));
  const result = buffer2hex(resultBuffer);
  expect(result).toEqual(txWitness);
});

const txWitness2 = {
  version: 1,
  marker: 0,
  flag: 1,
  ins: [
    {
      hash: "ab24eae5f3f9f99c91272842f68ad2d8b55a7d1e0fc3fb102db7f9919be20655",
      index: 11,
      script: "",
      sequence: 0,
    },
  ],
  outs: [
    {
      value: 347738,
      script: "a914afe725b77815467468687128938bd04d6f90b6d387",
    },
    {
      value: 1076,
      script: "00149d83cbdc00e9f919f241b278d5e5ff694e72e097",
    },
  ],
  locktime: 1160792066,
};

// witness tx decode 2
test("witness tx decode 2", () => {
  // ccc51ba425b0b87d902ee83935c8dd76fe60005a5c5c490b31a6c90354596d29
  const testHex =
    "01000000000101ab24eae5f3f9f99c91272842f68ad2d8b55a7d1e0fc3fb102db7f9919be206550b0000000000000000025a4e05000000000017a914afe725b77815467468687128938bd04d6f90b6d38734040000000000001600149d83cbdc00e9f919f241b278d5e5ff694e72e09702483045022100a254d88afee2018b266b353c084b7b6744a3fc84223fa1f82a2ac3052aad911602204f54af6168ef80ffb6f1892814ff47b1eae34bc2d19f5a3edf38106e96416dab0121031bb117adb562ac702299eb7cf3505aa4d23877a9efe1148d98963087920d679600000000";

  const resultBuffer = TxWitness.decode(hex2buffer(testHex));
  const result = buffer2hex(resultBuffer);
  expect(result).toEqual(txWitness2);
});

const txWitness3 = {
  version: 2,
  marker: 0,
  flag: 1,
  ins: [
    {
      hash: "2f0d9254e23606fed199295b60f00556a6d158f65388e73495c994f9f93704a7",
      index: 0,
      script: "",
      sequence: 4294967294,
    },
  ],
  outs: [
    {
      value: 5972052337,
      script: "a9143151107e05d3c7e0c20492428a83740ad67f4e7487",
    },
    {
      value: 1102561,
      script: "a9147ac6450450f5fcc7971f8d09eb005d2f1b24f10487",
    },
  ],
  locktime: 1144014594,
};
// witness tx decode 3
test("witness tx decode 3", () => {
  // txid: e80587b13950900ba12ced29b50761815f3da37fd8998004d701ffddeb212936
  // getrawtransaction e80587b13950900ba12ced29b50761815f3da37fd8998004d701ffddeb212936
  // https://bitcoindata.science/bitcoin-raw-transaction-hex.html
  // https://blockstream.info/testnet/tx/e80587b13950900ba12ced29b50761815f3da37fd8998004d701ffddeb212936?expand
  // https://chain.so/api/v2/tx/BTCTEST/e80587b13950900ba12ced29b50761815f3da37fd8998004d701ffddeb212936

  const txHex =
    "020000000001012f0d9254e23606fed199295b60f00556a6d158f65388e73495c994f9f93704a70000000000feffffff027149f6630100000017a9143151107e05d3c7e0c20492428a83740ad67f4e7487e1d210000000000017a9147ac6450450f5fcc7971f8d09eb005d2f1b24f10487024730440220523b35e9c0a05e9aa77d9b3a12dc39832919142ffe858e11acb21709af21e99402206aaf06ef7e9a0f39c9100986c66c4c9b092493181702c4cbf4653671abeab26901210208828aa56b07d226365a39f75e784efb16653acabec1bf201065003dbe0acb0a7d841e00";

  const resultBuffer = TxWitness.decode(hex2buffer(txHex));
  const result = buffer2hex(resultBuffer);
  console.log("result", result);
  expect(result).toEqual(txWitness3);
});
