import { MessageHeader } from "./MessageHeader";

export type Inventory = {
  type: number;
  hash: string;
};

export interface InvMessage extends MessageHeader<Inventory[]> {}
