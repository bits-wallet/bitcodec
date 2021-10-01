"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
//# sourceMappingURL=CVarBuffer.js.map