/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@bitmatrix/int53/common.js":
/*!*************************************************!*\
  !*** ./node_modules/@bitmatrix/int53/common.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
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

/***/ }),

/***/ "./node_modules/@bitmatrix/int53/index.js":
/*!************************************************!*\
  !*** ./node_modules/@bitmatrix/int53/index.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.readInt53 = exports.writeInt53 = exports.Int53Type = void 0;
var common_1 = __webpack_require__(/*! ./common */ "./node_modules/@bitmatrix/int53/common.js");
Object.defineProperty(exports, "Int53Type", ({ enumerable: true, get: function () { return common_1.Int53Type; } }));
var write_1 = __webpack_require__(/*! ./write */ "./node_modules/@bitmatrix/int53/write.js");
Object.defineProperty(exports, "writeInt53", ({ enumerable: true, get: function () { return write_1.write; } }));
var read_1 = __webpack_require__(/*! ./read */ "./node_modules/@bitmatrix/int53/read.js");
Object.defineProperty(exports, "readInt53", ({ enumerable: true, get: function () { return read_1.read; } }));
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/@bitmatrix/int53/read.js":
/*!***********************************************!*\
  !*** ./node_modules/@bitmatrix/int53/read.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.read = void 0;
const common_1 = __webpack_require__(/*! ./common */ "./node_modules/@bitmatrix/int53/common.js");
const read = (int53Type, buffer, offset = 0) => {
    const BE = int53Type.endsWith("BE");
    const [high, low] = BE ? [buffer.readUInt32BE(offset), buffer.readUInt32BE(offset + 4)] : [buffer.readUInt32LE(offset + 4), buffer.readUInt32LE(offset)];
    const signed = int53Type.startsWith("Int");
    return (0, common_1.toDouble)(high, low, signed);
};
exports.read = read;
//# sourceMappingURL=read.js.map

/***/ }),

/***/ "./node_modules/@bitmatrix/int53/write.js":
/*!************************************************!*\
  !*** ./node_modules/@bitmatrix/int53/write.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.write = void 0;
const common_1 = __webpack_require__(/*! ./common */ "./node_modules/@bitmatrix/int53/common.js");
const write = (int53Type, number, buffer, offset = 0) => {
    const signed = int53Type.startsWith("Int");
    const hl = signed ? (0, common_1.intHighLow)(number) : (0, common_1.uintHighLow)(number);
    const BE = int53Type.endsWith("BE");
    if (BE) {
        buffer.writeUInt32BE(hl[0], offset);
        buffer.writeUInt32BE(hl[1], offset + 4);
    }
    else {
        buffer.writeUInt32LE(hl[1], offset);
        buffer.writeUInt32LE(hl[0], offset + 4);
    }
};
exports.write = write;
//# sourceMappingURL=write.js.map

/***/ }),

/***/ "./src/lib/CAllBuffer.ts":
/*!*******************************!*\
  !*** ./src/lib/CAllBuffer.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CAllBuffer = void 0;
class CAllBuffer {
    length;
    encodingLength = () => this.length;
    encodeBytes;
    decodeBytes;
    constructor() {
        this.length = 0;
        this.encodeBytes = 0;
        this.decodeBytes = 0;
    }
    encode = (value, buffer, offset = 0) => {
        if (!Buffer.isBuffer(value))
            throw new TypeError("value must be a Buffer instance"); // for CArray encode iter
        this.length = value.length - offset;
        if (!buffer)
            return Buffer.from(value);
        if (offset + this.length > buffer.length)
            throw new RangeError("destination buffer is too small");
        value.copy(buffer, offset);
        return buffer;
    };
    decode = (buffer, offset = 0, end) => {
        if (!end)
            end = buffer.length;
        this.length = buffer.length - offset;
        if (offset + this.length > end)
            throw new RangeError("not enough data for decode");
        return Buffer.from(buffer.slice(offset, offset + this.length));
    };
}
exports.CAllBuffer = CAllBuffer;


/***/ }),

