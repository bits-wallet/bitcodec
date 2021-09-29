import bitcodec from "../src";

const array42 = new bitcodec.Array(42, new bitcodec.Buffer(42));

test("Array encode errors", () => {
  expect(() => array42.encode(new Array(41))).toThrow("value.length is out of bounds");
  expect(() => array42.encode(new Array(42), Buffer.allocUnsafe(3))).toThrow("value must be a Buffer instance");
  expect(() => array42.encode(new Array(42), undefined, 1765)).toThrow("value must be a Buffer instance");
});

test("Array encode", () => {
  const buffers = new Array(42).fill(Buffer.allocUnsafe(42));
  const buf = array42.encode(buffers);
  expect(array42.encodeBytes).toEqual(1764);
  expect(buf.toString("hex")).toEqual(Buffer.concat(buffers).toString("hex"));
});

test("Array decode errors", () => {
  expect(() => array42.decode(Buffer.allocUnsafe(1763))).toThrow("not enough data for decode");
  expect(() => array42.decode(Buffer.allocUnsafe(1764), 1)).toThrow("not enough data for decode");

  const buf = Buffer.allocUnsafe(1764);
  const buffers = array42.decode(buf);
  expect(array42.decodeBytes).toEqual(1764);

  for (let i = 0, offset = 0; i < buffers.length; ++i, offset += 42) {
    expect(buffers[i].toString("hex")).toEqual(buf.slice(offset, offset + 42).toString("hex"));
  }

  expect(() => array42.decode(Buffer.allocUnsafe(1764), 1)).toThrow("not enough data for decode");
});

test("Array encodingLength errors", () => {
  const array42 = new bitcodec.Array(42, new bitcodec.Buffer(42));
  expect(() => array42.encodingLength(new Array(41))).toThrow("value.length is out of bounds");
  expect(() => array42.encodingLength()).toThrow("value must be an Array instance");
});

test("Array encodingLength", () => {
  const array42 = new bitcodec.Array(42, new bitcodec.Buffer(42));
  expect(array42.encodingLength(new Array(42))).toEqual(42 * 42);
});
