import { MessageStructure } from "./MessageStructure";

// https://developer.bitcoin.org/reference/p2p_networking.html#verack
export interface VerackMessage extends MessageStructure<string> {}
