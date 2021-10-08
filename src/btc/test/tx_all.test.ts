import { TxCodec } from "../TxCodec";
import { datas } from "./data/tx_all";

datas.forEach((data, index) => {
  test("tx_all decode index:" + index, () => {
    const result = TxCodec.decode(data.hex);
    expect(result).toEqual(data.raw);
  });

  test("tx_all encode index:" + index, () => {
    const result = TxCodec.encode(data.raw);
    expect(result).toEqual(data.hex);
  });
});
