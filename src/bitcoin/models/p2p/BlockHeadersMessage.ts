import { MessageStructure } from "./MessageStructure";
import { BlockHeader } from "../BlockHeader";

export interface BlockHeadersMessage extends MessageStructure<BlockHeader[]> {}
