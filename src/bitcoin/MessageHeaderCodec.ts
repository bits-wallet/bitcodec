import bitcodec from "../";
import { buffer2hex, hex2buffer } from "../bitcoin/helper";
import { MessageCommandCodec } from "./MessageCommandCodec";
import { MessageHeader } from "./models/p2p/MessageHeader";

const _MessageHeaderCodec = bitcodec.Object([
  ["startString", bitcodec.Number.UInt32LE],
  ["commandName", new MessageCommandCodec()],
  ["payloadSize", bitcodec.Number.UInt32LE],
  ["checksum", bitcodec.Buffer(4)],
  ["payload", bitcodec.AllBuffer],
]);

export const MessageHeaderCodec = {
  decode: (hex: string): MessageHeader<string> => {
    return buffer2hex(_MessageHeaderCodec.decode(hex2buffer(hex)));
  },

  encode: (obj: MessageHeader<string>): string => {
    return buffer2hex(_MessageHeaderCodec.encode(hex2buffer(obj)));
  },
};
