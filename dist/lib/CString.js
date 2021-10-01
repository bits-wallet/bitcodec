"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CString = void 0;
const CBuffer_1 = require("./CBuffer");
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
//# sourceMappingURL=CString.js.map