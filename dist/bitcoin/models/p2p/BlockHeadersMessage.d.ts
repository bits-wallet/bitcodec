import { MessageHeader } from "./MessageHeader";
import { BlockHeader } from "../BlockHeader";
export interface BlockHeadersMessage extends MessageHeader<BlockHeader[]> {
}
