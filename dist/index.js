"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CArray_1 = require("./lib/CArray");
const CBuffer_1 = require("./lib/CBuffer");
const NumberTypes_1 = require("./models/NumberTypes");
const CNumber_1 = require("./lib/CNumber");
const CObject_1 = require("./lib/CObject");
const CString_1 = require("./lib/CString");
const CVarArray_1 = require("./lib/CVarArray");
const CVarBuffer_1 = require("./lib/CVarBuffer");
const CVarString_1 = require("./lib/CVarString");
const CVarUIntBitcoin_1 = require("./lib/CVarUIntBitcoin");
exports.default = {
    Array: (length, anyCodec) => new CArray_1.CArray(length, anyCodec),
    Buffer: (length) => new CBuffer_1.CBuffer(length),
    Byte: new CNumber_1.CNumber(NumberTypes_1.NumberTypes.UInt8, 1),
    Number: {
        Int8: new CNumber_1.CNumber(NumberTypes_1.NumberTypes.Int8, 1),
        UInt8: new CNumber_1.CNumber(NumberTypes_1.NumberTypes.UInt8, 1),
        Int16BE: new CNumber_1.CNumber(NumberTypes_1.NumberTypes.Int16BE, 2),
        Int16LE: new CNumber_1.CNumber(NumberTypes_1.NumberTypes.Int16LE, 2),
        UInt16BE: new CNumber_1.CNumber(NumberTypes_1.NumberTypes.UInt16BE, 2),
        UInt16LE: new CNumber_1.CNumber(NumberTypes_1.NumberTypes.UInt16LE, 2),
        Int32BE: new CNumber_1.CNumber(NumberTypes_1.NumberTypes.Int32BE, 4),
        Int32LE: new CNumber_1.CNumber(NumberTypes_1.NumberTypes.Int32LE, 4),
        UInt32BE: new CNumber_1.CNumber(NumberTypes_1.NumberTypes.UInt32BE, 4),
        UInt32LE: new CNumber_1.CNumber(NumberTypes_1.NumberTypes.UInt32LE, 4),
        Int64BE: new CNumber_1.CNumber(NumberTypes_1.NumberTypes.Int64BE, 8),
        Int64LE: new CNumber_1.CNumber(NumberTypes_1.NumberTypes.Int64LE, 8),
        UInt64BE: new CNumber_1.CNumber(NumberTypes_1.NumberTypes.UInt64BE, 8),
        UInt64LE: new CNumber_1.CNumber(NumberTypes_1.NumberTypes.UInt64LE, 8),
        FloatBE: new CNumber_1.CNumber(NumberTypes_1.NumberTypes.FloatBE, 4),
        FloatLE: new CNumber_1.CNumber(NumberTypes_1.NumberTypes.FloatLE, 4),
        DoubleBE: new CNumber_1.CNumber(NumberTypes_1.NumberTypes.DoubleBE, 8),
        DoubleLE: new CNumber_1.CNumber(NumberTypes_1.NumberTypes.DoubleLE, 8),
    },
    Object: (items) => new CObject_1.CObject(items),
    String: (length, encodingType = "utf8") => new CString_1.CString(length, encodingType),
    VarArray: (lengthType, anyCodec) => new CVarArray_1.CVarArray(lengthType, anyCodec),
    VarBuffer: (anyCodec) => new CVarBuffer_1.CVarBuffer(anyCodec),
    VarString: (anyCodec, encodingType = "utf8") => new CVarString_1.CVarString(anyCodec, encodingType),
    VarUIntBitcoin: new CVarUIntBitcoin_1.CVarUIntBitcoin(),
};
//# sourceMappingURL=index.js.map