/***/ "./src/lib/CArray.ts":
/*!***************************!*\
  !*** ./src/lib/CArray.ts ***!
  \***************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CArray = void 0;
const util = __importStar(__webpack_require__(/*! ../util */ "./src/util.ts"));
class CArray {
    length;
    anyCodec;
    calcLength = (items) => {
        return util.size(items, this.anyCodec.encodingLength);
    };
    encodingLength = (array) => {
        if (array === undefined)
            throw new TypeError("value must be an Array instance");
        if (array.length !== this.length)
            throw new RangeError("value.length is out of bounds");
        return this.calcLength(array);
    };
    encodeBytes;
    decodeBytes;
    constructor(length, anyCodec) {
        this.length = length;
        this.anyCodec = anyCodec;
        this.encodeBytes = length;
        this.decodeBytes = length;
    }
    encode = (value, buffer, offset = 0) => {
        if (value.length !== this.length)
            throw new RangeError("value.length is out of bounds");
        if (!buffer)
            buffer = Buffer.allocUnsafe(this.calcLength(value));
        const typeEncode = this.anyCodec.encode;
        const typeEncodeBytes = this.anyCodec.encodeBytes;
        /* this.encodeBytes =
          value.reduce((previusValue, currentItem, _) => {
            this.anyCodec.encode(currentItem, buffer, previusValue);
            const newAnyCodecEncodeBytes = this.anyCodec.encodeBytes;
            return previusValue + newAnyCodecEncodeBytes;
          }, offset) - offset; */
        this.encodeBytes =
            util.size(value, function (item, index, loffset) {
                typeEncode(item, buffer, loffset);
                return typeEncodeBytes;
            }, offset) - offset;
        return buffer;
    };
    decode = (buffer, offset = 0, end) => {
        if (!offset)
            offset = 0;
        const items = new Array(this.length);
        const typeDecode = this.anyCodec.decode;
        const typeDecodeBytes = this.anyCodec.decodeBytes;
        /* this.decodeBytes =
          items.reduce((previusValue, currentItem, currentIndex) => {
            items[currentIndex] = this.anyCodec.decode(buffer, previusValue, end);
            const newAnyCodecDecodeBytes = this.anyCodec.decodeBytes;
            return previusValue + newAnyCodecDecodeBytes;
          }, offset + offset) - offset; */
        this.decodeBytes =
            util.size(items, function (item, index, loffset) {
                items[index || 0] = typeDecode(buffer, loffset, end);
                return typeDecodeBytes;
            }, offset) - offset;
        return items;
    };
}
exports.CArray = CArray;


/***/ }),

/***/ "./src/lib/CBuffer.ts":
/*!****************************!*\
  !*** ./src/lib/CBuffer.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CBuffer = void 0;
class CBuffer {
    length;
    encodingLength = () => this.length;
    encodeBytes;
    decodeBytes;
    constructor(length) {
        this.length = length;
        this.encodeBytes = length;
        this.decodeBytes = length;
    }
    encode = (value, buffer, offset = 0) => {
        if (!Buffer.isBuffer(value))
            throw new TypeError("value must be a Buffer instance"); // for CArray encode iter
        if (value.length !== this.length)
            throw new RangeError("value.length is out of bounds");
        if (!buffer)
            return Buffer.from(value);
        if (offset + this.length > buffer.length)
            throw new RangeError("destination buffer is too small");
        value.copy(buffer, offset);
        return buffer;
    };
    decode = (buffer, offset = 0, end) => {
        if (!end)
            end = buffer.length;
        if (offset + this.length > end)
            throw new RangeError("not enough data for decode");
        return Buffer.from(buffer.slice(offset, offset + this.length));
    };
}
exports.CBuffer = CBuffer;


/***/ }),

