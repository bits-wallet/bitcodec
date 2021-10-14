import * as bitcoin from "../../../bitcoin";
import { datas } from "../data/p2p/message_header";

datas.forEach((data, index) => {
  test("message_header decode index:" + index, () => {
    const result = bitcoin.MessageStructureCodec.decode(data.hex);
    expect(result).toEqual(data.raw);
  });

  test("message_header encode index:" + index, () => {
    const result = bitcoin.MessageStructureCodec.encode(data.raw);
    expect(result).toEqual(data.hex);
  });
});
