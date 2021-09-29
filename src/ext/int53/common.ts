const MAX_UINT32 = 0x00000000ffffffff;
const MAX_INT53 = 0x001fffffffffffff;

export enum Int53Type {
  Int64BE = "Int64BE",
  Int64LE = "Int64LE",
  UInt64BE = "UInt64BE",
  UInt64LE = "UInt64LE",
}

export const assert = (test: boolean, message: string) => {
  if (!test) throw new Error(message);
};

export const onesComplement = (number: number): number => {
  number = ~number;
  if (number < 0) {
    number = (number & 0x7fffffff) + 0x80000000;
  }
  return number;
};

export const uintHighLow = (number: number): number[] => {
  assert(number > -1 && number <= MAX_INT53, "number out of range");
  assert(Math.floor(number) === number, "number must be an integer");
  var high = 0;
  var signbit = number & 0xffffffff;
  var low = signbit < 0 ? (number & 0x7fffffff) + 0x80000000 : signbit;
  if (number > MAX_UINT32) {
    high = (number - low) / (MAX_UINT32 + 1);
  }
  return [high, low];
};

export const intHighLow = (number: number): number[] => {
  if (number > -1) {
    return uintHighLow(number);
  }
  var hl = uintHighLow(-number);
  var high = onesComplement(hl[0]);
  var low = onesComplement(hl[1]);
  if (low === MAX_UINT32) {
    high += 1;
    low = 0;
  } else {
    low += 1;
  }
  return [high, low];
};

export const toDouble = (high: number, low: number, signed: boolean): number => {
  if (signed && (high & 0x80000000) !== 0) {
    high = onesComplement(high);
    low = onesComplement(low);
    assert(high < 0x00200000, "number too small");
    return -(high * (MAX_UINT32 + 1) + low + 1);
  } else {
    //positive
    assert(high < 0x00200000, "number too large");
    return high * (MAX_UINT32 + 1) + low;
  }
};
