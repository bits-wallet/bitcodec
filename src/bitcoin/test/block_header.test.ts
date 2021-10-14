import * as bitcoin from "../../bitcoin";
import { buffer2hex, hex2buffer } from "../helper";
import { BlockHeader } from "../models/BlockHeader";
import { datas } from "./data/block_header";

datas.forEach((data, index) => {
  test("block_header decode index:" + index, () => {
    const blockHeaderBuffer = bitcoin.BlockHeaderCodec.decode(hex2buffer(data.hex));
    expect(buffer2hex(blockHeaderBuffer) as BlockHeader).toEqual(data.raw);
  });

  test("block_header encode index:" + index, () => {
    const blockHeaderHexBuffer = bitcoin.BlockHeaderCodec.encode(hex2buffer(data.raw));
    expect(buffer2hex(blockHeaderHexBuffer)).toEqual(data.hex);
  });
});
