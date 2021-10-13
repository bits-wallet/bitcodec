import { MessageHeader } from "./MessageHeader";

// https://developer.bitcoin.org/reference/p2p_networking.html#verack
export interface VerackMessage extends MessageHeader<string> {}
