import bitcodec from "../src";
import { txDataArray } from "./data";

const TxInput = new bitcodec.Object([
  { name: "hash", type: new bitcodec.Buffer(32) },
  { name: "index", type: bitcodec.Number.UInt32LE },
  { name: "script", type: new bitcodec.VarBuffer(bitcodec.VarUIntBitcoin) },
  { name: "sequence", type: bitcodec.Number.UInt32LE },
]);

const TxOutput = new bitcodec.Object([
  { name: "value", type: bitcodec.Number.UInt64LE },
  { name: "script", type: new bitcodec.VarBuffer(bitcodec.VarUIntBitcoin) },
]);

const Tx = new bitcodec.Object([
  { name: "version", type: bitcodec.Number.UInt32LE },
  { name: "ins", type: new bitcodec.VarArray(bitcodec.VarUIntBitcoin, TxInput) },
  { name: "outs", type: new bitcodec.VarArray(bitcodec.VarUIntBitcoin, TxOutput) },
  { name: "locktime", type: bitcodec.Number.UInt32LE },
]);

function buffer2hex(obj: any) {
  for (var k in obj) {
    if (Buffer.isBuffer(obj[k])) obj[k] = obj[k].toString("hex");
    else if (Array.isArray(obj[k])) obj[k] = obj[k].map(buffer2hex);
    else if (typeof obj[k] === "object") obj[k] = buffer2hex(obj[k]);
  }
  return obj;
}

function isHex(s: string) {
  return s.length % 2 === 0 && /^[0-9a-f]*$/.test(s);
}

function hex2buffer(obj: any) {
  for (var k in obj) {
    if (Array.isArray(obj[k])) obj[k] = obj[k].map(hex2buffer);
    else if (typeof obj[k] === "string" && isHex(obj[k])) obj[k] = Buffer.from(obj[k], "hex");
  }
  return obj;
}

test("tx", () => {
  txDataArray.forEach((txData) => {
    const result = Tx.encode(hex2buffer(txData.raw));
    expect(result.toString("hex")).toEqual(txData.hex);
  });

  txDataArray.forEach((txData) => {
    const result = Tx.decode(Buffer.from(txData.hex, "hex"));
    expect(result).toEqual(txData.raw);
  });
});
