export declare type MessageStructure = {
  magic: number;
  command: string;
  length: number;
  checksum: string;
  payload: string;
};
