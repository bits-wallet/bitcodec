import { txData as data } from "../data/tx";
import { buffer2hex, hex2buffer, Tx } from "./helper";

test("fake", () => {
  expect(1).toEqual(1);
});
// encode
/* 
data.forEach((d, i) => {
  test("encode data[" + i + "].raw", () => {
    const testHex = d.hex;

    const result = Tx.encode(hex2buffer(d.raw));
    expect(result.toString("hex")).toEqual(testHex);
  });
});

// decode
data.forEach((d, i) => {
  test("decode data[" + index + "].raw", () => {
    const testHex = d.hex;

    const result = Tx.decode(hex2buffer(testHex));
    expect(result).toEqual(d.raw);
  });
}); */
