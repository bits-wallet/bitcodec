import * as bitcoin from "../../bitcoin";
import { hex2buffer } from "../helper";
import { datas } from "./data/block_header_message";

test("block_header decode index:", () => {
  const headerAllData = bitcoin.MessageStructureCodec.decode(
    hex2buffer(
      "f9beb4d9686561646572730000000000450100003d3370e50404e0ff2f7b8d134d1e1445a2df1c681374839e87dbf32658de570400000000000000000011ef2eb8d6c4b963eaeb8c1039eb946ab86c39649a9877662d6538fe70c93a2ff875656132260e1715bf98b60004006020b4ebbea3b7cef7c2f6fe3842d7187e8031168ccfde110e00000000000000000063a392ce675dd436b12b26724b3c31e6e1eeec1f663d9dfb732c713f4c71ab667f79656132260e175d60c5330004002020995f1bbecf662e4232b5da02922f35832a7492b357d101000000000000000000ad5032b9f680aedc1956e08be86381824011e2ed5aa459b992c7062be4cc354eca79656132260e1760a4663c0004000020de4d609e6ea7c76f7be83352e2e0cb3faae5bd3f819500000000000000000000007284c255c17e276aa2d1e7f42caddf89a197b8cb94e59a6bf1ebb0d129ea34b97a656132260e170d446a3200f9beb4d9706f6e670000000000000000080000007dbd9c4439a9f19317217623"
    )
  );

  const result = bitcoin.BlockHeadersCodec.decode(hex2buffer(headerAllData.payload));

  console.log(result);

  // expect(result[0].headers.version).toEqual(data.raw.payload[0].headers.version);
  // expect(result[0].headers.previousBlockHeaderHash).toEqual(data.raw.payload[0].headers.previousBlockHeaderHash);
  // expect(result[0].headers.merkleRootHash).toEqual(data.raw.payload[0].headers.merkleRootHash);
});
