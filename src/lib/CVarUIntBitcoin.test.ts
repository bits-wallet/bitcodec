import bitcodec from "../";
import { varUIntBitcoinData as data } from "./test/varUIntBitcoin";

// valid
test("valid encode #", () => {
  data.valid.forEach((d, i) => {
    expect(bitcodec.VarUIntBitcoin.encode(d.dec).toString("hex")).toEqual(d.hex);
    expect(bitcodec.VarUIntBitcoin.encodeBytes).toEqual(d.hex.length / 2);
  });
});

test("valid decode #", () => {
  data.valid.forEach((d, i) => {
    expect(bitcodec.VarUIntBitcoin.decode(Buffer.from(d.hex, "hex"))).toEqual(d.dec);
    expect(bitcodec.VarUIntBitcoin.decodeBytes).toEqual(d.hex.length / 2);
  });
});

test("valid encodingLength #", () => {
  data.valid.forEach((d, i) => {
    expect(bitcodec.VarUIntBitcoin.encodingLength(d.dec)).toEqual(d.hex.length / 2);
  });
});

// invalid
test("invalid encode #", () => {
  data.invalid.forEach((d, i) => {
    expect(() => bitcodec.VarUIntBitcoin.encode(d.dec)).toThrow(d.msg);
  });
});

test("invalid decode #", () => {
  data.invalid.forEach((d, i) => {
    if (d.hex) expect(() => bitcodec.VarUIntBitcoin.decode(Buffer.from(d.hex, "hex"))).toThrow(d.msg);
  });
});

test("invalid encodingLength #", () => {
  data.invalid.forEach((d, i) => {
    expect(() => bitcodec.VarUIntBitcoin.encodingLength(d.dec)).toThrow(d.msg);
  });
});