/***/ "./src/lib/CNumber.ts":
/*!****************************!*\
  !*** ./src/lib/CNumber.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CNumber = void 0;
const int53_1 = __webpack_require__(/*! @bitmatrix/int53 */ "./node_modules/@bitmatrix/int53/index.js");
class CNumber {
    length;
    write;
    read;
    encodingLength = () => this.length;
    encodeBytes;
    decodeBytes;
    constructor(numberType, length) {
        this.length = length;
        this.encodeBytes = length;
        this.decodeBytes = length;
        if (Buffer.prototype["write" + numberType]) {
            this.write = (buffer, value, offset) => {
                return buffer["write" + numberType](value, offset);
            };
        }
        else {
            this.write = (buffer, value, offset) => {
                return (0, int53_1.writeInt53)(numberType, value, buffer, offset);
            };
        }
        if (Buffer.prototype["read" + numberType]) {
            this.read = (buffer, offset) => {
                return buffer["read" + numberType](offset);
            };
        }
        else {
            this.read = (buffer, offset) => {
                return (0, int53_1.readInt53)(numberType, buffer, offset);
            };
        }
    }
    encode = (value, buffer, offset = 0) => {
        buffer = buffer || Buffer.allocUnsafe(this.length);
        this.write(buffer, value, offset);
        return buffer;
    };
    decode = (buffer, offset = 0, end) => {
        if (!end)
            return this.read(buffer, offset);
        return this.read(buffer.slice(offset, end), 0);
    };
}
exports.CNumber = CNumber;


/***/ }),

/***/ "./src/lib/CObject.ts":
/*!****************************!*\
  !*** ./src/lib/CObject.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CObject = void 0;
class CObject {
    items;
    encodeBytes;
    decodeBytes;
    encodingLength;
    constructor(items) {
        this.items = items.map((item) => (Array.isArray(item) ? { name: item[0], type: item[1] } : item));
        this.encodeBytes = 0;
        this.decodeBytes = 0;
        this.encodingLength = (o) => {
            if (o === undefined)
                throw new TypeError("Expected Object, got " + o);
            return this.items.reduce((previousValue, currentValue) => {
                const value = o[currentValue.name];
                return previousValue + currentValue.type.encodingLength(value);
            }, 0);
        };
    }
    encode = (object, buffer, offset = 0) => {
        const bytes = this.encodingLength(object);
        if (buffer === undefined)
            buffer = Buffer.allocUnsafe(bytes);
        else if (buffer.length - offset < bytes)
            throw new RangeError("destination buffer is too small");
        this.items.forEach((item) => {
            const value = object[item.name];
            item.type.encode(value, buffer, offset);
            offset += item.type.encodeBytes;
        });
        this.encodeBytes = bytes;
        return buffer;
    };
    decode = (buffer, offset = 0, end) => {
        let result = {};
        const start = offset;
        this.items.forEach((item) => {
            const value = item.type.decode(buffer, offset, end);
            offset += item.type.decodeBytes;
            result[item.name] = value;
        });
        this.decodeBytes = offset - start;
        return result;
    };
}
exports.CObject = CObject;


/***/ }),

/***/ "./src/lib/CString.ts":
/*!****************************!*\
  !*** ./src/lib/CString.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CString = void 0;
const CBuffer_1 = __webpack_require__(/*! ./CBuffer */ "./src/lib/CBuffer.ts");
class CString {
    length;
    bufferCodec;
    encodingType;
    encodingLength;
    encodeBytes;
    decodeBytes;
    constructor(length, encodingType = "utf8") {
        this.length = length;
        this.encodingType = encodingType;
        this.bufferCodec = new CBuffer_1.CBuffer(this.length);
        this.encodeBytes = length;
        this.decodeBytes = length;
        this.encodingLength = (value) => this.length;
    }
    encode = (value, buffer, offset = 0) => {
        if (Buffer.byteLength(value, this.encodingType) !== this.length)
            throw new RangeError("value.length is out of bounds");
        if (!buffer)
            return Buffer.from(value, this.encodingType);
        if (offset + this.length > buffer.length)
            throw new RangeError("destination buffer is too small");
        buffer.write(value, offset, length, this.encodingType);
        return buffer;
    };
    decode = (buffer, offset = 0, end) => this.bufferCodec.decode(buffer, offset, end).toString(this.encodingType);
}
exports.CString = CString;


/***/ }),

