import { toTxSegwit, toTxSegwitBase } from "./converter";
import { buffer2hex, hex2buffer } from "../helper";
import { TxStandart, TxSegwit, TxSegwitBase, TxSegwitParsed } from "../models/Tx";

import { Tx, TxWitnessBase } from "./bitcodecObjects";
import { WitnessLocktimeCodec } from "./WitnessLocktimeCodec";

export const TxCodec = {
  encode: (txObject: TxStandart | TxSegwit): string => {
    const txObjectHex = hex2buffer(txObject);
    let resultBuffer: Buffer = Buffer.alloc(0);

    const standartTx = (txObject as TxSegwit).marker === undefined;
    if (standartTx) {
      resultBuffer = Tx.encode(txObjectHex);
    } else {
      const witnessLocktimeCodec = new WitnessLocktimeCodec(txObject.txIn.length);
      const witnessArray = (txObject as TxSegwit).txIn.map((txi) => txi.witnessScripts);
      const witnessLocktimeHexBuffer = witnessLocktimeCodec.encode(
        hex2buffer({ witnessScriptsArray: witnessArray, lockTime: txObject.lockTime } as { witnessScriptsArray: string[][]; lockTime: number })
      );
      const witnessLocktimeHex = buffer2hex(witnessLocktimeHexBuffer) as string;

      const txSegwitBase: TxSegwitBase = toTxSegwitBase(txObject as TxSegwit, witnessLocktimeHex);
      resultBuffer = TxWitnessBase.encode(hex2buffer(txSegwitBase));
    }

    const resultHex = buffer2hex(resultBuffer) as string;
    return resultHex;
  },

  decode: (txHex: string): TxStandart | TxSegwit => {
    const txBuffer = hex2buffer(txHex) as Buffer;
    let resultBuffer: any;

    const standartTx = txHex.substr(8, 4) !== "0001";
    if (standartTx) {
      resultBuffer = Tx.decode(txBuffer);
      const txStandart = buffer2hex(resultBuffer) as TxStandart;
      return txStandart;
    } else {
      const txWitnessBaseBuffer = TxWitnessBase.decode(txBuffer);
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
      return txSegwit;
    }
  },
};
