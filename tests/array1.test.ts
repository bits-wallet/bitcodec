import { buffer2hex, hex2buffer } from "../src";
import datas from "./data/array";

datas.forEach((data, i) => {
  test("array encodeBytes i:" + i, () => {
    expect(data.codec.encodeBytes).toEqual(data.encodeBytes);
  });
});

datas.forEach((data, i) => {
  test("array decodeBytes i:" + i, () => {
    expect(data.codec.decodeBytes).toEqual(data.decodeBytes);
  });
});

datas.forEach((data, i) => {
  test("array encodingLength i:" + i, () => {
    expect(data.codec.encodingLength(data.obj)).toEqual(data.length);
  });
});

datas.forEach((data, i) => {
  test("array decode i:" + i, () => {
    const obj = buffer2hex(data.codec.decode(hex2buffer(data.hex)));
    expect(obj).toEqual(data.obj);
  });
});

datas.forEach((data, i) => {
  test("array encode i:" + i, () => {
    const hex = buffer2hex(data.codec.encode(hex2buffer(data.obj)));
    expect(hex).toEqual(data.hex);
  });
});

/* datas.forEach((data, i) => {
  console.log("data.codec.encodeBytes", data.codec.encodeBytes);
  console.log("data.codec.decodeBytes", data.codec.decodeBytes);
  // console.log("data.codec.encodeBytes",data.codec.encodeBytes)
  test("array decode i:" + i, () => {
    const hexBuffer = hex2buffer(data.hex);
    console.log("hexBuffer", hexBuffer);

    const objBuffer = data.codec.decode(hexBuffer);
    console.log("objBuffer", objBuffer);

    const obj = buffer2hex(objBuffer);
    console.log("obj", obj);
    console.log("data.obj", data.obj);
  });
}); */
