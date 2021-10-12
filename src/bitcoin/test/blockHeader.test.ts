import * as bitcoin from "../../bitcoin";
import { datas } from "./data/message_header";

test("blockheader decode:", () => {
  const headerAllData = bitcoin.HeaderCodec.decode(datas[0].hex);
  const result = bitcoin.BlockHeaderCodec.decode(headerAllData.payload);

  console.log(result);
});
