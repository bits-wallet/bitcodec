"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CVarString = void 0;
const CVarBuffer_1 = require("./CVarBuffer");
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
//# sourceMappingURL=CVarString.js.map