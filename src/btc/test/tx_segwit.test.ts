import { btc } from "../../";
import { buffer2hex, hex2buffer } from "../../btc/helper";
import { TxWitnessBase } from "../../btc/someCodecs";
import { toTxSegwit, toTxSegwitBase } from "../converter";
import { TxSegwitBase } from "../models/TxSegwitBase";
import { TxSegwitParsed } from "../models/TxSegwitParsed";
import { datas } from "./data/tx_segwit";

datas.forEach((data, index) => {
  test("tx_segwit decode index:" + index, () => {
    const txHex = data.hex;
    const txRaw = data.raw;

    const txWitnessBaseBuffer = TxWitnessBase.decode(hex2buffer(txHex));
    const txWitnessBase = buffer2hex(txWitnessBaseBuffer);

    const witnessLocktimeCodec = btc.WitnessLocktimeCodec(txWitnessBase.inputs.length);
    const witnessLocktimeDataBuffer = witnessLocktimeCodec.decode(hex2buffer(txWitnessBase.witness_locktime));
    const witnessLocktimeData = buffer2hex(witnessLocktimeDataBuffer);

    const txSegwitParsed: TxSegwitParsed = {
      version: txWitnessBase.version,
      marker: txWitnessBase.marker,
      flag: txWitnessBase.flag,
      inputs: txWitnessBase.inputs,
      outputs: txWitnessBase.outputs,
      witness: witnessLocktimeData.witness,
      locktime: witnessLocktimeData.locktime,
    };
    const txSegwit = toTxSegwit(txSegwitParsed);
    expect(txSegwit).toEqual(txRaw);
  });

  test("tx_segwit encode index:" + index, () => {
    const txHex = data.hex;
    const txRaw = data.raw;

    const witnessLocktimeCodec = btc.WitnessLocktimeCodec(txRaw.inputs.length);
    const witnessArray = txRaw.inputs.map((input) => input.witness);
    const witnessLocktimeHexBuffer = witnessLocktimeCodec.encode(hex2buffer({ witness: witnessArray, locktime: txRaw.locktime }));
    const witnessLocktimeHex = buffer2hex(witnessLocktimeHexBuffer);

    const txSegwitBase: TxSegwitBase = toTxSegwitBase(txRaw, witnessLocktimeHex);
    const txWitnessBuffer = TxWitnessBase.encode(hex2buffer(txSegwitBase));
    const txWitnessHex = buffer2hex(txWitnessBuffer);
    expect(txWitnessHex).toEqual(txHex);
  });
});
