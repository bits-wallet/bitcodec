import * as bitcoin from "../../../bitcoin";
import { buffer2hex, hex2buffer } from "../../helper";
import { BlockHeader } from "../../models/BlockHeader";
import { MessageStructure } from "../../models/p2p/MessageStructure";
import { datas } from "../data/p2p/block_header_message";

datas.forEach((data, index) => {
  test("block_header_message decode index:" + index, () => {
    const headerAllData = bitcoin.MessageStructureCodec.decode(hex2buffer(data.hex));
    const result = bitcoin.BlockHeaderArrayCodec.decode(hex2buffer(headerAllData.payload));

    const testData: BlockHeader[] = data.raw.payload;

    result.forEach((res: any, index: number) => {
      expect(res.bits).toEqual(testData[index].bits);
      expect(res.nonce).toEqual(testData[index].nonce);
      expect(res.timestamp).toEqual(testData[index].timestamp);
      expect(res.txnCount).toEqual(testData[index].txnCount);
      expect(res.version).toEqual(testData[index].version);
      expect(buffer2hex(res.prevBlock)).toEqual(testData[index].prevBlock);
      expect(buffer2hex(res.merkleRoot)).toEqual(testData[index].merkleRoot);
    });
  });

  test("block_header_message encode index:" + index, () => {
    const blockHeaderPayloadBuffer = bitcoin.BlockHeaderArrayCodec.encode(hex2buffer(data.raw.payload));
    const blockHeaderPayloadHex: string = buffer2hex(blockHeaderPayloadBuffer);

    const blcokHeaderMessageStructure: MessageStructure<string> = {
      magic: data.raw.magic,
      command: data.raw.command,
      length: data.raw.length,
      checksum: data.raw.checksum,
      payload: blockHeaderPayloadHex,
    };

    const blockHeaderMessageHex = bitcoin.MessageStructureCodec.encode(hex2buffer(blcokHeaderMessageStructure));
    expect(blockHeaderMessageHex).toEqual(data.hex);
  });
});
