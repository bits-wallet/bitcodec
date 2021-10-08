import { btc } from "../../src";
import { data } from "../data/tx_segwit";
import { TxWitnessBase } from "../../src/btc/someCodecs";
import { buffer2hex, hex2buffer } from "../../src/btc/helper";

test("tx decode tx_segwit.raw", () => {
  const txHex = data.hex;
  const txRaw = data.raw;

  const resultBuffer = TxWitnessBase.decode(hex2buffer(txHex));
  const result = buffer2hex(resultBuffer);

  const witnessLocktimeCodec = btc.WitnessLocktimeCodec(result.inputs.length);
  const witnessLocktimeDataBuffer = witnessLocktimeCodec.decode(hex2buffer(result.witness_locktime));
  const witnessLocktimeData = buffer2hex(witnessLocktimeDataBuffer);
  // console.log("witnessData", witnessData);

  result.witness = witnessLocktimeData.witness;
  result.locktime = witnessLocktimeData.locktime;
  result.witness_locktime = null;

  expect(result).toEqual({ ...txRaw, witness_locktime: null });
});

test("tx encode tx_segwit_0.raw", () => {
  const txHex = data.hex;
  const txRaw = data.raw;

  const witnessLocktimeCodec = btc.WitnessLocktimeCodec(txRaw.witness.length);
  const witnessLocktimeHexBuffer = witnessLocktimeCodec.encode(hex2buffer({ witness: txRaw.witness, locktime: txRaw.locktime }));
  const witnessLocktimeHex = buffer2hex(witnessLocktimeHexBuffer);
  // console.log("witnessLocktimeHex", witnessLocktimeHex);

  const txBaseObject = { ...txRaw, witness_locktime: witnessLocktimeHex };
  // const txBaseObject = { version: txRaw.version, marker: txRaw.marker, flag: txRaw.flag, inputs: txRaw.inputs, outputs: txRaw.outputs, witness_locktime: witnessLocktimeHex };
  const resultBuffer = TxWitnessBase.encode(hex2buffer(txBaseObject));
  const result = buffer2hex(resultBuffer);
  expect(result).toEqual(txHex);
});
