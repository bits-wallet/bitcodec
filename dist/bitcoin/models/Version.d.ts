/// <reference types="node" />
export declare type Version = {
  version: number;
  services: Buffer;
  timestamp: number;
  addrRecvServices: Buffer;
  addrRecvIPAddress: string;
  addrRecvPort: number;
  addrFromServices: Buffer;
  addrFromIPAddress: string;
  addrFromPort: number;
  nonce: number;
  userAgent: string;
  startHeight: number;
  relay: boolean;
};
