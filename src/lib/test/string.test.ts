import { randomBytes } from "crypto";
import bitcodec from "../..";
import { EncodingType } from "../../models/EncodingType";

test("String 1", () => {
  const encodingTypes: EncodingType[] = ["base64", "binary", "hex"];
  encodingTypes.forEach((encodingType) => {
    const length = 42;
    const s = randomBytes(length).toString(encodingType);
    const fixedstring = bitcodec.String(length, encodingType);
    expect(fixedstring.decode(fixedstring.encode(s))).toEqual(s);
  });
});

test("String 2", () => {
  expect(bitcodec.String(42).encodingLength()).toEqual(42);
});
