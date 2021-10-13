import * as bitcoin from "../../bitcoin";
import { buffer2hex, hex2buffer } from "../helper";
import { Inventory, InvMessage } from "../models/p2p/Inventory";
import { MessageHeader } from "../models/p2p/MessageHeader";
import { datas } from "./data/inv_message";

datas.forEach((data, index) => {
  test("inv_message decode index:" + index, () => {
    const inventoryMessageBuffer = bitcoin.HeaderCodec.decode(data.hex);
    const inventories = hex2buffer(inventoryMessageBuffer.payload);
    const inventoryBuffer = bitcoin.InventoriesCodec.decode(inventories);
    expect(buffer2hex(inventoryBuffer)).toEqual(buffer2hex(data.raw.payload));
  });

  test("inv_message encode index:" + index, () => {
    const inventoryBuffer = bitcoin.InventoriesCodec.encode(hex2buffer(data.raw.payload));
    const inventory: string = buffer2hex(inventoryBuffer);

    const inventoryMessageHeader: MessageHeader<string> = {
      startString: data.raw.startString,
      commandName: data.raw.commandName,
      payloadSize: data.raw.payloadSize,
      checksum: data.raw.checksum,
      payload: inventory,
    };
    const inventoryMessageHex = bitcoin.HeaderCodec.encode(hex2buffer(inventoryMessageHeader));
    expect(inventoryMessageHex).toEqual(data.hex);
  });
});
