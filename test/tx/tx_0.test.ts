import { txData as data } from "../data/tx";
import { buffer2hex, hex2buffer, Tx } from "./helper";

// encode
data.forEach((d, i) => {
  test("encode data[" + i + "].raw", () => {
    const testHex = d.hex;

    const result = Tx.encode(hex2buffer(d.raw));
    expect(buffer2hex(result)).toEqual(testHex);
  });
});

// decode
data.forEach((d, i) => {
  test("decode data[" + i + "].raw", () => {
    const testHex = d.hex;

    const result = Tx.decode(hex2buffer(testHex));
    expect(result).toEqual(d.raw);
  });
});
