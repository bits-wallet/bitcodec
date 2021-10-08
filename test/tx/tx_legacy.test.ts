import { buffer2hex, hex2buffer } from "../../src/btc/helper";
import { Tx } from "../../src/btc/someCodecs";
import { data } from "../data/tx_legacy";

test("tx decode tx_legacy.raw", () => {
  const txHex = data.hex;
  const txRaw = data.raw;

  const resultBuffer = Tx.decode(hex2buffer(txHex));
  const result = buffer2hex(resultBuffer);
  expect(result).toEqual(txRaw);
});

test("tx encode tx_legacy.raw", () => {
  const txHex = data.hex;
  const txRaw = data.raw;

  const resultBuffer = Tx.encode(hex2buffer(txRaw));
  const result = buffer2hex(resultBuffer);
  expect(result).toEqual(txHex);
});
