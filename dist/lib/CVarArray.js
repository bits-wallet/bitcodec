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
exports.CVarArray = void 0;
const util = __importStar(require("../util"));
class CVarArray {
    length = -1;
    lengthType;
    cBuffer;
    calcLength = (items) => {
        return util.size(items, this.cBuffer.encodingLength, this.lengthType.encodingLength(items.length));
    };
    encodingLength = (array) => {
        if (array === undefined)
            throw new TypeError("value must be an Array instance");
        return this.calcLength(array);
    };
    encodeBytes = -1;
    decodeBytes = -1;
    constructor(lengthType, cBuffer) {
        this.lengthType = lengthType;
        this.cBuffer = cBuffer;
    }
    encode = (value, buffer, offset = 0) => {
        if (!buffer)
            buffer = Buffer.allocUnsafe(this.calcLength(value));
        this.lengthType.encode(value.length, buffer, offset);
        const typeEncode = this.cBuffer.encode;
        const typeEncodeBytes = this.cBuffer.encodeBytes;
        const lengthTypeEncodeBytes = this.lengthType.encodeBytes;
        this.encodeBytes =
            util.size(value, (item, index, loffset) => {
                typeEncode(item, buffer, loffset);
                return typeEncodeBytes;
            }, lengthTypeEncodeBytes + offset) - offset;
        return buffer;
    };
    decode = (buffer, offset = 0, end) => {
        if (!offset)
            offset = 0;
        const items = new Array(this.lengthType.decode(buffer, offset, end));
        const typeDecode = this.cBuffer.decode;
        const typeDecodeBytes = this.cBuffer.decodeBytes;
        const lengthTypeDecodeBytes = this.lengthType.decodeBytes;
        this.decodeBytes =
            util.size(items, (item, index, loffset) => {
                items[index || 0] = typeDecode(buffer, loffset, end);
                return typeDecodeBytes;
            }, lengthTypeDecodeBytes + offset) - offset;
        return items;
    };
}
exports.CVarArray = CVarArray;
//# sourceMappingURL=CVarArray.js.map