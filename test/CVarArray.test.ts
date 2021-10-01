import bitcodec from "../src";

const varArray = bitcodec.VarArray(bitcodec.Number.UInt32BE, bitcodec.Buffer(42));

test("VarArray encode errors", () => {
  expect(() => varArray.encode(new Array(42), Buffer.allocUnsafe(3))).toThrow("Attempt to access memory outside buffer bounds");
  expect(() => varArray.encode(new Array(42), undefined, 1765)).toThrow('The value of "offset" is out of range. It must be >= 0 and <= 1764. Received 1765');
});

test("VarArray encode buffer", () => {
  const buffers = new Array(42);
  for (var i = 0; i < buffers.length; ++i) {
    buffers[i] = Buffer.allocUnsafe(42);
  }

  const buf = varArray.encode(buffers);
  expect(varArray.encodeBytes).toEqual(1768);
  expect(buf.slice(0, 4).toString("hex")).toEqual("0000002a");
  expect(buf.slice(4).toString("hex")).toEqual(Buffer.concat(buffers).toString("hex"));
});

test("VarArray decode errors", () => {
  const buf = Buffer.allocUnsafe(1768);
  buf.writeUInt32BE(42, 0);

  expect(() => varArray.decode(buf.slice(1))).toThrow("not enough data for decode");
  expect(() => varArray.decode(buf, 1)).toThrow("not enough data for decode");
  expect(() => varArray.decode(buf, 1)).toThrow("not enough data for decode");

  const buffers = varArray.decode(buf);
  expect(varArray.decodeBytes).toEqual(1768);

  for (var i = 0, offset = 4; i < buffers.length; ++i, offset += 42) {
    expect(buffers[i].toString("hex")).toEqual(buf.slice(offset, offset + 42).toString("hex"));
  }
});

test("VarArray encodingLength errors", () => {
  expect(() => varArray.encodingLength()).toThrow("value must be an Array instance");
});

test("VarArray encodingLength for 42 items", () => {
  expect(varArray.encodingLength(new Array(42))).toEqual(1768); // 4 + 42 * 42
});
