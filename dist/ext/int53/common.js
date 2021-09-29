"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toDouble = exports.intHighLow = exports.uintHighLow = exports.onesComplement = exports.assert = exports.Int53Type = void 0;
const MAX_UINT32 = 0x00000000ffffffff;
const MAX_INT53 = 0x001fffffffffffff;
var Int53Type;
(function (Int53Type) {
    Int53Type["Int64BE"] = "Int64BE";
    Int53Type["Int64LE"] = "Int64LE";
    Int53Type["UInt64BE"] = "UInt64BE";
    Int53Type["UInt64LE"] = "UInt64LE";
})(Int53Type = exports.Int53Type || (exports.Int53Type = {}));
const assert = (test, message) => {
    if (!test)
        throw new Error(message);
};
exports.assert = assert;
const onesComplement = (number) => {
    number = ~number;
    if (number < 0) {
        number = (number & 0x7fffffff) + 0x80000000;
    }
    return number;
};
exports.onesComplement = onesComplement;
const uintHighLow = (number) => {
    (0, exports.assert)(number > -1 && number <= MAX_INT53, "number out of range");
    (0, exports.assert)(Math.floor(number) === number, "number must be an integer");
    var high = 0;
    var signbit = number & 0xffffffff;
    var low = signbit < 0 ? (number & 0x7fffffff) + 0x80000000 : signbit;
    if (number > MAX_UINT32) {
        high = (number - low) / (MAX_UINT32 + 1);
    }
    return [high, low];
};
exports.uintHighLow = uintHighLow;
const intHighLow = (number) => {
    if (number > -1) {
        return (0, exports.uintHighLow)(number);
    }
    var hl = (0, exports.uintHighLow)(-number);
    var high = (0, exports.onesComplement)(hl[0]);
    var low = (0, exports.onesComplement)(hl[1]);
    if (low === MAX_UINT32) {
        high += 1;
        low = 0;
    }
    else {
        low += 1;
    }
    return [high, low];
};
exports.intHighLow = intHighLow;
const toDouble = (high, low, signed) => {
    if (signed && (high & 0x80000000) !== 0) {
        high = (0, exports.onesComplement)(high);
        low = (0, exports.onesComplement)(low);
        (0, exports.assert)(high < 0x00200000, "number too small");
        return -(high * (MAX_UINT32 + 1) + low + 1);
    }
    else {
        //positive
        (0, exports.assert)(high < 0x00200000, "number too large");
        return high * (MAX_UINT32 + 1) + low;
    }
};
exports.toDouble = toDouble;
//# sourceMappingURL=common.js.map