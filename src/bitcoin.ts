// import { MessageCommandCodec } from "./bitcoin/MessageCommandCodec";
import { MessageHeaderCodec } from "./bitcoin/MessageHeaderCodec";
import { VersionCodec } from "./bitcoin/VersionCodec";
import { TxCodec } from "./bitcoin/TxCodec";
import { BlockHeaderCodec } from "./bitcoin/BlockHeaderCodec";

// const CommandCodec = new MessageCommandCodec();
const HeaderCodec = MessageHeaderCodec;

export { BlockHeaderCodec, HeaderCodec, VersionCodec, TxCodec };
