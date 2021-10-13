import * as bitcoin from "../../bitcoin";
import { buffer2hex, hex2buffer } from "../helper";
import { Version, VersionMessage } from "../models/p2p/Version";
import { datas } from "./data/verack_message";

datas.forEach((data, index) => {
  test("verack_ message decode index:" + index, () => {
    const verackBuffer = bitcoin.HeaderCodec.decode(data.hex);
    const verack = buffer2hex(verackBuffer);
    expect(verack).toEqual(data.raw);
  });

  test("verack_ message encode index:" + index, () => {
    const verackHex = bitcoin.HeaderCodec.encode(hex2buffer(data.raw));
    expect(verackHex).toEqual(data.hex);
  });
});
