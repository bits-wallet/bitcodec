"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
//# sourceMappingURL=CBuffer.js.map