"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CNumber = void 0;
const int53_1 = require("../ext/int53");
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
//# sourceMappingURL=CNumber.js.map