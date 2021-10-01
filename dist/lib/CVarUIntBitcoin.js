"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
//# sourceMappingURL=CVarUIntBitcoin.js.map