import { MessageHeader } from "./MessageHeader";

// https://developer.bitcoin.org/reference/p2p_networking.html#version
type Addr = {
  services: Buffer;
  iPAddress: string;
  port: number;
};
export type VersionPayload = {
  version: number;
  services: Buffer;
  timestamp: number;
  addrRecv: Addr;
  addrTrans: Addr;
  nonce: Buffer;
  userAgent: string;
  startHeight: number;
  relay: boolean;
};

export interface VersionMessage extends MessageHeader<VersionPayload> {}
