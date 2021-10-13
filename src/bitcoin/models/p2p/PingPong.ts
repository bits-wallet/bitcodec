import { MessageHeader } from "./MessageHeader";

// https://developer.bitcoin.org/reference/p2p_networking.html#ping
export type PingPongPayload = {
  nonce: Buffer;
};

export interface PingPongMessage extends MessageHeader<PingPongPayload> {}
