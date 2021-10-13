import { BlockMessage } from "../../models/p2p/BlockMessage";

type BlockMessageData = {
  hex: string;
  raw: BlockMessage;
};

export const datas: BlockMessageData[] = [
  {
    // f9beb4d9706f6e670000000000000000080000008fed5aeeddf5a1730c2c48cd
    hex: "f9beb4d9626c6f636b00000000000000d7000000877b48ca010000006f187fddd5e28aa1b4065daa5d9eae0c487094fb20cf97ca02b81c84000000005b7b25b51797f83192f9fd2c3871bfb27570a7d6b56d3a50760613d1a2fc1aeeab346849ffff001d36d950710101000000010000000000000000000000000000000000000000000000000000000000000000ffffffff0704ffff001d0120ffffffff0100f2052a0100000043410408ab2f56361f83064e4ce51acc291fb57c2cbcdb1d6562f6278c43a1406b548fd6cefc11bcc29eb620d5861cb9ed69dc39f2422f54b06a8af4f78c8276cfdc6bac00000000",
    raw: {
      magic: 3652501241,
      command: "block",
      length: 215,
      checksum: "877b48ca",
      payload: {
        blockHeader: {
          version: 1,
          previousBlockHeaderHash: "6f187fddd5e28aa1b4065daa5d9eae0c487094fb20cf97ca02b81c8400000000",
          merkleRootHash: "5b7b25b51797f83192f9fd2c3871bfb27570a7d6b56d3a50760613d1a2fc1aee",
          time: 1231565995,
          nBits: 486604799,
          nonce: 1901123894,
        },
        txns: [
          {
            version: 1,
            txIn: [
              {
                previousOutput: {
                  hash: "0000000000000000000000000000000000000000000000000000000000000000",
                  index: 4294967295,
                },
                signatureScript: "04ffff001d0120",
                sequence: 4294967295,
              },
            ],
            txOut: [
              {
                value: 5000000000,
                pkScript: "410408ab2f56361f83064e4ce51acc291fb57c2cbcdb1d6562f6278c43a1406b548fd6cefc11bcc29eb620d5861cb9ed69dc39f2422f54b06a8af4f78c8276cfdc6bac",
              },
            ],
            lockTime: 0,
          },
        ],
      },
    },
  },
];
