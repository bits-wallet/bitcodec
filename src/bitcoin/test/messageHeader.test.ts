import * as bitcoin from "../../bitcoin";
import { datas } from "./data/message_header";

datas.forEach((data, index) => {
  test("message_0 decode index:" + index, () => {
    const result = bitcoin.HeaderCodec.decode(data.hex);
    expect(result).toEqual(data.raw);
  });

  test("message_0 encode index:" + index, () => {
    const result = bitcoin.HeaderCodec.encode(data.raw);
    expect(result).toEqual(data.hex.substr(0, 48));
  });
});
