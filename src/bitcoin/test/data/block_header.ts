import { MAGIC } from "../../models/p2p/MAGIC";
import { BlockHeader } from "../../models/BlockHeader";

type BlockHeaderData = {
  hex: string;
  raw: BlockHeader;
};

export const datas: BlockHeaderData[] = [
  {
    hex: "04e0ff2f7b8d134d1e1445a2df1c681374839e87dbf32658de570400000000000000000011ef2eb8d6c4b963eaeb8c1039eb946ab86c39649a9877662d6538fe70c93a2ff875656132260e1715bf98b600",
    raw: {
      version: 805298180,
      prevBlock: "7b8d134d1e1445a2df1c681374839e87dbf32658de5704000000000000000000",
      merkleRoot: "11ef2eb8d6c4b963eaeb8c1039eb946ab86c39649a9877662d6538fe70c93a2f",
      timestamp: 1634039288,
      bits: 386803250,
      nonce: 3063463701,
      txnCount: 0,
    },
  },
];
