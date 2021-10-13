import * as bitcoin from "../../bitcoin";
import { datas } from "./data/block_header";

datas.forEach((data, index) => {
  test("block_header decode index:" + index, () => {
    const headerAllData = bitcoin.HeaderCodec.decode(data.hex);
    const result = bitcoin.BlockHeaderCodec.decode(headerAllData.payload);

    expect(result[0].headers.version).toEqual(data.raw.payload[0].headers.version);
    expect(result[0].headers.previousBlockHeaderHash).toEqual(data.raw.payload[0].headers.previousBlockHeaderHash);
    expect(result[0].headers.merkleRootHash).toEqual(data.raw.payload[0].headers.merkleRootHash);
  });

  test("block_header encode index:" + index, () => {
    const payloadDataHex = bitcoin.BlockHeaderCodec.encode(data.raw.payload);

    const headerData = {
      startString: data.raw.startString,
      commandName: data.raw.commandName,
      payloadSize: data.raw.payloadSize,
      checksum: data.raw.checksum,
      payload: payloadDataHex,
    };

    const result = bitcoin.HeaderCodec.encode(headerData);

    expect(result).toEqual(data.hex);
  });
});
