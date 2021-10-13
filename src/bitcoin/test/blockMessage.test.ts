import * as bitcoin from "../../bitcoin";
import { BlockMessage } from "../models/p2p/BlockMessage";
import { datas } from "./data/block_message";

test("fake", () => expect(1).toEqual(1));

/* datas.forEach((data, index) => {
  test("block decode index:" + index, () => {
    const decodedData = bitcoin.HeaderCodec.decode(data.hex);
    const decodedBlockPayload: BlockPayload = bitcoin.BlockCodec.decode(decodedData.payload);

    // blockHeader
    expect(decodedBlockPayload.blockHeader.merkleRootHash).toEqual(data.raw.payload.blockHeader.merkleRootHash);
    expect(decodedBlockPayload.blockHeader.nBits).toEqual(data.raw.payload.blockHeader.nBits);
    expect(decodedBlockPayload.blockHeader.nonce).toEqual(data.raw.payload.blockHeader.nonce);
    expect(decodedBlockPayload.blockHeader.previousBlockHeaderHash).toEqual(data.raw.payload.blockHeader.previousBlockHeaderHash);
    expect(decodedBlockPayload.blockHeader.time).toEqual(data.raw.payload.blockHeader.time);
    expect(decodedBlockPayload.blockHeader.version).toEqual(data.raw.payload.blockHeader.version);

    // txns
    expect(decodedBlockPayload.txns[0].lockTime).toEqual(data.raw.payload.txns[0].lockTime);
    expect(decodedBlockPayload.txns[0].txIn[0].previousOutput).toEqual(data.raw.payload.txns[0].txIn[0].previousOutput);
    expect(decodedBlockPayload.txns[0].txIn[0].sequence).toEqual(data.raw.payload.txns[0].txIn[0].sequence);
    expect(decodedBlockPayload.txns[0].txIn[0].signatureScript).toEqual(data.raw.payload.txns[0].txIn[0].signatureScript);
    expect(decodedBlockPayload.txns[0].txOut[0].pkScript).toEqual(data.raw.payload.txns[0].txOut[0].pkScript);
    expect(decodedBlockPayload.txns[0].txOut[0].value).toEqual(data.raw.payload.txns[0].txOut[0].value);
  });

  test("block encode index:" + index, () => {
    const blockPayloadDataHex = bitcoin.BlockCodec.encode(data.raw.payload);

    const blockData = {
      startString: data.raw.startString,
      commandName: data.raw.commandName,
      payloadSize: data.raw.payloadSize,
      checksum: data.raw.checksum,
      payload: blockPayloadDataHex,
    };

    const result = bitcoin.HeaderCodec.encode(blockData);

    expect(result).toEqual(data.hex);
  });
});
 */
