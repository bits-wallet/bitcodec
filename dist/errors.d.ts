export declare const checkLength: (codecName: string, valueLength: number, codecLength: number) => void;
export declare const checkBufferLengthForEncode: (codecName: string, buffer: Buffer, offset: number, codecLength: number) => void;
export declare const checkBufferLengthForDecode: (codecName: string, offset: number, end: number, codecLength: number) => void;
export declare const checkDefined: (codecName: string, value?: any, type?: "object" | "array" | "buffer" | "number" | "string") => void;
export declare const typeError: (codecName: string, message: string) => never;
export declare const rangeError: (codecName: string, message: string) => never;
