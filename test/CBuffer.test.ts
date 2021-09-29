import bitcodec from "../src";

const buffer42 = new bitcodec.Buffer(42);

test("Buffer encodingLength", () => {
  expect(buffer42.encodingLength()).toEqual(42);
});

test("Buffer encode errors", () => {
  expect(() => buffer42.encode(Buffer.allocUnsafe(41))).toThrow("value.length is out of bounds");
  expect(() => buffer42.encode(Buffer.allocUnsafe(42), Buffer.allocUnsafe(42), 1)).toThrow("destination buffer is too small");
  expect(() => buffer42.decode(Buffer.allocUnsafe(42), 1)).toThrow("not enough data for decode");
});

test("Buffer encode", () => {
  const buf1 = Buffer.allocUnsafe(42);
  const buf2 = buffer42.encode(buf1);

  expect(buffer42.encodeBytes).toEqual(42);
  expect(buf1.toString("hex")).toEqual(buf2.toString("hex"));
});

test("Buffer decode", () => {
  const buf1 = Buffer.allocUnsafe(42);
  const buf2 = buffer42.decode(buf1);

  expect(buffer42.decodeBytes).toEqual(42);
  expect(buf1.toString("hex")).toEqual(buf2.toString("hex"));
});
