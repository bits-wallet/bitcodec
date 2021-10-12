import { MessageHeader } from "./MessageHeader";

// https://developer.bitcoin.org/reference/p2p_networking.html#ping
export type PingPongPayload = {
  nonce: Buffer;
};

export interface PingPong extends MessageHeader<PingPongPayload> {}
