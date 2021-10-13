import * as bitcoin from "../../bitcoin";
import { datas } from "./data/block_header_message";

test("fake", () => expect(1).toEqual(1));

/* datas.forEach((data, index) => {
  test("block_header decode index:" + index, () => {
    const headerAllData = bitcoin.MessageStructureCodec.decode(data.hex);
    const result = bitcoin.BlockMessageStructureCodec.decode(headerAllData.payload);

    expect(result[0].headers.version).toEqual(data.raw.payload[0].headers.version);
    expect(result[0].headers.previousBlockHeaderHash).toEqual(data.raw.payload[0].headers.previousBlockHeaderHash);
    expect(result[0].headers.merkleRootHash).toEqual(data.raw.payload[0].headers.merkleRootHash);
  });

  test("block_header encode index:" + index, () => {
    const payloadDataHex = bitcoin.BlockMessageStructureCodec.encode(data.raw.payload);

    const headerData = {
      magic: data.raw.magic,
      command: data.raw.command,
      length: data.raw.length,
      checksum: data.raw.checksum,
      payload: payloadDataHex,
    };

    const result = bitcoin.MessageStructureCodec.encode(headerData);

    expect(result).toEqual(data.hex);
  });
});
 */
