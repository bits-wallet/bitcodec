// https://developer.bitcoin.org/reference/p2p_networking.html#message-headers
export interface MessageHeader<T> {
  startString: number;
  commandName: string;
  payloadSize: number;
  checksum: string;
  payload: T;
}
