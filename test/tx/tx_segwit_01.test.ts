import { data } from "../data/tx_segwit_01";
import { TxWitnessBase } from "../../src/btc/someCodecs";

import { buffer2hex, hex2buffer } from "./helper";

test("tx decode tx_segwit_0.raw", () => {
  const txHex = data.hex;
  const txRaw = data.raw;

  const resultBuffer = TxWitnessBase.decode(hex2buffer(txHex));
  const result = buffer2hex(resultBuffer);
  expect(result).toEqual(txRaw);
});

test("tx encode tx_segwit_0.raw", () => {
  const txHex = data.hex;
  const txRaw = data.raw;

  const resultBuffer = TxWitnessBase.encode(hex2buffer(txRaw));
  const result = buffer2hex(resultBuffer);
  expect(result).toEqual(txHex);
});
