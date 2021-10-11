import { buffer2hex, hex2buffer } from "../helper";
import { TxWitnessBase } from "../someCodecs";
import { toTxSegwit, toTxSegwitBase } from "../converter";
import { TxSegwitBase } from "../models/TxSegwitBase";
import { TxSegwitParsed } from "../models/TxSegwitParsed";
import { WitnessLocktimeCodec } from "../WitnessLocktimeCodec";
import { datas } from "./data/tx_segwit";

datas.forEach((data, index) => {
  test("tx_segwit decode index:" + index, () => {
    const txHex = data.hex;
    const txRaw = data.raw;

    const txWitnessBaseBuffer = TxWitnessBase.decode(hex2buffer(txHex));
    const txWitnessBase = buffer2hex(txWitnessBaseBuffer) as TxSegwitBase;

    const witnessLocktimeCodec = new WitnessLocktimeCodec(txWitnessBase.txIn.length);
    const witnessLocktimeDataBuffer: { witnessScriptsArray: string[][]; lockTime: number } = witnessLocktimeCodec.decode(hex2buffer(txWitnessBase.witnessScripts_lockTime));
    const witnessLocktimeData = buffer2hex(witnessLocktimeDataBuffer) as { witnessScriptsArray: string[][]; lockTime: number };

    const txSegwitParsed: TxSegwitParsed = {
      version: txWitnessBase.version,
      marker: txWitnessBase.marker,
      flag: txWitnessBase.flag,
      txIn: txWitnessBase.txIn,
      txOut: txWitnessBase.txOut,
      witnessScriptsArray: witnessLocktimeData.witnessScriptsArray,
      lockTime: witnessLocktimeData.lockTime,
    };

    const txSegwit = toTxSegwit(txSegwitParsed);
    expect(txSegwit).toEqual(txRaw);
  });

  test("tx_segwit encode index:" + index, () => {
    const txHex = data.hex;
    const txRaw = data.raw;

    const witnessLocktimeCodec = new WitnessLocktimeCodec(txRaw.txIn.length);
    const witnessArray = txRaw.txIn.map((input) => input.witnessScripts);
    const witnessLocktimeHexBuffer = witnessLocktimeCodec.encode(
      hex2buffer({ witnessScriptsArray: witnessArray, lockTime: txRaw.lockTime } as { witnessScriptsArray: string[][]; lockTime: number })
    );
    const witnessLocktimeHex = buffer2hex(witnessLocktimeHexBuffer) as string;

    const txSegwitBase: TxSegwitBase = toTxSegwitBase(txRaw, witnessLocktimeHex);
    const txWitnessBuffer = TxWitnessBase.encode(hex2buffer(txSegwitBase));
    const txWitnessHex = buffer2hex(txWitnessBuffer);
    // console.log("txWitnessHex", txWitnessHex);
    expect(txWitnessHex).toEqual(txHex);
  });
});
