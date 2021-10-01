"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
//# sourceMappingURL=CObject.js.map