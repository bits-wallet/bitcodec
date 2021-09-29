"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
const testUInt64 = (writeNumber) => {
    const buffer = Buffer.alloc(8);
    (0, index_1.writeInt53)(index_1.Int53Type.UInt64BE, writeNumber, buffer);
    expect((0, index_1.readInt53)(index_1.Int53Type.UInt64BE, buffer)).toEqual(writeNumber);
    (0, index_1.writeInt53)(index_1.Int53Type.UInt64LE, writeNumber, buffer);
    expect((0, index_1.readInt53)(index_1.Int53Type.UInt64LE, buffer)).toEqual(writeNumber);
};
const testInt64 = (writeNumber) => {
    const buffer = Buffer.alloc(8);
    (0, index_1.writeInt53)(index_1.Int53Type.Int64BE, writeNumber, buffer);
    expect((0, index_1.readInt53)(index_1.Int53Type.Int64BE, buffer)).toEqual(writeNumber);
    (0, index_1.writeInt53)(index_1.Int53Type.Int64LE, writeNumber, buffer);
    expect((0, index_1.readInt53)(index_1.Int53Type.Int64LE, buffer)).toEqual(writeNumber);
};
test("int53 testUInt64", () => {
    testUInt64(0);
    testUInt64(1);
    testUInt64(0xffffffff - 2);
    testUInt64(0xffffffff - 1);
    testUInt64(0xffffffff);
    testUInt64(0xffffffff + 1);
    testUInt64(0xffffffff + 2);
    testUInt64(0xfffffffffffff);
    testUInt64(0x1fffffffffffff);
    // errors
    expect(() => testUInt64(0x1fffffffffffff + 1)).toThrow("number out of range");
    expect(() => testUInt64(-1)).toThrow("number out of range");
    expect(() => testUInt64(1.1)).toThrow("number must be an integer");
});
test("int53 testInt64", () => {
    testInt64(-2147483648);
    testInt64(-1);
    testInt64(1);
    testInt64(-64424509440);
    testInt64(-4294967297);
    testInt64(-4294967296);
    testInt64(-4294967295);
    testInt64(-9007199254740991);
    // errors
    expect(() => testInt64(-9007199254740992)).toThrow("number out of range");
    expect(() => testInt64(-1.1)).toThrow("number must be an integer");
});
//# sourceMappingURL=index.test.js.map