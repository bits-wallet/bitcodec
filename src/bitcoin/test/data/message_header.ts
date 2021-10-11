import { MessageHeader } from "../../models/MessageHeader";

type MessageHeaderData = {
  hex: string;
  raw: MessageHeader;
};
export const datas: MessageHeaderData[] = [
  {
    hex: "f9beb4d970696e6700000000000000000800000007fb26b6ed9801961797a5f1",
    raw: {
      startString: 3652501241,
      commandName: "ping",
      payloadSize: 8,
      checksum: "07fb26b6",
    },
  },
  {
    hex: "f9beb4d9706f6e670000000000000000080000007264244815569dfaed442652",
    raw: {
      startString: 3652501241,
      commandName: "pong",
      payloadSize: 8,
      checksum: "72642448",
    },
  },
  {
    hex: "f9beb4d976657273696f6e000000000066000000df7d29e6",
    raw: {
      startString: 3652501241,
      commandName: "version",
      payloadSize: 102,
      checksum: "df7d29e6",
    },
  },
  {
    hex: "f9beb4d976657273696f6e00000000006600000097302af5801101000904000000000000e577646100000000000000000000000000000000000000000000ffff1fdf0364085e090400000000000000000000000000000000000000000000000072036dbc6d407f7f102f5361746f7368693a32322e302e302f26c00a0001",
    raw: {
      startString: 3652501241,
      commandName: "version",
      payloadSize: 102,
      checksum: "97302af5",
    },
  },
  {
    hex: "f9beb4d976657261636b000000000000000000005df6e0e2",
    raw: {
      startString: 3652501241,
      commandName: "verack",
      payloadSize: 0,
      checksum: "5df6e0e2",
    },
  },
  {
    hex: "f9beb4d9616c65727400000000000000a80000001bf9aaea60010000000000000000000000ffffff7f00000000ffffff7ffeffff7f01ffffff7f00000000ffffff7f00ffffff7f002f555247454e543a20416c657274206b657920636f6d70726f6d697365642c2075706772616465207265717569726564004630440220653febd6410f470f6bae11cad19c48413becb1ac2c17f908fd0fd53bdc3abd5202206d0e9c96fe88d4a0f01ed9dedae2b6f9e00da94cad0fecaae66ecf689bf71b50",
    raw: {
      startString: 3652501241,
      commandName: "alert",
      payloadSize: 168,
      checksum: "1bf9aaea",
    },
  },
  {
    hex: "f9beb4d96164647200000000000000001f0000000c30bcb501597a6461090400000000000000000000000000000000ffff9eb572c4208d",
    raw: {
      startString: 3652501241,
      commandName: "addr",
      payloadSize: 31,
      checksum: "0c30bcb5",
    },
  },
  {
    hex: "f9beb4d973656e646865616465727300000000005df6e0e2",
    raw: {
      startString: 3652501241,
      commandName: "sendheaders",
      payloadSize: 0,
      checksum: "5df6e0e2",
    },
  },
];
