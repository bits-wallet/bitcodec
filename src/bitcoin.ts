// import { MessageCommandCodec } from "./bitcoin/MessageCommandCodec";
import { MessageHeaderCodec } from "./bitcoin/MessageHeaderCodec";
import { VersionCodec } from "./bitcoin/VersionCodec";
import { TxCodec } from "./bitcoin/TxCodec";

// const CommandCodec = new MessageCommandCodec();
const HeaderCodec = MessageHeaderCodec;

export { HeaderCodec, VersionCodec, TxCodec };
