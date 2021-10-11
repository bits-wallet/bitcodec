// import { MessageCommandCodec } from "./bitcoin/MessageCommandCodec";
import { MessageHeaderCodec } from "./bitcoin/MessageHeaderCodec";
import { TxCodec } from "./bitcoin/TxCodec";

// const CommandCodec = new MessageCommandCodec();
const HeaderCodec = MessageHeaderCodec;

export {
  // CommandCodec,
  HeaderCodec,
  TxCodec,
};
