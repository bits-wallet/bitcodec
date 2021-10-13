import * as bitcoin from "../../bitcoin";
import { buffer2hex, hex2buffer } from "../helper";
import { Inventory, InvMessage } from "../models/p2p/Inventory";
import { MessageStructure } from "../models/p2p/MessageStructure";
import { datas } from "./data/inv_message";

datas.forEach((data, index) => {
  test("inv_message decode index:" + index, () => {
    const inventoryMessageBuffer = bitcoin.MessageStructureCodec.decode(data.hex);
    const inventories = hex2buffer(inventoryMessageBuffer.payload);
    const inventoryBuffer = bitcoin.InventoriesCodec.decode(inventories);
    expect(buffer2hex(inventoryBuffer)).toEqual(buffer2hex(data.raw.payload));
  });

  test("inv_message encode index:" + index, () => {
    const inventoryBuffer = bitcoin.InventoriesCodec.encode(hex2buffer(data.raw.payload));
    const inventory: string = buffer2hex(inventoryBuffer);

    const inventoryMessageStructure: MessageStructure<string> = {
      magic: data.raw.magic,
      command: data.raw.command,
      length: data.raw.length,
      checksum: data.raw.checksum,
      payload: inventory,
    };
    const inventoryMessageHex = bitcoin.MessageStructureCodec.encode(hex2buffer(inventoryMessageStructure));
    expect(inventoryMessageHex).toEqual(data.hex);
  });
});
