// https://developer.bitcoin.org/reference/p2p_networking.html#message-headers
export type MessageHeader = {
  startString: number;
  commandName: string;
  payloadSize: number;
  checksum: string;
};
