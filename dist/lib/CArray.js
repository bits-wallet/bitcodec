"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CArray = void 0;
const util = __importStar(require("../util"));
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
        this.decodeBytes =
            util.size(items, function (item, index, loffset) {
                items[index || 0] = typeDecode(buffer, loffset, end);
                return typeDecodeBytes;
            }, offset) - offset;
        return items;
    };
}
exports.CArray = CArray;
//# sourceMappingURL=CArray.js.map