"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.write = void 0;
const common_1 = require("./common");
const write = (int53Type, number, buffer, offset = 0) => {
    const signed = int53Type.startsWith("Int");
    const hl = signed ? (0, common_1.intHighLow)(number) : (0, common_1.uintHighLow)(number);
    const BE = int53Type.endsWith("BE");
    if (BE) {
        buffer.writeUInt32BE(hl[0], offset);
        buffer.writeUInt32BE(hl[1], offset + 4);
    }
    else {
        buffer.writeUInt32LE(hl[1], offset);
        buffer.writeUInt32LE(hl[0], offset + 4);
    }
};
exports.write = write;
//# sourceMappingURL=write.js.map