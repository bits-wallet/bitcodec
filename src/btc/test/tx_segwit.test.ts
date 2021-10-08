import { btc } from "../../";
import { buffer2hex, hex2buffer } from "../../btc/helper";
import { TxWitnessBase } from "../../btc/someCodecs";
import { toTxSegwit } from "../converter";
import { TxSegwit } from "../models/TxSegwit";
import { TxSegwitParsed } from "../models/TxSegwitParsed";
import { datas } from "./data/tx_segwit";

datas.forEach((data, index) => {
  test("tx_standart decode index:" + index, () => {
    const txHex = data.hex;
    const txRaw = data.raw;

    const txWitnessBaseResultBuffer = TxWitnessBase.decode(hex2buffer(txHex));
    const txWitnessBaseResult = buffer2hex(txWitnessBaseResultBuffer);

    const witnessLocktimeCodec = btc.WitnessLocktimeCodec(txWitnessBaseResult.inputs.length);
    const witnessLocktimeDataBuffer = witnessLocktimeCodec.decode(hex2buffer(txWitnessBaseResult.witness_locktime));
    const witnessLocktimeData = buffer2hex(witnessLocktimeDataBuffer);
    // console.log("witnessData", witnessData);

    const txSegwitParsed: TxSegwitParsed = {
      version: txWitnessBaseResult.version,
      marker: txWitnessBaseResult.marker,
      flag: txWitnessBaseResult.flag,
      inputs: txWitnessBaseResult.inputs,
      outputs: txWitnessBaseResult.outputs,
      witness: witnessLocktimeData.witness,
      locktime: witnessLocktimeData.locktime,
    };
    console.log("txSegwitParsed", txSegwitParsed);
    const result = toTxSegwit(txSegwitParsed);
    console.log("result", result);
    console.log("result", txRaw);

    expect(result).toEqual(txRaw);
  });

  /* test("tx encode tx_segwit.raw", () => {
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
  }); */
});
