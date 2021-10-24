import bitcodec from "../../src";

const txVersion = bitcodec.Number.UInt32LE; // uint32_t
const txInItemPreviousOutput = bitcodec.Object([
  { name: "hash", type: bitcodec.Buffer(32) }, // char[32]
  { name: "index", type: bitcodec.Number.UInt32LE }, // uint32_t
]);
const signatureScript = bitcodec.VarBuffer(bitcodec.VarUIntBitcoin); // var_int, uchar[]
const txInItem = bitcodec.Object([
  { name: "previousOutput", type: txInItemPreviousOutput },
  { name: "signatureScript", type: signatureScript },
  { name: "sequence", type: bitcodec.Number.UInt32LE }, // uint32_t
]);
const txIn = bitcodec.VarArray(bitcodec.VarUIntBitcoin, txInItem);
const txOutItem = bitcodec.Object([
  { name: "value", type: bitcodec.Number.Int64LE }, // int64_t
  { name: "pkScript", type: bitcodec.VarBuffer(bitcodec.VarUIntBitcoin) }, // var_int, uchar[]
]);
const txOut = bitcodec.VarArray(bitcodec.VarUIntBitcoin, txOutItem);
const txLockTime = bitcodec.Number.UInt32LE; // uint32_t
const Tx = bitcodec.Object([
  { name: "version", type: txVersion },
  { name: "txIn", type: txIn }, // compactSize uint
  { name: "txOut", type: txOut }, // compactSize uint
  { name: "lockTime", type: txLockTime },
]);

const obj = {
  version: 1,
  txIn: [
    {
      previousOutput: {
        hash: "b0c03779c38ddabc044947b164adbcffde8e0ddb3678494f4e8b83f13b37629d",
        index: 1,
      },
      signatureScript:
        "483045022100f3c0f555cd39198caf77f6756256801fc57bcabe4892601b9def52259698f40a0220230262841bff151eb617f7d4cdda6bf06d6fa791230c152e47f68bcdd0e6f64a01210204b3506d8903ca601c97a4abab6548e91004c535a5a45e21299a494b146859ca",
      sequence: 4294967295,
    },
    {
      previousOutput: {
        hash: "060eeae54b70d12caddcc15f8897ebc2b6c3011c9a600aba74d49b969991cab3",
        index: 0,
      },
      signatureScript:
        "4830450221009dbeb64ddd4646e1118503c87feaa95c531b5178c6e543be782f6ecb05e8fbe602203945570f8dc56c145617f0283fa4032e0b7895a9cf2a81c7b65665b8ac608cb00121026602a5dc59c30f485b2c457ac8e2f617e27b10a1d2ae76f3231f9b01dff08964",
      sequence: 4294967295,
    },
    {
      previousOutput: {
        hash: "7f715ba408db0289118f9b8578e54e721f1aee10d09844510793b8b20c87903e",
        index: 1,
      },
      signatureScript:
        "48304502210095e300886ec4df78e39d6d0cf5e5e531ded8f42f00e5730c371d8951867dad5b02203c55f9403f6c2aac444213161a93a86661e7367d4007be74ffb3981387cc1c790121023f0aadfeb71a4964c5087fec8b052c8236051dae838d4747543330c6b266ce6e",
      sequence: 4294967295,
    },
  ],
  txOut: [
    {
      value: 1145045,
      pkScript: "76a914342ab422c9e3ef285efe9882ae54269ed9713dd688ac",
    },
    {
      value: 500000,
      pkScript: "76a91488d924f51033b74a895863a5fb57fd545529df7d88ac",
    },
  ],
  lockTime: 0,
};

const hexAll =
  "0100000003b0c03779c38ddabc044947b164adbcffde8e0ddb3678494f4e8b83f13b37629d010000006b483045022100f3c0f555cd39198caf77f6756256801fc57bcabe4892601b9def52259698f40a0220230262841bff151eb617f7d4cdda6bf06d6fa791230c152e47f68bcdd0e6f64a01210204b3506d8903ca601c97a4abab6548e91004c535a5a45e21299a494b146859caffffffff060eeae54b70d12caddcc15f8897ebc2b6c3011c9a600aba74d49b969991cab3000000006b4830450221009dbeb64ddd4646e1118503c87feaa95c531b5178c6e543be782f6ecb05e8fbe602203945570f8dc56c145617f0283fa4032e0b7895a9cf2a81c7b65665b8ac608cb00121026602a5dc59c30f485b2c457ac8e2f617e27b10a1d2ae76f3231f9b01dff08964ffffffff7f715ba408db0289118f9b8578e54e721f1aee10d09844510793b8b20c87903e010000006b48304502210095e300886ec4df78e39d6d0cf5e5e531ded8f42f00e5730c371d8951867dad5b02203c55f9403f6c2aac444213161a93a86661e7367d4007be74ffb3981387cc1c790121023f0aadfeb71a4964c5087fec8b052c8236051dae838d4747543330c6b266ce6effffffff02d5781100000000001976a914342ab422c9e3ef285efe9882ae54269ed9713dd688ac20a10700000000001976a91488d924f51033b74a895863a5fb57fd545529df7d88ac00000000";
