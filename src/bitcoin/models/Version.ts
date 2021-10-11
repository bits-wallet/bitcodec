// https://developer.bitcoin.org/reference/p2p_networking.html#version
export type Version = {
  version: number;
  services: Buffer;
  timestamp: number;
  addrRecvServices: Buffer;
  addrRecvIPAddress: string;
  addrRecvPort: number;
  addrTransServices: Buffer;
  addrTransIPAddress: string;
  addrTransPort: number;
  nonce: number;
  userAgent: string;
  startHeight: number;
  relay: boolean;
};