/***/ "./src/lib/CVarArray.ts":
/*!******************************!*\
  !*** ./src/lib/CVarArray.ts ***!
  \******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CVarArray = void 0;
const util = __importStar(__webpack_require__(/*! ../util */ "./src/util.ts"));
class CVarArray {
    length = -1;
    lengthType;
    anyCodec;
    calcLength = (items) => {
        return util.size(items, this.anyCodec.encodingLength, this.lengthType.encodingLength(items.length));
    };
    encodingLength = (array) => {
        if (array === undefined)
            throw new TypeError("value must be an Array instance");
        return this.calcLength(array);
    };
    encodeBytes = -1;
    decodeBytes = -1;
    constructor(lengthType, anyCodec) {
        this.lengthType = lengthType;
        this.anyCodec = anyCodec;
    }
    encode = (value, buffer, offset = 0) => {
        if (!buffer)
            buffer = Buffer.allocUnsafe(this.calcLength(value));
        this.lengthType.encode(value.length, buffer, offset);
        /* this.encodeBytes =
          value.reduce((previusValue, currentItem, _) => {
            this.anyCodec.encode(currentItem, buffer, previusValue);
            const newAnyCodecEncodeBytes = this.anyCodec.encodeBytes;
            return previusValue + newAnyCodecEncodeBytes;
          }, this.lengthType.encodeBytes + offset) - offset; */
        this.encodeBytes =
            util.size(value, (item, index, loffset) => {
                this.anyCodec.encode(item, buffer, loffset);
                return this.anyCodec.encodeBytes;
            }, this.lengthType.encodeBytes + offset) - offset;
        return buffer;
    };
    decode = (buffer, offset = 0, end) => {
        if (!offset)
            offset = 0;
        const items = new Array(this.lengthType.decode(buffer, offset, end));
        /* this.decodeBytes =
          items.reduce((previusValue, currentItem, currentIndex) => {
            items[currentIndex] = this.anyCodec.decode(buffer, previusValue, end);
            const newAnyCodecDecodeBytes = this.anyCodec.decodeBytes;
            return previusValue + newAnyCodecDecodeBytes;
          }, this.lengthType.decodeBytes + offset) - offset; */
        this.decodeBytes =
            util.size(items, (item, index, loffset) => {
                items[index || 0] = this.anyCodec.decode(buffer, loffset, end);
                return this.anyCodec.decodeBytes;
            }, this.lengthType.decodeBytes + offset) - offset;
        return items;
    };
}
exports.CVarArray = CVarArray;


/***/ }),

/***/ "./src/lib/CVarBuffer.ts":
/*!*******************************!*\
  !*** ./src/lib/CVarBuffer.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CVarBuffer = void 0;
class CVarBuffer {
    anyCodec;
    encodingLength;
    encodeBytes;
    decodeBytes;
    constructor(anyCodec) {
        this.anyCodec = anyCodec;
        this.encodeBytes = 0;
        this.decodeBytes = 0;
        this.encodingLength = (buffer) => {
            if (buffer === undefined)
                throw new TypeError("value must be a Buffer instance"); // for CArray encode iter
            return this.anyCodec.encodingLength(buffer.length) + buffer.length;
        };
    }
    encode = (value, buffer, offset = 0) => {
        const bytes = this.encodingLength(value);
        if (!buffer)
            buffer = Buffer.allocUnsafe(bytes);
        else if (buffer.length - offset < bytes)
            throw new RangeError("destination buffer is too small");
        this.anyCodec.encode(value.length, buffer, offset);
        offset += this.anyCodec.encodeBytes;
        value.copy(buffer, offset);
        this.encodeBytes = bytes;
        return buffer;
    };
    decode = (buffer, offset = 0, end) => {
        if (end === undefined)
            end = buffer.length;
        const start = offset;
        const length = this.anyCodec.decode(buffer, offset, end);
        offset += this.anyCodec.decodeBytes;
        if (offset + length > end)
            throw new RangeError("not enough data for decode");
        this.decodeBytes = offset + length - start;
        return Buffer.from(buffer.slice(offset, offset + length));
    };
}
exports.CVarBuffer = CVarBuffer;


/***/ }),

