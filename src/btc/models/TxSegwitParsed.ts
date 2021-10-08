export type TxSegwitParsed = {
  version: number;
  marker: number;
  flag: number;
  inputs: {
    hash: string;
    index: number;
    script: string;
    sequence: number;
  }[];
  outputs: {
    value: number;
    script: string;
  }[];
  witness: string[][];
};
