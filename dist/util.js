"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.size = void 0;
// changed reduce: default value, auto sum
const size = (items, iter, acc = 0) => {
    if (acc === undefined)
        acc = 0;
    for (let i = 0; i < items.length; ++i)
        acc += iter(items[i], i, acc);
    return acc;
};
exports.size = size;
//# sourceMappingURL=util.js.map