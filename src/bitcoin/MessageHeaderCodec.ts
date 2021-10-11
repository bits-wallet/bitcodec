import bitcodec from "../";
import * as bitcoin from "../bitcoin";
import { buffer2hex, hex2buffer } from "../bitcoin/helper";
import { MessageCommandCodec } from "./MessageCommandCodec";
import { MessageHeader } from "./models/MessageHeader";

const _MessageHeaderCodec = bitcodec.Object([
  ["startString", bitcodec.Number.UInt32LE],
  ["commandName", new MessageCommandCodec()],
  ["payloadSize", bitcodec.Number.UInt32LE],
  ["checksum", bitcodec.Buffer(4)],
]);

export const MessageHeaderCodec = {
  decode: (hex: string): MessageHeader => {
    return buffer2hex(_MessageHeaderCodec.decode(hex2buffer(hex)));
  },

  encode: (obj: MessageHeader): string => {
    return buffer2hex(_MessageHeaderCodec.encode(hex2buffer(obj)));
  },
};
