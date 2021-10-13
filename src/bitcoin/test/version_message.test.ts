import * as bitcoin from "../../bitcoin";
import { buffer2hex, hex2buffer } from "../helper";
import { MessageStructure } from "../models/p2p/MessageStructure";
import { Version, VersionMessage } from "../models/p2p/Version";
import { datas } from "./data/version_message";

datas.forEach((data, index) => {
  test("version message decode index:" + index, () => {
    const versionMessageBuffer = bitcoin.MessageStructureCodec.decode(data.hex);
    const version = hex2buffer(versionMessageBuffer.payload);
    const versionBuffer = bitcoin.VersionCodec.decode(version);
    expect(buffer2hex(versionBuffer)).toEqual(buffer2hex(data.raw.payload));
  });

  test("version message encode index:" + index, () => {
    const versionBuffer = bitcoin.VersionCodec.encode(hex2buffer(data.raw.payload));
    const version: string = buffer2hex(versionBuffer);
    const headerAllData: MessageStructure<string> = {
      magic: data.raw.magic,
      command: data.raw.command,
      length: data.raw.length,
      checksum: data.raw.checksum,
      payload: version,
    };

    const versionMessageHex = bitcoin.MessageStructureCodec.encode(hex2buffer(headerAllData));
    expect(buffer2hex(versionMessageHex)).toEqual(data.hex);
  });
});
