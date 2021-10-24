import bitcodec from "../../src";

const scriptCodec = bitcodec.VarBuffer(bitcodec.VarUIntBitcoin); // var_int, uchar[]

export default [
  {
    hex: "6b483045022100f3c0f555cd39198caf77f6756256801fc57bcabe4892601b9def52259698f40a0220230262841bff151eb617f7d4cdda6bf06d6fa791230c152e47f68bcdd0e6f64a01210204b3506d8903ca601c97a4abab6548e91004c535a5a45e21299a494b146859ca",
    codec: scriptCodec,
    encodeBytes: 109,
    decodeBytes: 109,
    encodingLength: 109,
    obj: "483045022100f3c0f555cd39198caf77f6756256801fc57bcabe4892601b9def52259698f40a0220230262841bff151eb617f7d4cdda6bf06d6fa791230c152e47f68bcdd0e6f64a01210204b3506d8903ca601c97a4abab6548e91004c535a5a45e21299a494b146859ca",
  },
];
