import * as bitcoin from "../../bitcoin";
import { buffer2hex, hex2buffer } from "../helper";
import { datas } from "./data/version";

datas.forEach((data, index) => {
  test("version decode index:" + index, () => {
    const headerAllData = bitcoin.HeaderCodec.decode(data.hex);
    const versionPayloadBuffer = bitcoin.VersionCodec.decode(hex2buffer(headerAllData.payload));
    expect(buffer2hex(versionPayloadBuffer)).toEqual(data.raw.payload);
  });

  test("version encode index:" + index, () => {
    const versionPayloadHex = bitcoin.VersionCodec.encode(hex2buffer(data.raw.payload));
    const headerAllData = {
      startString: data.raw.startString,
      commandName: data.raw.commandName,
      payloadSize: data.raw.payloadSize,
      checksum: data.raw.checksum,
      payload: versionPayloadHex,
    };

    const versionDataBuffer = bitcoin.HeaderCodec.encode(hex2buffer(headerAllData));
    expect(buffer2hex(versionDataBuffer)).toEqual(data.hex);
  });
});
