import bitcodec from "../..";

const objectCodec = bitcodec.Object([{ name: "number", type: bitcodec.Number.UInt8 }, ["foobar", bitcodec.Buffer(8)]]);

test("object encode 1", () => {
  expect(() => objectCodec.encode({ number: 0xfe, foobar: Buffer.alloc(8) }, Buffer.allocUnsafe(3))).toThrow(
    "CObject Codec: buffer is too small. buffer.length = 3, offset = 0, codecLength = 9."
  );
});

test("object encode 2", () => {
  const o = { number: 0xfe, foobar: Buffer.alloc(8) };

  let result = objectCodec.encode(o);
  expect(objectCodec.encodeBytes).toEqual(9);
  expect(result.toString("hex")).toEqual("fe0000000000000000");

  result.fill(0);
  objectCodec.encode(o, result, 0);
  expect(result.toString("hex")).toEqual("fe0000000000000000");

  // offset > 0 case
  result = Buffer.alloc(19);
  objectCodec.encode(o, result, 10);
  expect(objectCodec.encodeBytes).toEqual(9);
  expect(result.slice(10).toString("hex")).toEqual("fe0000000000000000");
});

test("object encode 2", () => {
  const o = { number: 0xfe, foobar: Buffer.alloc(8) };
  expect(() => objectCodec.decode(Buffer.from("deadbe", "hex"))).toThrow("Buffer Codec: not enough data for decode. offset = 1, end = 3, codecLength = 8.");

  objectCodec.decode(Buffer.from("fe0000000000000000ffffffffff", "hex"));

  const result = objectCodec.decode(Buffer.from("fffffe0000000000000000", "hex"), 2);
  expect(result).toEqual(o);
  expect(objectCodec.decodeBytes).toEqual(9);
});

test("object 2", () => {
  const objectCodec2 = bitcodec.Object([
    { name: "a", type: bitcodec.VarString(bitcodec.Number.UInt16LE) },
    { name: "b", type: bitcodec.VarString(bitcodec.Number.UInt8) },
    { name: "c", type: bitcodec.Buffer(8) },
  ]);

  const data = {
    a: "foobarbazzz",
    b: "",
    c: Buffer.alloc(8, 0xff),
  };

  const buffer = objectCodec2.encode(data);
  expect(objectCodec2.encodeBytes).toEqual(22);
  expect(objectCodec2.decode(buffer)).toEqual(data);
  expect(objectCodec2.decodeBytes).toEqual(22);
});
