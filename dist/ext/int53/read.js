"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.read = void 0;
const common_1 = require("./common");
const read = (int53Type, buffer, offset = 0) => {
    const BE = int53Type.endsWith("BE");
    const [high, low] = BE ? [buffer.readUInt32BE(offset), buffer.readUInt32BE(offset + 4)] : [buffer.readUInt32LE(offset + 4), buffer.readUInt32LE(offset)];
    const signed = int53Type.startsWith("Int");
    return (0, common_1.toDouble)(high, low, signed);
};
exports.read = read;
//# sourceMappingURL=read.js.map