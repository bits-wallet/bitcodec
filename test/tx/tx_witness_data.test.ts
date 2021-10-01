import { txData as data } from "../data/tx";
import { buffer2hex, hex2buffer, TxWitness } from "./helper";

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

// witness tx decode
data.forEach((d, i) => {
  test("witness tx decode data[" + i + "].raw", () => {
    // https://chain.so/api/v2/tx/BTC/ccc51ba425b0b87d902ee83935c8dd76fe60005a5c5c490b31a6c90354596d29
    // ccc51ba425b0b87d902ee83935c8dd76fe60005a5c5c490b31a6c90354596d29
    const testHex =
      "01000000000101ab24eae5f3f9f99c91272842f68ad2d8b55a7d1e0fc3fb102db7f9919be206550b0000000000000000025a4e05000000000017a914afe725b77815467468687128938bd04d6f90b6d38734040000000000001600149d83cbdc00e9f919f241b278d5e5ff694e72e09702483045022100a254d88afee2018b266b353c084b7b6744a3fc84223fa1f82a2ac3052aad911602204f54af6168ef80ffb6f1892814ff47b1eae34bc2d19f5a3edf38106e96416dab0121031bb117adb562ac702299eb7cf3505aa4d23877a9efe1148d98963087920d679600000000";

    const resultBuffer = TxWitness.decode(hex2buffer(testHex));
    const result = buffer2hex(resultBuffer);
    expect(result).toEqual(txWitness);
  });
});
