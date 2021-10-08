import { data } from "../data/tx_segwit_0";
import { buffer2hex, hex2buffer, TxWitness } from "./helper";

test("tx decode tx_segwit_0.raw", () => {
  const txHex = data.hex;
  const txRaw = data.raw;

  const resultBuffer = TxWitness.decode(hex2buffer(txHex));
  const result = buffer2hex(resultBuffer);
  expect(result).toEqual(txRaw);
});

test("tx encode tx_segwit_0.raw", () => {
  const txHex = data.hex;
  const txRaw = data.raw;

  const resultBuffer = TxWitness.encode(hex2buffer(txRaw));
  const result = buffer2hex(resultBuffer);
  expect(result).toEqual(txHex);
});
