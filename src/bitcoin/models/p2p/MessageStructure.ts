// https://en.bitcoin.it/wiki/Protocol_documentation#Message_structure
export interface MessageStructure<T> {
  magic: number;
  command: string;
  length: number;
  checksum: string;
  payload: T;
}
