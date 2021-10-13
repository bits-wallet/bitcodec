import { MessageStructure } from "./MessageStructure";

// https://developer.bitcoin.org/reference/p2p_networking.html#ping
export type PingPongPayload = {
  nonce: Buffer;
};

export interface PingPongMessage extends MessageStructure<PingPongPayload> {}
