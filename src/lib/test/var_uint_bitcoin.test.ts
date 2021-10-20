import bitcodec from "../..";
import { datas } from "./data/var_uint_bitcoin";

// valid
test("valid encode #", () => {
  datas.valid.forEach((d, i) => {
    expect(bitcodec.VarUIntBitcoin.encode(d.dec).toString("hex")).toEqual(d.hex);
    expect(bitcodec.VarUIntBitcoin.encodeBytes).toEqual(d.hex.length / 2);
  });
});

test("valid decode #", () => {
  datas.valid.forEach((d, i) => {
    expect(bitcodec.VarUIntBitcoin.decode(Buffer.from(d.hex, "hex"))).toEqual(d.dec);
    expect(bitcodec.VarUIntBitcoin.decodeBytes).toEqual(d.hex.length / 2);
  });
});

test("valid encodingLength #", () => {
  datas.valid.forEach((d, i) => {
    expect(bitcodec.VarUIntBitcoin.encodingLength(d.dec)).toEqual(d.hex.length / 2);
  });
});

// invalid
test("invalid encode #", () => {
  datas.invalid.forEach((d, i) => {
    expect(() => bitcodec.VarUIntBitcoin.encode(d.dec)).toThrow(d.msg);
  });
});

test("invalid decode #", () => {
  datas.invalid.forEach((d, i) => {
    if (d.hex) expect(() => bitcodec.VarUIntBitcoin.decode(Buffer.from(d.hex, "hex"))).toThrow(d.msg);
  });
});

test("invalid encodingLength #", () => {
  datas.invalid.forEach((d, i) => {
    expect(() => bitcodec.VarUIntBitcoin.encodingLength(d.dec)).toThrow(d.msg);
  });
});
