import { buffer2hex, hex2buffer } from "../src";
import datas from "./data/object1";

datas.forEach((data, i) => {
  test("object encodeBytes i:" + i, () => {
    expect(data.codec.encodeBytes).toEqual(0);
  });
});

datas.forEach((data, i) => {
  test("object decodeBytes i:" + i, () => {
    expect(data.codec.decodeBytes).toEqual(0);
  });
});

datas.forEach((data, i) => {
  test("object encodingLength i:" + i, () => {
    expect(data.codec.encodingLength(data.obj)).toEqual(data.encodingLength);
  });
});

datas.forEach((data, i) => {
  test("object decode i:" + i, () => {
    const obj = buffer2hex(data.codec.decode(hex2buffer(data.hex)));
    expect(obj).toEqual(data.obj);
    expect(data.codec.decodeBytes).toEqual(data.decodeBytes);
  });
});

datas.forEach((data, i) => {
  test("object encode i:" + i, () => {
    const hex = buffer2hex(data.codec.encode(hex2buffer(data.obj)));
    expect(hex).toEqual(data.hex);
    expect(data.codec.encodeBytes).toEqual(data.encodeBytes);
  });
});
