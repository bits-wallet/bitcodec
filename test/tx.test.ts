import bitcodec from "../src";
import { txData as data } from "./data/tx";

const TxInput = bitcodec.Object([
  { name: "hash", type: bitcodec.Buffer(32) },
  { name: "index", type: bitcodec.Number.UInt32LE },
  { name: "script", type: bitcodec.VarBuffer(bitcodec.VarUIntBitcoin) },
  { name: "sequence", type: bitcodec.Number.UInt32LE },
]);

const TxOutput = bitcodec.Object([
  { name: "value", type: bitcodec.Number.UInt64LE },
  { name: "script", type: bitcodec.VarBuffer(bitcodec.VarUIntBitcoin) },
]);

const Tx = bitcodec.Object([
  { name: "version", type: bitcodec.Number.UInt32LE },
  { name: "ins", type: bitcodec.VarArray(bitcodec.VarUIntBitcoin, TxInput) },
  { name: "outs", type: bitcodec.VarArray(bitcodec.VarUIntBitcoin, TxOutput) },
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

test("tx ins 0 test", () => {
  const txin = data[0].raw.ins[0];
  const testHex =
    "f1fefefefefefefefefefefefefefefefefefefefefefefefefefefefefefefe000000006b4830450221008732a460737d956fd94d49a31890b2908f7ed7025a9c1d0f25e43290f1841716022004fa7d608a291d44ebbbebbadaac18f943031e7de39ef3bf9920998c43e60c0401210279be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798ffffffff";

  const result = TxInput.encode(hex2buffer(txin));
  expect(result.toString("hex")).toEqual(testHex);
});

test("tx ins test", () => {
  const txins = data[0].raw.ins;
  const testHex =
    "01f1fefefefefefefefefefefefefefefefefefefefefefefefefefefefefefefe000000006b4830450221008732a460737d956fd94d49a31890b2908f7ed7025a9c1d0f25e43290f1841716022004fa7d608a291d44ebbbebbadaac18f943031e7de39ef3bf9920998c43e60c0401210279be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798ffffffff";
  const TxInputs = bitcodec.VarArray(bitcodec.VarUIntBitcoin, TxInput);

  const result = TxInputs.encode(txins);
  expect(result.toString("hex")).toEqual(testHex);
});

test("tx out 0 test", () => {
  const txout = data[0].raw.outs[0];
  const testHex = "a0860100000000001976a914c42e7ef92fdb603af844d064faad95db9bcdfd3d88ac";

  const result = TxOutput.encode(hex2buffer(txout));
  expect(result.toString("hex")).toEqual(testHex);
});

test("tx outs  test", () => {
  const txouts = data[0].raw.outs;
  const testHex = "01a0860100000000001976a914c42e7ef92fdb603af844d064faad95db9bcdfd3d88ac";
  const TxOutputs = bitcodec.VarArray(bitcodec.VarUIntBitcoin, TxOutput);

  const result = TxOutputs.encode(txouts);
  expect(result.toString("hex")).toEqual(testHex);
});

/* test("tx ins test", () => {
  const txins = data[0].raw.ins;
  const testHex =
    "01f1fefefefefefefefefefefefefefefefefefefefefefefefefefefefefefefe000000006b4830450221008732a460737d956fd94d49a31890b2908f7ed7025a9c1d0f25e43290f1841716022004fa7d608a291d44ebbbebbadaac18f943031e7de39ef3bf9920998c43e60c0401210279be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798ffffffff";

  const TxInputs = bitcodec.VarArray(bitcodec.VarUIntBitcoin, TxInput);
  const result = TxInputs.encode(txins);
  // console.log("TxInput.encode hex", result.toString("hex"));
  expect(result.toString("hex")).toEqual(testHex);
}); */

/* test("tx", () => {
  data.forEach((d) => {
    const result = Tx.encode(hex2buffer(d.raw));
    expect(result.toString("hex")).toEqual(d.hex);
  });

  data.forEach((d) => {
    const result = Tx.decode(Buffer.from(d.hex, "hex"));
    expect(result).toEqual(d.raw);
  });
}); */

test("tx", () => {
  var d = data[3];

  const result = Tx.encode(hex2buffer(d.raw));
  expect(result.toString("hex")).toEqual(d.hex);

  /* data.forEach((d) => {
    const result = Tx.decode(Buffer.from(d.hex, "hex"));
    expect(result).toEqual(d.raw);
  }); */
});
