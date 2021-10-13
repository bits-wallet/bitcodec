import * as bitcoin from "../../bitcoin";
import { buffer2hex, hex2buffer } from "../helper";
import { BlockHeader } from "../models/BlockHeader";
import { datas } from "./data/block_header_message";

test("block_header decode:", () => {
  const headerAllData = bitcoin.MessageStructureCodec.decode(hex2buffer(datas[0].hex));
  const result = bitcoin.BlockHeadersCodec.decode(hex2buffer(headerAllData.payload));

  const testData: BlockHeader[] = datas[0].raw.payload;

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