/***/ "./src/lib/CVarString.ts":
/*!*******************************!*\
  !*** ./src/lib/CVarString.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CVarString = void 0;
const CVarBuffer_1 = __webpack_require__(/*! ./CVarBuffer */ "./src/lib/CVarBuffer.ts");
class CVarString {
    anyCodec;
    encodingType;
    varBufferCodec;
    encodingLength;
    encodeBytes;
    decodeBytes;
    constructor(anyCodec, encodingType = "utf8") {
        this.anyCodec = anyCodec;
        this.encodingType = encodingType;
        this.varBufferCodec = new CVarBuffer_1.CVarBuffer(anyCodec);
        this.encodeBytes = 0;
        this.decodeBytes = 0;
        this.encodingLength = (value) => {
            if (value === undefined)
                throw new TypeError("value must be a string");
            const valueLength = Buffer.byteLength(value, this.encodingType);
            return this.anyCodec.encodingLength(value.length) + valueLength;
        };
    }
    encode = (value, buffer, offset = 0) => {
        const valueLength = Buffer.byteLength(value, this.encodingType);
        const bytes = this.anyCodec.encodingLength(value.length) + valueLength;
        if (!buffer)
            buffer = Buffer.allocUnsafe(bytes);
        if (offset + bytes > buffer.length)
            throw new RangeError("destination buffer is too small");
        this.anyCodec.encode(valueLength, buffer, offset);
        offset += this.anyCodec.encodeBytes;
        buffer.write(value, offset, valueLength, this.encodingType);
        this.encodeBytes = bytes;
        return buffer;
    };
    decode = (buffer, offset = 0, end) => {
        const str = this.varBufferCodec.decode(buffer, offset, end).toString(this.encodingType);
        this.decodeBytes = this.varBufferCodec.decodeBytes;
        return str;
    };
}
exports.CVarString = CVarString;


/***/ }),

/***/ "./src/lib/CVarUIntBitcoin.ts":
/*!************************************!*\
  !*** ./src/lib/CVarUIntBitcoin.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CVarUIntBitcoin = void 0;
class CVarUIntBitcoin {
    MAX_SAFE_INTEGER = 9007199254740991;
    checkUInt53 = (n) => {
        if (n < 0 || n > this.MAX_SAFE_INTEGER || n % 1 !== 0)
            throw new RangeError("value out of range");
    };
    encodeBytes;
    decodeBytes;
    encodingLength;
    constructor() {
        this.encodeBytes = 0;
        this.decodeBytes = 0;
        this.encodingLength = (number) => {
            if (number === undefined)
                throw new TypeError("Expected number, got undefined");
            this.checkUInt53(number);
            return number < 0xfd ? 1 : number <= 0xffff ? 3 : number <= 0xffffffff ? 5 : 9;
        };
    }
    encode = (value, buffer, offset = 0) => {
        if (!buffer)
            buffer = Buffer.allocUnsafe(this.encodingLength(value));
        // 8 bit
        if (value < 0xfd) {
            buffer.writeUInt8(value, offset);
            this.encodeBytes = 1;
            // 16 bit
        }
        else if (value <= 0xffff) {
            buffer.writeUInt8(0xfd, offset);
            buffer.writeUInt16LE(value, offset + 1);
            this.encodeBytes = 3;
            // 32 bit
        }
        else if (value <= 0xffffffff) {
            buffer.writeUInt8(0xfe, offset);
            buffer.writeUInt32LE(value, offset + 1);
            this.encodeBytes = 5;
            // 64 bit
        }
        else {
            buffer.writeUInt8(0xff, offset);
            buffer.writeUInt32LE(value >>> 0, offset + 1);
            buffer.writeUInt32LE((value / 0x100000000) | 0, offset + 5);
            this.encodeBytes = 9;
        }
        return buffer;
    };
    decode = (buffer, offset = 0, end) => {
        const first = buffer.readUInt8(offset);
        // 8 bit
        if (first < 0xfd) {
            this.decodeBytes = 1;
            return first;
            // 16 bit
        }
        else if (first === 0xfd) {
            this.decodeBytes = 3;
            return buffer.readUInt16LE(offset + 1);
            // 32 bit
        }
        else if (first === 0xfe) {
            this.decodeBytes = 5;
            return buffer.readUInt32LE(offset + 1);
            // 64 bit
        }
        else {
            this.decodeBytes = 9;
            var lo = buffer.readUInt32LE(offset + 1);
            var hi = buffer.readUInt32LE(offset + 5);
            var number = hi * 0x0100000000 + lo;
            this.checkUInt53(number);
            return number;
        }
    };
}
exports.CVarUIntBitcoin = CVarUIntBitcoin;


/***/ }),

