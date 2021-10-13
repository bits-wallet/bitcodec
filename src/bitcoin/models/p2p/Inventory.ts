import { MessageStructure } from "./MessageStructure";

export type Inventory = {
  type: number;
  hash: string;
};

export interface InvMessage extends MessageStructure<Inventory[]> {}
