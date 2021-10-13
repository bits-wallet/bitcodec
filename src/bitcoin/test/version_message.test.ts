import * as bitcoin from "../../bitcoin";
import { buffer2hex, hex2buffer } from "../helper";
import { Version, VersionMessage } from "../models/p2p/Version";
import { datas } from "./data/version_message";

datas.forEach((data, index) => {
  test("version message decode index:" + index, () => {
    const headerAllData = bitcoin.HeaderCodec.decode(data.hex);
    const versionPayloadBuffer = bitcoin.VersionCodec.decode(hex2buffer(headerAllData.payload));
    expect(buffer2hex(versionPayloadBuffer)).toEqual(buffer2hex(data.raw.payload));
  });

  test("version message encode index:" + index, () => {
    const versionBuffer = bitcoin.VersionCodec.encode(hex2buffer(data.raw.payload));
    const version: Version = buffer2hex(versionBuffer);
    const headerAllData: VersionMessage = {
      startString: data.raw.startString,
      commandName: data.raw.commandName,
      payloadSize: data.raw.payloadSize,
      checksum: data.raw.checksum,
      payload: version,
    };

    const versionDataBuffer = bitcoin.HeaderCodec.encode(hex2buffer(headerAllData));
    expect(buffer2hex(versionDataBuffer)).toEqual(data.hex);
  });
});