const hexObj = [
  // version
  "01000000",
  // txIns
  "03b0c03779c38ddabc044947b164adbcffde8e0ddb3678494f4e8b83f13b37629d010000006b483045022100f3c0f555cd39198caf77f6756256801fc57bcabe4892601b9def52259698f40a0220230262841bff151eb617f7d4cdda6bf06d6fa791230c152e47f68bcdd0e6f64a01210204b3506d8903ca601c97a4abab6548e91004c535a5a45e21299a494b146859caffffffff060eeae54b70d12caddcc15f8897ebc2b6c3011c9a600aba74d49b969991cab3000000006b4830450221009dbeb64ddd4646e1118503c87feaa95c531b5178c6e543be782f6ecb05e8fbe602203945570f8dc56c145617f0283fa4032e0b7895a9cf2a81c7b65665b8ac608cb00121026602a5dc59c30f485b2c457ac8e2f617e27b10a1d2ae76f3231f9b01dff08964ffffffff7f715ba408db0289118f9b8578e54e721f1aee10d09844510793b8b20c87903e010000006b48304502210095e300886ec4df78e39d6d0cf5e5e531ded8f42f00e5730c371d8951867dad5b02203c55f9403f6c2aac444213161a93a86661e7367d4007be74ffb3981387cc1c790121023f0aadfeb71a4964c5087fec8b052c8236051dae838d4747543330c6b266ce6effffffff",
  // txOut
  "02d5781100000000001976a914342ab422c9e3ef285efe9882ae54269ed9713dd688ac20a10700000000001976a91488d924f51033b74a895863a5fb57fd545529df7d88ac",
  // locktime
  "00000000",
];
const hexTxIn = [
  // 0
  "b0c03779c38ddabc044947b164adbcffde8e0ddb3678494f4e8b83f13b37629d010000006b483045022100f3c0f555cd39198caf77f6756256801fc57bcabe4892601b9def52259698f40a0220230262841bff151eb617f7d4cdda6bf06d6fa791230c152e47f68bcdd0e6f64a01210204b3506d8903ca601c97a4abab6548e91004c535a5a45e21299a494b146859caffffffff",
  // 1
  "060eeae54b70d12caddcc15f8897ebc2b6c3011c9a600aba74d49b969991cab3000000006b4830450221009dbeb64ddd4646e1118503c87feaa95c531b5178c6e543be782f6ecb05e8fbe602203945570f8dc56c145617f0283fa4032e0b7895a9cf2a81c7b65665b8ac608cb00121026602a5dc59c30f485b2c457ac8e2f617e27b10a1d2ae76f3231f9b01dff08964ffffffff",
  // 2
  "7f715ba408db0289118f9b8578e54e721f1aee10d09844510793b8b20c87903e010000006b48304502210095e300886ec4df78e39d6d0cf5e5e531ded8f42f00e5730c371d8951867dad5b02203c55f9403f6c2aac444213161a93a86661e7367d4007be74ffb3981387cc1c790121023f0aadfeb71a4964c5087fec8b052c8236051dae838d4747543330c6b266ce6effffffff",
];
const hexTxIn0 = [
  // previousOutput
  "b0c03779c38ddabc044947b164adbcffde8e0ddb3678494f4e8b83f13b37629d01000000",
  // signatureScript
  "6b483045022100f3c0f555cd39198caf77f6756256801fc57bcabe4892601b9def52259698f40a0220230262841bff151eb617f7d4cdda6bf06d6fa791230c152e47f68bcdd0e6f64a01210204b3506d8903ca601c97a4abab6548e91004c535a5a45e21299a494b146859ca",
  // sequence
  "ffffffff",
];

export default [
  {
    hex: hexObj[0],
    codec: txVersion,
    encodeBytes: 4,
    decodeBytes: 4,
    encodingLength: 4,
    obj: obj.version,
  },
  {
    hex: hexTxIn0[0],
    codec: txInItemPreviousOutput,
    encodeBytes: 36,
    decodeBytes: 36,
    encodingLength: 36,
    obj: obj.txIn[0].previousOutput,
  },
  {
    hex: hexTxIn0[1],
    codec: signatureScript,
    encodeBytes: 108,
    decodeBytes: 108,
    encodingLength: 108,
    obj: obj.txIn[0].signatureScript,
  },
  {
    hex: hexTxIn[0],
    codec: txInItem,
    encodeBytes: 148,
    decodeBytes: 148,
    encodingLength: 148,
    obj: obj.txIn[0],
  },
  {
    hex: hexTxIn[1],
    codec: txInItem,
    encodeBytes: 148,
    decodeBytes: 148,
    encodingLength: 148,
    obj: obj.txIn[1],
  },
  {
    hex: hexTxIn[2],
    codec: txInItem,
    encodeBytes: 148,
    decodeBytes: 148,
    encodingLength: 148,
    obj: obj.txIn[2],
  },
  {
    hex: hexObj[1],
    codec: txIn,
    encodeBytes: 445,
    decodeBytes: 445,
    encodingLength: 445,
    obj: obj.txIn,
  },
  {
    hex: hexObj[2],
    codec: txOut,
    encodeBytes: 69,
    decodeBytes: 69,
    encodingLength: 69,
    obj: obj.txOut,
  },
  {
    hex: hexObj[3],
    codec: txLockTime,
    encodeBytes: 4,
    decodeBytes: 4,
    encodingLength: 4,
    obj: obj.lockTime,
  },
  {
    hex: hexAll,
    codec: Tx,
    encodeBytes: 522,
    decodeBytes: 522,
    encodingLength: 522,
    obj: obj,
  },
];
