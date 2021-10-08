import { toTxSegwit, toTxSegwitBase } from "./converter";
import { buffer2hex, hex2buffer } from "./helper";
import { TxSegwit } from "./models/TxSegwit";
import { TxSegwitBase } from "./models/TxSegwitBase";
import { TxSegwitParsed } from "./models/TxSegwitParsed";
import { TxStandart } from "./models/TxStandart";

import { Tx, TxWitnessBase } from "./someCodecs";
import { WitnessLocktimeCodec } from "./WitnessLocktimeCodec";

export const TxCodec = {
  encode: (txObject: TxStandart | TxSegwit): string => {
    const txObjectHex = hex2buffer(txObject);
    let resultBuffer: Buffer = Buffer.alloc(0);

    const standartTx = (txObject as TxSegwit).marker === undefined;
    if (standartTx) {
      resultBuffer = Tx.encode(txObjectHex);
    } else {
      const witnessLocktimeCodec = new WitnessLocktimeCodec(txObject.inputs.length);
      const witnessArray = (txObject as TxSegwit).inputs.map((input) => input.witness);
      const witnessLocktimeHexBuffer = witnessLocktimeCodec.encode(hex2buffer({ witness: witnessArray, locktime: txObject.locktime }));
      const witnessLocktimeHex = buffer2hex(witnessLocktimeHexBuffer);

      const txSegwitBase: TxSegwitBase = toTxSegwitBase(txObject as TxSegwit, witnessLocktimeHex);
      resultBuffer = TxWitnessBase.encode(hex2buffer(txSegwitBase));
    }

    const resultHex = buffer2hex(resultBuffer);
    return resultHex;
  },

  decode: (txHex: string): TxStandart | TxSegwit => {
    const txBuffer = hex2buffer(txHex);
    let resultBuffer: any;

    const standartTx = txHex.substr(8, 4) !== "0001";
    if (standartTx) {
      resultBuffer = Tx.decode(txBuffer);
      const txStandart = buffer2hex(resultBuffer);
      return txStandart;
    } else {
      const txWitnessBaseBuffer = TxWitnessBase.decode(txBuffer);
      const txWitnessBase = buffer2hex(txWitnessBaseBuffer);

      const witnessLocktimeCodec = new WitnessLocktimeCodec(txWitnessBase.inputs.length);
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
      return txSegwit;
    }
  },
};
