import bitcodec from "../../src";

export default [
  {
    hex: "0170656e6775656e",
    codec: bitcodec.Object([
      ["a", bitcodec.Byte],
      ["b", bitcodec.String(7)],
    ]),
    encodeBytes: 8,
    decodeBytes: 8,
    encodingLength: 8,
    obj: {
      a: 1,
      b: "penguen",
    },
  },
  {
    hex: "10026162af",
    codec: bitcodec.Object([
      ["x", bitcodec.Number.UInt8],
      ["y", bitcodec.VarArray(bitcodec.VarUIntBitcoin, bitcodec.String(1))],
      ["z", bitcodec.Buffer(1)],
    ]),
    encodeBytes: 5,
    decodeBytes: 5,
    encodingLength: 5,
    obj: {
      x: 16,
      y: ["a", "b"],
      z: "af",
    },
  },
  {
    hex: "10026162af0170656e6775656e",
    codec: bitcodec.Object([
      ["x", bitcodec.Number.UInt8],
      ["y", bitcodec.VarArray(bitcodec.VarUIntBitcoin, bitcodec.String(1))],
      ["z", bitcodec.Buffer(1)],
      [
        "t",
        bitcodec.Object([
          ["a", bitcodec.Byte],
          ["b", bitcodec.String(7)],
        ]),
      ],
    ]),
    encodeBytes: 13,
    decodeBytes: 13,
    encodingLength: 13,
    obj: {
      x: 16,
      y: ["a", "b"],
      z: "af",
      t: {
        a: 1,
        b: "penguen",
      },
    },
  },
  {
    hex: "000c10026162af0170656e6775656e756d75740300ff00dd00ee02ccbbaa998877425443",
    codec: bitcodec.Object([
      ["i", bitcodec.Number.Int16BE],
      ["x", bitcodec.Number.UInt8],
      ["y", bitcodec.VarArray(bitcodec.VarUIntBitcoin, bitcodec.String(1))],
      ["z", bitcodec.Buffer(1)],
      [
        "t",
        bitcodec.Object([
          ["a", bitcodec.Byte],
          [
            "b",
            bitcodec.Object([
              ["b1", bitcodec.String(7)],
              ["b2", bitcodec.String(4)],
            ]),
          ],
          ["c", bitcodec.VarArray(bitcodec.VarUIntBitcoin, bitcodec.Buffer(2))],
          [
            "d",
            bitcodec.VarArray(
              bitcodec.VarUIntBitcoin,
              bitcodec.Object([
                ["d1", bitcodec.Buffer(1)],
                ["d2", bitcodec.Buffer(1)],
                ["d3", bitcodec.Buffer(1)],
              ])
            ),
          ],
        ]),
      ],
      ["w", bitcodec.Array(1, bitcodec.String(3))],
    ]),
    encodeBytes: 36,
    decodeBytes: 36,
    encodingLength: 36,
    obj: {
      i: 12,
      x: 16,
      y: ["a", "b"],
      z: "af",
      t: {
        a: 1,
        b: { b1: "penguen", b2: "umut" },
        c: ["00ff", "00dd", "00ee"],
        d: [
          { d1: "cc", d2: "bb", d3: "aa" },
          { d1: "99", d2: "88", d3: "77" },
        ],
      },
      w: ["BTC"],
    },
  },
];
