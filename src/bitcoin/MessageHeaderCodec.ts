import bitcodec from "../";
import * as bitcoin from "../bitcoin";
import { buffer2hex, hex2buffer } from "../bitcoin/helper";
import { MessageCommandCodec } from "./MessageCommandCodec";

const _MessageHeaderCodec = bitcodec.Object([
  ["magic", bitcodec.Number.UInt32LE],
  ["command", new MessageCommandCodec()],
  ["length", bitcodec.Number.UInt32LE],
  ["checksum", bitcodec.Buffer(4)],
]);

export const MessageHeaderCodec = {
  decode: (hex: string) => {
    return buffer2hex(_MessageHeaderCodec.decode(hex2buffer(hex)));
  },

  encode: (obj: any) => {
    return buffer2hex(_MessageHeaderCodec.encode(hex2buffer(obj)));
  },
};
