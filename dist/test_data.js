const data = {
  tx: {
    hex: "01000000000101d553fbabaf1b26977b6e5d403af9f4b567b3e28484321a6fb02e2824984e3e5000000000171600142b2296c588ec413cebd19c3cbc04ea830ead6e78ffffffff01be1611020000000017a91487e4e5a7ff7bf78b8a8972a49381c8a673917f3e870247304402205f39ccbab38b644acea0776d18cb63ce3e37428cbac06dc23b59c61607aef69102206b8610827e9cb853ea0ba38983662034bd3575cc1ab118fb66d6a98066fa0bed01210304c01563d46e38264283b99bb352b46e69bf132431f102d4bd9a9d8dab075e7f00000000",
    raw: {
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
    },
  },

  messageStructure: {
    hex: "f9beb4d96164647200000000000000001f0000000c30bcb501597a6461090400000000000000000000000000000000ffff9eb572c4208d",
    raw: {
      magic: MAGIC.Mainnet,
      command: "addr",
      length: 31,
      checksum: "0c30bcb5",
      payload: "01597a6461090400000000000000000000000000000000ffff9eb572c4208d",
    },
  },
};
