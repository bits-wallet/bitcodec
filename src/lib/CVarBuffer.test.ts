import bitcodec from "../";

const varBuffer = bitcodec.VarBuffer(bitcodec.Number.UInt32BE);

test("encode", () => {
  expect(() => varBuffer.encode(Buffer.allocUnsafe(42), Buffer.allocUnsafe(41))).toThrow("destination buffer is too small");

  const buf = Buffer.alloc(42, 0xfe);
  const result = varBuffer.encode(buf);
  expect(varBuffer.encodeBytes).toEqual(46);
  expect(result.toString("hex")).toEqual("0000002afefefefefefefefefefefefefefefefefefefefefefefefefefefefefefefefefefefefefefefefefefe");

  result.fill(0);
  varBuffer.encode(buf, result, 0);
  expect(result.toString("hex")).toEqual("0000002afefefefefefefefefefefefefefefefefefefefefefefefefefefefefefefefefefefefefefefefefefe");

  // offset > 0 case
  result.fill(0);
  varBuffer.encode(Buffer.alloc(32, 0xfe), result, 10);
  expect(result.slice(10).toString("hex")).toEqual("00000020fefefefefefefefefefefefefefefefefefefefefefefefefefefefefefefefe");
});

test("decode", () => {
  const buf = Buffer.allocUnsafe(46);
  buf.writeUInt32BE(42, 0);

  expect(() => varBuffer.decode(Buffer.concat([Buffer.from([0x00]), buf.slice(0, 45)]), 1)).toThrow("not enough data for decode");

  const result = varBuffer.decode(buf);
  expect(varBuffer.decodeBytes).toEqual(46);
  expect(result.toString("hex")).toEqual(buf.slice(4).toString("hex"));
});

test("encodingLength", () => {
  expect(() => varBuffer.encodingLength()).toThrow("value must be a Buffer instance");

  expect(varBuffer.encodingLength(Buffer.allocUnsafe(42))).toEqual(46); // 4 + 42
});
