// import { MessageCommandCodec } from "./bitcoin/MessageCommandCodec";
import { MessageHeaderCodec } from "./bitcoin/MessageHeaderCodec";
import { VersionCodec } from "./bitcoin/VersionCodec";
import { TxCodec } from "./bitcoin/TxCodec";
import { InventoriesCodec } from "./bitcoin/InventoriesCodec";
/* import { BlockHeaderCodec } from "./bitcoin/BlockHeaderCodec";
import { BlockCodec } from "./bitcoin/BlockCodec"; */

// const CommandCodec = new MessageCommandCodec();
const HeaderCodec = MessageHeaderCodec;

export { /* BlockCodec, BlockHeaderCodec, */ HeaderCodec, VersionCodec, InventoriesCodec, TxCodec };
