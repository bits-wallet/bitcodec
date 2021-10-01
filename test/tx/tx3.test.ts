import { txData as data, txDataHashes } from "../data/tx";
import { buffer2hex, hex2buffer, TxInput, TxInputs, TxOutput, TxOutputs } from "./helper";

const index = 3;
const tx = data[index];
const hexes = txDataHashes[index];

// encode
tx.raw.ins.forEach((txInput, i) => {
  test("encode data[" + index + "].ins[" + i + "]", () => {
    const testHex = hexes.in[i];

    const result = TxInput.encode(hex2buffer(txInput));
    expect(buffer2hex(result)).toEqual(testHex);
  });
});

/* tx.raw.outs.forEach((txOutput, i) => {
  test("encode data[" + index + "].outs[" + i + "]", () => {
    const testHex = hexes.out[i];

    const result = TxOutput.encode(hex2buffer(txOutput));
    expect(buffer2hex(result)).toEqual(testHex);
  });
});

test("encode data[" + index + "].ins", () => {
  const testHex = hexes.ins;

  const result = TxInputs.encode(hex2buffer(tx.raw.ins));
  expect(buffer2hex(result)).toEqual(testHex);
});

test("encode data[" + index + "].outs", () => {
  const testHex = hexes.outs;

  const result = TxOutputs.encode(hex2buffer(tx.raw.outs));
  expect(buffer2hex(result)).toEqual(testHex);
});

// decode
tx.raw.ins.forEach((txInput, i) => {
  test("decode data[" + index + "].ins[" + i + "] ", () => {
    const testHex = hexes.in[i];

    const result = TxInput.decode(hex2buffer(testHex));
    expect(result).toEqual(txInput);
  });
});

tx.raw.outs.forEach((txOutput, i) => {
  test("decode data[" + index + "].outs[" + i + "]", () => {
    const testHex = hexes.out[i];

    const result = TxOutput.decode(hex2buffer(testHex));
    expect(result).toEqual(txOutput);
  });
});

test("decode data[" + index + "].ins", () => {
  const testHex = hexes.ins;

  const result = TxInputs.decode(hex2buffer(testHex));
  expect(result).toEqual(tx.raw.ins);
});

test("decode data[" + index + "].outs", () => {
  const testHex = hexes.outs;

  const result = TxOutputs.decode(hex2buffer(testHex));
  expect(result).toEqual(tx.raw.outs);
});
 */
