import { buffer2hex, hex2buffer } from "../helper";
import { Tx } from "../someCodecs";
import { datas } from "./data/tx_standart";

datas.forEach((data, index) => {
  test("tx_standart decode index:" + index, () => {
    const txHex = data.hex;
    const txRaw = data.raw;

    const resultBuffer = Tx.decode(hex2buffer(txHex));
    const result = buffer2hex(resultBuffer);
    expect(result).toEqual(txRaw);
  });

  test("tx_standart encode index:" + index, () => {
    const txHex = data.hex;
    const txRaw = data.raw;

    const resultBuffer = Tx.encode(hex2buffer(txRaw));
    const result = buffer2hex(resultBuffer);
    expect(result).toEqual(txHex);
  });
});