/***/ "./src/models/NumberTypes.ts":
/*!***********************************!*\
  !*** ./src/models/NumberTypes.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NumberTypes = void 0;
var NumberTypes;
(function (NumberTypes) {
    NumberTypes["Byte"] = "UInt8";
    NumberTypes["Int8"] = "Int8";
    NumberTypes["UInt8"] = "UInt8";
    NumberTypes["Int16BE"] = "Int16BE";
    NumberTypes["Int16LE"] = "Int16LE";
    NumberTypes["UInt16BE"] = "UInt16BE";
    NumberTypes["UInt16LE"] = "UInt16LE";
    NumberTypes["Int32BE"] = "Int32BE";
    NumberTypes["Int32LE"] = "Int32LE";
    NumberTypes["UInt32BE"] = "UInt32BE";
    NumberTypes["UInt32LE"] = "UInt32LE";
    NumberTypes["Int64BE"] = "Int64BE";
    NumberTypes["Int64LE"] = "Int64LE";
    NumberTypes["UInt64BE"] = "UInt64BE";
    NumberTypes["UInt64LE"] = "UInt64LE";
    NumberTypes["FloatBE"] = "FloatBE";
    NumberTypes["FloatLE"] = "FloatLE";
    NumberTypes["DoubleBE"] = "DoubleBE";
    NumberTypes["DoubleLE"] = "DoubleLE";
})(NumberTypes = exports.NumberTypes || (exports.NumberTypes = {}));


/***/ }),

/***/ "./src/util.ts":
/*!*********************!*\
  !*** ./src/util.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.size = void 0;
const size = (items, iter, acc = 0) => {
    let result = acc;
    for (let i = 0; i < items.length; i++)
        result += iter(items[i], i, result);
    return result;
    /* return items.reduce((previusValue, currentItem, currentIndex) => {
      return previusValue + iter(items[currentIndex], currentIndex, previusValue);
    }, acc); */
};
exports.size = size;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const NumberTypes_1 = __webpack_require__(/*! ./models/NumberTypes */ "./src/models/NumberTypes.ts");
const CAllBuffer_1 = __webpack_require__(/*! ./lib/CAllBuffer */ "./src/lib/CAllBuffer.ts");
const CArray_1 = __webpack_require__(/*! ./lib/CArray */ "./src/lib/CArray.ts");
const CBuffer_1 = __webpack_require__(/*! ./lib/CBuffer */ "./src/lib/CBuffer.ts");
const CNumber_1 = __webpack_require__(/*! ./lib/CNumber */ "./src/lib/CNumber.ts");
const CObject_1 = __webpack_require__(/*! ./lib/CObject */ "./src/lib/CObject.ts");
const CString_1 = __webpack_require__(/*! ./lib/CString */ "./src/lib/CString.ts");
const CVarArray_1 = __webpack_require__(/*! ./lib/CVarArray */ "./src/lib/CVarArray.ts");
const CVarBuffer_1 = __webpack_require__(/*! ./lib/CVarBuffer */ "./src/lib/CVarBuffer.ts");
const CVarString_1 = __webpack_require__(/*! ./lib/CVarString */ "./src/lib/CVarString.ts");
const CVarUIntBitcoin_1 = __webpack_require__(/*! ./lib/CVarUIntBitcoin */ "./src/lib/CVarUIntBitcoin.ts");
exports["default"] = {
    AllBuffer: new CAllBuffer_1.CAllBuffer(),
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

})();

module.exports.bitcodec = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=index.js.map