import * as bitcoin from "../../bitcoin";
import { buffer2hex, hex2buffer } from "../helper";
import { BlockHeader } from "../models/BlockHeader";
import { MessageStructure } from "../models/p2p/MessageStructure";
import { data } from "./data/block_header_message";

test("block_header decode:", () => {
  const headerAllData = bitcoin.MessageStructureCodec.decode(hex2buffer(data[0].hex));
  const result = bitcoin.BlockHeadersCodec.decode(hex2buffer(headerAllData.payload));

  const testData: BlockHeader[] = data[0].raw.payload;

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

test("block_header encode:", () => {
  const testData = data[0];
  const blockHeaderPayloadBuffer = bitcoin.BlockHeadersCodec.encode(hex2buffer(testData.raw.payload));
  const blockHeaderPayloadHex: string = buffer2hex(blockHeaderPayloadBuffer);

  console.log(blockHeaderPayloadHex);

  const blcokHeaderMessageStructure: MessageStructure<string> = {
    magic: testData.raw.magic,
    command: testData.raw.command,
    length: testData.raw.length,
    checksum: testData.raw.checksum,
    payload: blockHeaderPayloadHex,
  };

  const blockHeaderMessageHex = bitcoin.MessageStructureCodec.encode(hex2buffer(blcokHeaderMessageStructure));
  expect(blockHeaderMessageHex).toEqual(testData.hex);
});
