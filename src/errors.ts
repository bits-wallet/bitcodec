export const checkLength = (codecName: string, valueLength: number, codecLength: number) => {
  if (valueLength !== codecLength) throw new RangeError(`${codecName} Codec: value length is not equal codec length. valueLength = ${valueLength}, codecLength = ${codecLength}.`);
};

export const checkBufferLengthForEncode = (codecName: string, buffer: Buffer, offset: number, codecLength: number) => {
  if (buffer.length - offset < codecLength)
    throw new RangeError(`${codecName} Codec: buffer is too small. buffer.length = ${buffer.length}, offset = ${offset}, codecLength = ${codecLength}.`);
};

export const checkBufferLengthForDecode = (codecName: string, offset: number, end: number, codecLength: number) => {
  if (end - offset < codecLength) throw new RangeError(`${codecName} Codec: not enough data for decode. offset = ${offset}, end = ${end}, codecLength = ${codecLength}.`);
};

export const checkDefined = (codecName: string, value?: any, type: "buffer" | "object" | "number" | "array" = "object") => {
  if (value === undefined) throw new TypeError(`${codecName} Codec: value must be ${type} but got undefined.`);
};
