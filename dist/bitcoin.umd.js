var bitcoin;
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@bitmatrix/int53/common.js":
/*!*************************************************!*\
  !*** ./node_modules/@bitmatrix/int53/common.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.toDouble = exports.intHighLow = exports.uintHighLow = exports.onesComplement = exports.assert = exports.Int53Type = void 0;
const MAX_UINT32 = 0x00000000ffffffff;
const MAX_INT53 = 0x001fffffffffffff;
var Int53Type;
(function (Int53Type) {
    Int53Type["Int64BE"] = "Int64BE";
    Int53Type["Int64LE"] = "Int64LE";
    Int53Type["UInt64BE"] = "UInt64BE";
    Int53Type["UInt64LE"] = "UInt64LE";
})(Int53Type = exports.Int53Type || (exports.Int53Type = {}));
const assert = (test, message) => {
    if (!test)
        throw new Error(message);
};
exports.assert = assert;
const onesComplement = (number) => {
    number = ~number;
    if (number < 0) {
        number = (number & 0x7fffffff) + 0x80000000;
    }
    return number;
};
exports.onesComplement = onesComplement;
const uintHighLow = (number) => {
    (0, exports.assert)(number > -1 && number <= MAX_INT53, "number out of range");
    (0, exports.assert)(Math.floor(number) === number, "number must be an integer");
    var high = 0;
    var signbit = number & 0xffffffff;
    var low = signbit < 0 ? (number & 0x7fffffff) + 0x80000000 : signbit;
    if (number > MAX_UINT32) {
        high = (number - low) / (MAX_UINT32 + 1);
    }
    return [high, low];
};
exports.uintHighLow = uintHighLow;
const intHighLow = (number) => {
    if (number > -1) {
        return (0, exports.uintHighLow)(number);
    }
    var hl = (0, exports.uintHighLow)(-number);
    var high = (0, exports.onesComplement)(hl[0]);
    var low = (0, exports.onesComplement)(hl[1]);
    if (low === MAX_UINT32) {
        high += 1;
        low = 0;
    }
    else {
        low += 1;
    }
    return [high, low];
};
exports.intHighLow = intHighLow;
const toDouble = (high, low, signed) => {
    if (signed && (high & 0x80000000) !== 0) {
        high = (0, exports.onesComplement)(high);
        low = (0, exports.onesComplement)(low);
        (0, exports.assert)(high < 0x00200000, "number too small");
        return -(high * (MAX_UINT32 + 1) + low + 1);
    }
    else {
        //positive
        (0, exports.assert)(high < 0x00200000, "number too large");
        return high * (MAX_UINT32 + 1) + low;
    }
};
exports.toDouble = toDouble;
//# sourceMappingURL=common.js.map

/***/ }),

/***/ "./node_modules/@bitmatrix/int53/index.js":
/*!************************************************!*\
  !*** ./node_modules/@bitmatrix/int53/index.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.readInt53 = exports.writeInt53 = exports.Int53Type = void 0;
var common_1 = __webpack_require__(/*! ./common */ "./node_modules/@bitmatrix/int53/common.js");
Object.defineProperty(exports, "Int53Type", ({ enumerable: true, get: function () { return common_1.Int53Type; } }));
var write_1 = __webpack_require__(/*! ./write */ "./node_modules/@bitmatrix/int53/write.js");
Object.defineProperty(exports, "writeInt53", ({ enumerable: true, get: function () { return write_1.write; } }));
var read_1 = __webpack_require__(/*! ./read */ "./node_modules/@bitmatrix/int53/read.js");
Object.defineProperty(exports, "readInt53", ({ enumerable: true, get: function () { return read_1.read; } }));
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/@bitmatrix/int53/read.js":
/*!***********************************************!*\
  !*** ./node_modules/@bitmatrix/int53/read.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.read = void 0;
const common_1 = __webpack_require__(/*! ./common */ "./node_modules/@bitmatrix/int53/common.js");
const read = (int53Type, buffer, offset = 0) => {
    const BE = int53Type.endsWith("BE");
    const [high, low] = BE ? [buffer.readUInt32BE(offset), buffer.readUInt32BE(offset + 4)] : [buffer.readUInt32LE(offset + 4), buffer.readUInt32LE(offset)];
    const signed = int53Type.startsWith("Int");
    return (0, common_1.toDouble)(high, low, signed);
};
exports.read = read;
//# sourceMappingURL=read.js.map

/***/ }),

/***/ "./node_modules/@bitmatrix/int53/write.js":
/*!************************************************!*\
  !*** ./node_modules/@bitmatrix/int53/write.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.write = void 0;
const common_1 = __webpack_require__(/*! ./common */ "./node_modules/@bitmatrix/int53/common.js");
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

/***/ }),

/***/ "./node_modules/base64-js/index.js":
/*!*****************************************!*\
  !*** ./node_modules/base64-js/index.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

// Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications
revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function getLens (b64) {
  var len = b64.length

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // Trim off extra bytes after placeholder bytes are found
  // See: https://github.com/beatgammit/base64-js/issues/42
  var validLen = b64.indexOf('=')
  if (validLen === -1) validLen = len

  var placeHoldersLen = validLen === len
    ? 0
    : 4 - (validLen % 4)

  return [validLen, placeHoldersLen]
}

// base64 is 4/3 + up to two characters of the original data
function byteLength (b64) {
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function _byteLength (b64, validLen, placeHoldersLen) {
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function toByteArray (b64) {
  var tmp
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]

  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen))

  var curByte = 0

  // if there are placeholders, only get up to the last complete 4 chars
  var len = placeHoldersLen > 0
    ? validLen - 4
    : validLen

  var i
  for (i = 0; i < len; i += 4) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 18) |
      (revLookup[b64.charCodeAt(i + 1)] << 12) |
      (revLookup[b64.charCodeAt(i + 2)] << 6) |
      revLookup[b64.charCodeAt(i + 3)]
    arr[curByte++] = (tmp >> 16) & 0xFF
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 2) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 2) |
      (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 1) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 10) |
      (revLookup[b64.charCodeAt(i + 1)] << 4) |
      (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] +
    lookup[num >> 12 & 0x3F] +
    lookup[num >> 6 & 0x3F] +
    lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp =
      ((uint8[i] << 16) & 0xFF0000) +
      ((uint8[i + 1] << 8) & 0xFF00) +
      (uint8[i + 2] & 0xFF)
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    parts.push(
      lookup[tmp >> 2] +
      lookup[(tmp << 4) & 0x3F] +
      '=='
    )
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1]
    parts.push(
      lookup[tmp >> 10] +
      lookup[(tmp >> 4) & 0x3F] +
      lookup[(tmp << 2) & 0x3F] +
      '='
    )
  }

  return parts.join('')
}


/***/ }),

/***/ "./node_modules/buffer/index.js":
/*!**************************************!*\
  !*** ./node_modules/buffer/index.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */



const base64 = __webpack_require__(/*! base64-js */ "./node_modules/base64-js/index.js")
const ieee754 = __webpack_require__(/*! ieee754 */ "./node_modules/ieee754/index.js")
const customInspectSymbol =
  (typeof Symbol === 'function' && typeof Symbol['for'] === 'function') // eslint-disable-line dot-notation
    ? Symbol['for']('nodejs.util.inspect.custom') // eslint-disable-line dot-notation
    : null

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

const K_MAX_LENGTH = 0x7fffffff
exports.kMaxLength = K_MAX_LENGTH

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Print warning and recommend using `buffer` v4.x which has an Object
 *               implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * We report that the browser does not support typed arrays if the are not subclassable
 * using __proto__. Firefox 4-29 lacks support for adding new properties to `Uint8Array`
 * (See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438). IE 10 lacks support
 * for __proto__ and has a buggy typed array implementation.
 */
Buffer.TYPED_ARRAY_SUPPORT = typedArraySupport()

if (!Buffer.TYPED_ARRAY_SUPPORT && typeof console !== 'undefined' &&
    typeof console.error === 'function') {
  console.error(
    'This browser lacks typed array (Uint8Array) support which is required by ' +
    '`buffer` v5.x. Use `buffer` v4.x if you require old browser support.'
  )
}

function typedArraySupport () {
  // Can typed array instances can be augmented?
  try {
    const arr = new Uint8Array(1)
    const proto = { foo: function () { return 42 } }
    Object.setPrototypeOf(proto, Uint8Array.prototype)
    Object.setPrototypeOf(arr, proto)
    return arr.foo() === 42
  } catch (e) {
    return false
  }
}

Object.defineProperty(Buffer.prototype, 'parent', {
  enumerable: true,
  get: function () {
    if (!Buffer.isBuffer(this)) return undefined
    return this.buffer
  }
})

Object.defineProperty(Buffer.prototype, 'offset', {
  enumerable: true,
  get: function () {
    if (!Buffer.isBuffer(this)) return undefined
    return this.byteOffset
  }
})

function createBuffer (length) {
  if (length > K_MAX_LENGTH) {
    throw new RangeError('The value "' + length + '" is invalid for option "size"')
  }
  // Return an augmented `Uint8Array` instance
  const buf = new Uint8Array(length)
  Object.setPrototypeOf(buf, Buffer.prototype)
  return buf
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new TypeError(
        'The "string" argument must be of type string. Received type number'
      )
    }
    return allocUnsafe(arg)
  }
  return from(arg, encodingOrOffset, length)
}

Buffer.poolSize = 8192 // not used by this implementation

function from (value, encodingOrOffset, length) {
  if (typeof value === 'string') {
    return fromString(value, encodingOrOffset)
  }

  if (ArrayBuffer.isView(value)) {
    return fromArrayView(value)
  }

  if (value == null) {
    throw new TypeError(
      'The first argument must be one of type string, Buffer, ArrayBuffer, Array, ' +
      'or Array-like Object. Received type ' + (typeof value)
    )
  }

  if (isInstance(value, ArrayBuffer) ||
      (value && isInstance(value.buffer, ArrayBuffer))) {
    return fromArrayBuffer(value, encodingOrOffset, length)
  }

  if (typeof SharedArrayBuffer !== 'undefined' &&
      (isInstance(value, SharedArrayBuffer) ||
      (value && isInstance(value.buffer, SharedArrayBuffer)))) {
    return fromArrayBuffer(value, encodingOrOffset, length)
  }

  if (typeof value === 'number') {
    throw new TypeError(
      'The "value" argument must not be of type number. Received type number'
    )
  }

  const valueOf = value.valueOf && value.valueOf()
  if (valueOf != null && valueOf !== value) {
    return Buffer.from(valueOf, encodingOrOffset, length)
  }

  const b = fromObject(value)
  if (b) return b

  if (typeof Symbol !== 'undefined' && Symbol.toPrimitive != null &&
      typeof value[Symbol.toPrimitive] === 'function') {
    return Buffer.from(value[Symbol.toPrimitive]('string'), encodingOrOffset, length)
  }

  throw new TypeError(
    'The first argument must be one of type string, Buffer, ArrayBuffer, Array, ' +
    'or Array-like Object. Received type ' + (typeof value)
  )
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(value, encodingOrOffset, length)
}

// Note: Change prototype *after* Buffer.from is defined to workaround Chrome bug:
// https://github.com/feross/buffer/pull/148
Object.setPrototypeOf(Buffer.prototype, Uint8Array.prototype)
Object.setPrototypeOf(Buffer, Uint8Array)

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be of type number')
  } else if (size < 0) {
    throw new RangeError('The value "' + size + '" is invalid for option "size"')
  }
}

function alloc (size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpreted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(size).fill(fill, encoding)
      : createBuffer(size).fill(fill)
  }
  return createBuffer(size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(size, fill, encoding)
}

function allocUnsafe (size) {
  assertSize(size)
  return createBuffer(size < 0 ? 0 : checked(size) | 0)
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(size)
}

function fromString (string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('Unknown encoding: ' + encoding)
  }

  const length = byteLength(string, encoding) | 0
  let buf = createBuffer(length)

  const actual = buf.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    buf = buf.slice(0, actual)
  }

  return buf
}

function fromArrayLike (array) {
  const length = array.length < 0 ? 0 : checked(array.length) | 0
  const buf = createBuffer(length)
  for (let i = 0; i < length; i += 1) {
    buf[i] = array[i] & 255
  }
  return buf
}

function fromArrayView (arrayView) {
  if (isInstance(arrayView, Uint8Array)) {
    const copy = new Uint8Array(arrayView)
    return fromArrayBuffer(copy.buffer, copy.byteOffset, copy.byteLength)
  }
  return fromArrayLike(arrayView)
}

function fromArrayBuffer (array, byteOffset, length) {
  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('"offset" is outside of buffer bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('"length" is outside of buffer bounds')
  }

  let buf
  if (byteOffset === undefined && length === undefined) {
    buf = new Uint8Array(array)
  } else if (length === undefined) {
    buf = new Uint8Array(array, byteOffset)
  } else {
    buf = new Uint8Array(array, byteOffset, length)
  }

  // Return an augmented `Uint8Array` instance
  Object.setPrototypeOf(buf, Buffer.prototype)

  return buf
}

function fromObject (obj) {
  if (Buffer.isBuffer(obj)) {
    const len = checked(obj.length) | 0
    const buf = createBuffer(len)

    if (buf.length === 0) {
      return buf
    }

    obj.copy(buf, 0, 0, len)
    return buf
  }

  if (obj.length !== undefined) {
    if (typeof obj.length !== 'number' || numberIsNaN(obj.length)) {
      return createBuffer(0)
    }
    return fromArrayLike(obj)
  }

  if (obj.type === 'Buffer' && Array.isArray(obj.data)) {
    return fromArrayLike(obj.data)
  }
}

function checked (length) {
  // Note: cannot use `length < K_MAX_LENGTH` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= K_MAX_LENGTH) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + K_MAX_LENGTH.toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return b != null && b._isBuffer === true &&
    b !== Buffer.prototype // so Buffer.isBuffer(Buffer.prototype) will be false
}

Buffer.compare = function compare (a, b) {
  if (isInstance(a, Uint8Array)) a = Buffer.from(a, a.offset, a.byteLength)
  if (isInstance(b, Uint8Array)) b = Buffer.from(b, b.offset, b.byteLength)
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError(
      'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
    )
  }

  if (a === b) return 0

  let x = a.length
  let y = b.length

  for (let i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!Array.isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  let i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  const buffer = Buffer.allocUnsafe(length)
  let pos = 0
  for (i = 0; i < list.length; ++i) {
    let buf = list[i]
    if (isInstance(buf, Uint8Array)) {
      if (pos + buf.length > buffer.length) {
        if (!Buffer.isBuffer(buf)) buf = Buffer.from(buf)
        buf.copy(buffer, pos)
      } else {
        Uint8Array.prototype.set.call(
          buffer,
          buf,
          pos
        )
      }
    } else if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    } else {
      buf.copy(buffer, pos)
    }
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (ArrayBuffer.isView(string) || isInstance(string, ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    throw new TypeError(
      'The "string" argument must be one of type string, Buffer, or ArrayBuffer. ' +
      'Received type ' + typeof string
    )
  }

  const len = string.length
  const mustMatch = (arguments.length > 2 && arguments[2] === true)
  if (!mustMatch && len === 0) return 0

  // Use a for loop to avoid recursion
  let loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) {
          return mustMatch ? -1 : utf8ToBytes(string).length // assume utf8
        }
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  let loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coercion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// This property is used by `Buffer.isBuffer` (and the `is-buffer` npm package)
// to detect a Buffer instance. It's not possible to use `instanceof Buffer`
// reliably in a browserify context because there could be multiple different
// copies of the 'buffer' package in use. This method works even for Buffer
// instances that were created from another copy of the `buffer` package.
// See: https://github.com/feross/buffer/issues/154
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  const i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  const len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (let i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  const len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (let i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  const len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (let i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  const length = this.length
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.toLocaleString = Buffer.prototype.toString

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  let str = ''
  const max = exports.INSPECT_MAX_BYTES
  str = this.toString('hex', 0, max).replace(/(.{2})/g, '$1 ').trim()
  if (this.length > max) str += ' ... '
  return '<Buffer ' + str + '>'
}
if (customInspectSymbol) {
  Buffer.prototype[customInspectSymbol] = Buffer.prototype.inspect
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (isInstance(target, Uint8Array)) {
    target = Buffer.from(target, target.offset, target.byteLength)
  }
  if (!Buffer.isBuffer(target)) {
    throw new TypeError(
      'The "target" argument must be one of type Buffer or Uint8Array. ' +
      'Received type ' + (typeof target)
    )
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  let x = thisEnd - thisStart
  let y = end - start
  const len = Math.min(x, y)

  const thisCopy = this.slice(thisStart, thisEnd)
  const targetCopy = target.slice(start, end)

  for (let i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset // Coerce to Number.
  if (numberIsNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [val], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  let indexSize = 1
  let arrLength = arr.length
  let valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  let i
  if (dir) {
    let foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      let found = true
      for (let j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  const remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  const strLen = string.length

  if (length > strLen / 2) {
    length = strLen / 2
  }
  let i
  for (i = 0; i < length; ++i) {
    const parsed = parseInt(string.substr(i * 2, 2), 16)
    if (numberIsNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset >>> 0
    if (isFinite(length)) {
      length = length >>> 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  const remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  let loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
      case 'latin1':
      case 'binary':
        return asciiWrite(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  const res = []

  let i = start
  while (i < end) {
    const firstByte = buf[i]
    let codePoint = null
    let bytesPerSequence = (firstByte > 0xEF)
      ? 4
      : (firstByte > 0xDF)
          ? 3
          : (firstByte > 0xBF)
              ? 2
              : 1

    if (i + bytesPerSequence <= end) {
      let secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
const MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  const len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  let res = ''
  let i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  let ret = ''
  end = Math.min(buf.length, end)

  for (let i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  let ret = ''
  end = Math.min(buf.length, end)

  for (let i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  const len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  let out = ''
  for (let i = start; i < end; ++i) {
    out += hexSliceLookupTable[buf[i]]
  }
  return out
}

function utf16leSlice (buf, start, end) {
  const bytes = buf.slice(start, end)
  let res = ''
  // If bytes.length is odd, the last 8 bits must be ignored (same as node.js)
  for (let i = 0; i < bytes.length - 1; i += 2) {
    res += String.fromCharCode(bytes[i] + (bytes[i + 1] * 256))
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  const len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  const newBuf = this.subarray(start, end)
  // Return an augmented `Uint8Array` instance
  Object.setPrototypeOf(newBuf, Buffer.prototype)

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUintLE =
Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  let val = this[offset]
  let mul = 1
  let i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUintBE =
Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  let val = this[offset + --byteLength]
  let mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUint8 =
Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUint16LE =
Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUint16BE =
Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUint32LE =
Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUint32BE =
Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readBigUInt64LE = defineBigIntMethod(function readBigUInt64LE (offset) {
  offset = offset >>> 0
  validateNumber(offset, 'offset')
  const first = this[offset]
  const last = this[offset + 7]
  if (first === undefined || last === undefined) {
    boundsError(offset, this.length - 8)
  }

  const lo = first +
    this[++offset] * 2 ** 8 +
    this[++offset] * 2 ** 16 +
    this[++offset] * 2 ** 24

  const hi = this[++offset] +
    this[++offset] * 2 ** 8 +
    this[++offset] * 2 ** 16 +
    last * 2 ** 24

  return BigInt(lo) + (BigInt(hi) << BigInt(32))
})

Buffer.prototype.readBigUInt64BE = defineBigIntMethod(function readBigUInt64BE (offset) {
  offset = offset >>> 0
  validateNumber(offset, 'offset')
  const first = this[offset]
  const last = this[offset + 7]
  if (first === undefined || last === undefined) {
    boundsError(offset, this.length - 8)
  }

  const hi = first * 2 ** 24 +
    this[++offset] * 2 ** 16 +
    this[++offset] * 2 ** 8 +
    this[++offset]

  const lo = this[++offset] * 2 ** 24 +
    this[++offset] * 2 ** 16 +
    this[++offset] * 2 ** 8 +
    last

  return (BigInt(hi) << BigInt(32)) + BigInt(lo)
})

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  let val = this[offset]
  let mul = 1
  let i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  let i = byteLength
  let mul = 1
  let val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  const val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  const val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readBigInt64LE = defineBigIntMethod(function readBigInt64LE (offset) {
  offset = offset >>> 0
  validateNumber(offset, 'offset')
  const first = this[offset]
  const last = this[offset + 7]
  if (first === undefined || last === undefined) {
    boundsError(offset, this.length - 8)
  }

  const val = this[offset + 4] +
    this[offset + 5] * 2 ** 8 +
    this[offset + 6] * 2 ** 16 +
    (last << 24) // Overflow

  return (BigInt(val) << BigInt(32)) +
    BigInt(first +
    this[++offset] * 2 ** 8 +
    this[++offset] * 2 ** 16 +
    this[++offset] * 2 ** 24)
})

Buffer.prototype.readBigInt64BE = defineBigIntMethod(function readBigInt64BE (offset) {
  offset = offset >>> 0
  validateNumber(offset, 'offset')
  const first = this[offset]
  const last = this[offset + 7]
  if (first === undefined || last === undefined) {
    boundsError(offset, this.length - 8)
  }

  const val = (first << 24) + // Overflow
    this[++offset] * 2 ** 16 +
    this[++offset] * 2 ** 8 +
    this[++offset]

  return (BigInt(val) << BigInt(32)) +
    BigInt(this[++offset] * 2 ** 24 +
    this[++offset] * 2 ** 16 +
    this[++offset] * 2 ** 8 +
    last)
})

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUintLE =
Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    const maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  let mul = 1
  let i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUintBE =
Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    const maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  let i = byteLength - 1
  let mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUint8 =
Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeUint16LE =
Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  return offset + 2
}

Buffer.prototype.writeUint16BE =
Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  this[offset] = (value >>> 8)
  this[offset + 1] = (value & 0xff)
  return offset + 2
}

Buffer.prototype.writeUint32LE =
Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  this[offset + 3] = (value >>> 24)
  this[offset + 2] = (value >>> 16)
  this[offset + 1] = (value >>> 8)
  this[offset] = (value & 0xff)
  return offset + 4
}

Buffer.prototype.writeUint32BE =
Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  this[offset] = (value >>> 24)
  this[offset + 1] = (value >>> 16)
  this[offset + 2] = (value >>> 8)
  this[offset + 3] = (value & 0xff)
  return offset + 4
}

function wrtBigUInt64LE (buf, value, offset, min, max) {
  checkIntBI(value, min, max, buf, offset, 7)

  let lo = Number(value & BigInt(0xffffffff))
  buf[offset++] = lo
  lo = lo >> 8
  buf[offset++] = lo
  lo = lo >> 8
  buf[offset++] = lo
  lo = lo >> 8
  buf[offset++] = lo
  let hi = Number(value >> BigInt(32) & BigInt(0xffffffff))
  buf[offset++] = hi
  hi = hi >> 8
  buf[offset++] = hi
  hi = hi >> 8
  buf[offset++] = hi
  hi = hi >> 8
  buf[offset++] = hi
  return offset
}

function wrtBigUInt64BE (buf, value, offset, min, max) {
  checkIntBI(value, min, max, buf, offset, 7)

  let lo = Number(value & BigInt(0xffffffff))
  buf[offset + 7] = lo
  lo = lo >> 8
  buf[offset + 6] = lo
  lo = lo >> 8
  buf[offset + 5] = lo
  lo = lo >> 8
  buf[offset + 4] = lo
  let hi = Number(value >> BigInt(32) & BigInt(0xffffffff))
  buf[offset + 3] = hi
  hi = hi >> 8
  buf[offset + 2] = hi
  hi = hi >> 8
  buf[offset + 1] = hi
  hi = hi >> 8
  buf[offset] = hi
  return offset + 8
}

Buffer.prototype.writeBigUInt64LE = defineBigIntMethod(function writeBigUInt64LE (value, offset = 0) {
  return wrtBigUInt64LE(this, value, offset, BigInt(0), BigInt('0xffffffffffffffff'))
})

Buffer.prototype.writeBigUInt64BE = defineBigIntMethod(function writeBigUInt64BE (value, offset = 0) {
  return wrtBigUInt64BE(this, value, offset, BigInt(0), BigInt('0xffffffffffffffff'))
})

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    const limit = Math.pow(2, (8 * byteLength) - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  let i = 0
  let mul = 1
  let sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    const limit = Math.pow(2, (8 * byteLength) - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  let i = byteLength - 1
  let mul = 1
  let sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  this[offset] = (value >>> 8)
  this[offset + 1] = (value & 0xff)
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  this[offset + 2] = (value >>> 16)
  this[offset + 3] = (value >>> 24)
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  this[offset] = (value >>> 24)
  this[offset + 1] = (value >>> 16)
  this[offset + 2] = (value >>> 8)
  this[offset + 3] = (value & 0xff)
  return offset + 4
}

Buffer.prototype.writeBigInt64LE = defineBigIntMethod(function writeBigInt64LE (value, offset = 0) {
  return wrtBigUInt64LE(this, value, offset, -BigInt('0x8000000000000000'), BigInt('0x7fffffffffffffff'))
})

Buffer.prototype.writeBigInt64BE = defineBigIntMethod(function writeBigInt64BE (value, offset = 0) {
  return wrtBigUInt64BE(this, value, offset, -BigInt('0x8000000000000000'), BigInt('0x7fffffffffffffff'))
})

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!Buffer.isBuffer(target)) throw new TypeError('argument should be a Buffer')
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('Index out of range')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  const len = end - start

  if (this === target && typeof Uint8Array.prototype.copyWithin === 'function') {
    // Use built-in when available, missing from IE11
    this.copyWithin(targetStart, start, end)
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, end),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
    if (val.length === 1) {
      const code = val.charCodeAt(0)
      if ((encoding === 'utf8' && code < 128) ||
          encoding === 'latin1') {
        // Fast path: If `val` fits into a single byte, use that numeric value.
        val = code
      }
    }
  } else if (typeof val === 'number') {
    val = val & 255
  } else if (typeof val === 'boolean') {
    val = Number(val)
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  let i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    const bytes = Buffer.isBuffer(val)
      ? val
      : Buffer.from(val, encoding)
    const len = bytes.length
    if (len === 0) {
      throw new TypeError('The value "' + val +
        '" is invalid for argument "value"')
    }
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// CUSTOM ERRORS
// =============

// Simplified versions from Node, changed for Buffer-only usage
const errors = {}
function E (sym, getMessage, Base) {
  errors[sym] = class NodeError extends Base {
    constructor () {
      super()

      Object.defineProperty(this, 'message', {
        value: getMessage.apply(this, arguments),
        writable: true,
        configurable: true
      })

      // Add the error code to the name to include it in the stack trace.
      this.name = `${this.name} [${sym}]`
      // Access the stack to generate the error message including the error code
      // from the name.
      this.stack // eslint-disable-line no-unused-expressions
      // Reset the name to the actual name.
      delete this.name
    }

    get code () {
      return sym
    }

    set code (value) {
      Object.defineProperty(this, 'code', {
        configurable: true,
        enumerable: true,
        value,
        writable: true
      })
    }

    toString () {
      return `${this.name} [${sym}]: ${this.message}`
    }
  }
}

E('ERR_BUFFER_OUT_OF_BOUNDS',
  function (name) {
    if (name) {
      return `${name} is outside of buffer bounds`
    }

    return 'Attempt to access memory outside buffer bounds'
  }, RangeError)
E('ERR_INVALID_ARG_TYPE',
  function (name, actual) {
    return `The "${name}" argument must be of type number. Received type ${typeof actual}`
  }, TypeError)
E('ERR_OUT_OF_RANGE',
  function (str, range, input) {
    let msg = `The value of "${str}" is out of range.`
    let received = input
    if (Number.isInteger(input) && Math.abs(input) > 2 ** 32) {
      received = addNumericalSeparator(String(input))
    } else if (typeof input === 'bigint') {
      received = String(input)
      if (input > BigInt(2) ** BigInt(32) || input < -(BigInt(2) ** BigInt(32))) {
        received = addNumericalSeparator(received)
      }
      received += 'n'
    }
    msg += ` It must be ${range}. Received ${received}`
    return msg
  }, RangeError)

function addNumericalSeparator (val) {
  let res = ''
  let i = val.length
  const start = val[0] === '-' ? 1 : 0
  for (; i >= start + 4; i -= 3) {
    res = `_${val.slice(i - 3, i)}${res}`
  }
  return `${val.slice(0, i)}${res}`
}

// CHECK FUNCTIONS
// ===============

function checkBounds (buf, offset, byteLength) {
  validateNumber(offset, 'offset')
  if (buf[offset] === undefined || buf[offset + byteLength] === undefined) {
    boundsError(offset, buf.length - (byteLength + 1))
  }
}

function checkIntBI (value, min, max, buf, offset, byteLength) {
  if (value > max || value < min) {
    const n = typeof min === 'bigint' ? 'n' : ''
    let range
    if (byteLength > 3) {
      if (min === 0 || min === BigInt(0)) {
        range = `>= 0${n} and < 2${n} ** ${(byteLength + 1) * 8}${n}`
      } else {
        range = `>= -(2${n} ** ${(byteLength + 1) * 8 - 1}${n}) and < 2 ** ` +
                `${(byteLength + 1) * 8 - 1}${n}`
      }
    } else {
      range = `>= ${min}${n} and <= ${max}${n}`
    }
    throw new errors.ERR_OUT_OF_RANGE('value', range, value)
  }
  checkBounds(buf, offset, byteLength)
}

function validateNumber (value, name) {
  if (typeof value !== 'number') {
    throw new errors.ERR_INVALID_ARG_TYPE(name, 'number', value)
  }
}

function boundsError (value, length, type) {
  if (Math.floor(value) !== value) {
    validateNumber(value, type)
    throw new errors.ERR_OUT_OF_RANGE(type || 'offset', 'an integer', value)
  }

  if (length < 0) {
    throw new errors.ERR_BUFFER_OUT_OF_BOUNDS()
  }

  throw new errors.ERR_OUT_OF_RANGE(type || 'offset',
                                    `>= ${type ? 1 : 0} and <= ${length}`,
                                    value)
}

// HELPER FUNCTIONS
// ================

const INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node takes equal signs as end of the Base64 encoding
  str = str.split('=')[0]
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = str.trim().replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  let codePoint
  const length = string.length
  let leadSurrogate = null
  const bytes = []

  for (let i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  const byteArray = []
  for (let i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  let c, hi, lo
  const byteArray = []
  for (let i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  let i
  for (i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

// ArrayBuffer or Uint8Array objects from other contexts (i.e. iframes) do not pass
// the `instanceof` check but they should be treated as of that type.
// See: https://github.com/feross/buffer/issues/166
function isInstance (obj, type) {
  return obj instanceof type ||
    (obj != null && obj.constructor != null && obj.constructor.name != null &&
      obj.constructor.name === type.name)
}
function numberIsNaN (obj) {
  // For IE11 support
  return obj !== obj // eslint-disable-line no-self-compare
}

// Create lookup table for `toString('hex')`
// See: https://github.com/feross/buffer/issues/219
const hexSliceLookupTable = (function () {
  const alphabet = '0123456789abcdef'
  const table = new Array(256)
  for (let i = 0; i < 16; ++i) {
    const i16 = i * 16
    for (let j = 0; j < 16; ++j) {
      table[i16 + j] = alphabet[i] + alphabet[j]
    }
  }
  return table
})()

// Return not function with Error if BigInt not supported
function defineBigIntMethod (fn) {
  return typeof BigInt === 'undefined' ? BufferBigIntNotDefined : fn
}

function BufferBigIntNotDefined () {
  throw new Error('BigInt not supported')
}


/***/ }),

/***/ "./node_modules/ieee754/index.js":
/*!***************************************!*\
  !*** ./node_modules/ieee754/index.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports) => {

/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = (e * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = (m * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = ((value * c) - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}


/***/ }),

/***/ "./src/bitcoin/TxCodec.ts":
/*!********************************!*\
  !*** ./src/bitcoin/TxCodec.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
/* provided dependency */ var Buffer = __webpack_require__(/*! buffer */ "./node_modules/buffer/index.js")["Buffer"];

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TxCodec = void 0;
const converter_1 = __webpack_require__(/*! ./converter */ "./src/bitcoin/converter.ts");
const helper_1 = __webpack_require__(/*! ./helper */ "./src/bitcoin/helper.ts");
const someCodecs_1 = __webpack_require__(/*! ./someCodecs */ "./src/bitcoin/someCodecs.ts");
const WitnessLocktimeCodec_1 = __webpack_require__(/*! ./WitnessLocktimeCodec */ "./src/bitcoin/WitnessLocktimeCodec.ts");
exports.TxCodec = {
    encode: (txObject) => {
        const txObjectHex = (0, helper_1.hex2buffer)(txObject);
        let resultBuffer = Buffer.alloc(0);
        const standartTx = txObject.marker === undefined;
        if (standartTx) {
            resultBuffer = someCodecs_1.Tx.encode(txObjectHex);
        }
        else {
            const witnessLocktimeCodec = new WitnessLocktimeCodec_1.WitnessLocktimeCodec(txObject.inputs.length);
            const witnessArray = txObject.inputs.map((input) => input.witness);
            const witnessLocktimeHexBuffer = witnessLocktimeCodec.encode((0, helper_1.hex2buffer)({ witness: witnessArray, locktime: txObject.locktime }));
            const witnessLocktimeHex = (0, helper_1.buffer2hex)(witnessLocktimeHexBuffer);
            const txSegwitBase = (0, converter_1.toTxSegwitBase)(txObject, witnessLocktimeHex);
            resultBuffer = someCodecs_1.TxWitnessBase.encode((0, helper_1.hex2buffer)(txSegwitBase));
        }
        const resultHex = (0, helper_1.buffer2hex)(resultBuffer);
        return resultHex;
    },
    decode: (txHex) => {
        const txBuffer = (0, helper_1.hex2buffer)(txHex);
        let resultBuffer;
        const standartTx = txHex.substr(8, 4) !== "0001";
        if (standartTx) {
            resultBuffer = someCodecs_1.Tx.decode(txBuffer);
            const txStandart = (0, helper_1.buffer2hex)(resultBuffer);
            return txStandart;
        }
        else {
            const txWitnessBaseBuffer = someCodecs_1.TxWitnessBase.decode(txBuffer);
            const txWitnessBase = (0, helper_1.buffer2hex)(txWitnessBaseBuffer);
            const witnessLocktimeCodec = new WitnessLocktimeCodec_1.WitnessLocktimeCodec(txWitnessBase.inputs.length);
            const witnessLocktimeDataBuffer = witnessLocktimeCodec.decode((0, helper_1.hex2buffer)(txWitnessBase.witness_locktime));
            const witnessLocktimeData = (0, helper_1.buffer2hex)(witnessLocktimeDataBuffer);
            const txSegwitParsed = {
                version: txWitnessBase.version,
                marker: txWitnessBase.marker,
                flag: txWitnessBase.flag,
                inputs: txWitnessBase.inputs,
                outputs: txWitnessBase.outputs,
                witness: witnessLocktimeData.witness,
                locktime: witnessLocktimeData.locktime,
            };
            const txSegwit = (0, converter_1.toTxSegwit)(txSegwitParsed);
            return txSegwit;
        }
    },
};


/***/ }),

/***/ "./src/bitcoin/WitnessLocktimeCodec.ts":
/*!*********************************************!*\
  !*** ./src/bitcoin/WitnessLocktimeCodec.ts ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WitnessLocktimeCodec = void 0;
const __1 = __importDefault(__webpack_require__(/*! ../ */ "./src/index.ts"));
const helper_1 = __webpack_require__(/*! ./helper */ "./src/bitcoin/helper.ts");
class WitnessLocktimeCodec {
    witnessLocktimeData = __1.default.Object([
        ["witness", __1.default.VarArray(__1.default.VarUIntBitcoin, __1.default.VarArray(__1.default.VarUIntBitcoin, __1.default.VarBuffer(__1.default.VarUIntBitcoin)))],
        ["locktime", __1.default.Number.UInt32LE],
    ]);
    inputsCount;
    encodeBytes;
    decodeBytes;
    encodingLength;
    constructor(inputsCount) {
        this.inputsCount = inputsCount;
        this.encodeBytes = this.witnessLocktimeData.encodeBytes;
        this.decodeBytes = this.witnessLocktimeData.decodeBytes;
        this.encodingLength = this.witnessLocktimeData.encodingLength;
    }
    encode = (value, buffer, offset) => {
        const result = this.witnessLocktimeData.encode(value, buffer, offset).slice(1);
        this.encodeBytes = this.witnessLocktimeData.encodeBytes;
        this.decodeBytes = this.witnessLocktimeData.decodeBytes;
        this.encodingLength = this.witnessLocktimeData.encodingLength;
        return result;
    };
    decode = (buffer, offset, end) => {
        const inputCountHex = this.inputsCount.toString(16).padStart(2, "0");
        const bufferHex = (0, helper_1.buffer2hex)(buffer);
        const newBuffer = (0, helper_1.hex2buffer)(inputCountHex + bufferHex);
        const result = this.witnessLocktimeData.decode(newBuffer, offset, end);
        this.encodeBytes = this.witnessLocktimeData.encodeBytes;
        this.decodeBytes = this.witnessLocktimeData.decodeBytes;
        this.encodingLength = this.witnessLocktimeData.encodingLength;
        return result;
    };
}
exports.WitnessLocktimeCodec = WitnessLocktimeCodec;


/***/ }),

/***/ "./src/bitcoin/converter.ts":
/*!**********************************!*\
  !*** ./src/bitcoin/converter.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.toTxSegwitBase = exports.toTxSegwitParsed = exports.toTxSegwit = void 0;
const toTxSegwit = (txSegwitParsed) => {
    const txSegwit = {
        version: txSegwitParsed.version,
        marker: txSegwitParsed.marker,
        flag: txSegwitParsed.flag,
        inputs: [],
        outputs: txSegwitParsed.outputs,
        locktime: txSegwitParsed.locktime,
    };
    txSegwitParsed.inputs.forEach((input, index) => {
        txSegwit.inputs.push({
            hash: input.hash,
            index: input.index,
            script: input.script,
            witness: txSegwitParsed.witness[index],
            sequence: input.sequence,
        });
    });
    return txSegwit;
};
exports.toTxSegwit = toTxSegwit;
const toTxSegwitParsed = (txSegwit) => {
    const txSegwitParsed = {
        version: txSegwit.version,
        marker: txSegwit.marker,
        flag: txSegwit.flag,
        inputs: [],
        outputs: txSegwit.outputs,
        witness: [],
        locktime: txSegwit.locktime,
    };
    txSegwit.inputs.forEach((input, index) => {
        txSegwitParsed.inputs.push({
            hash: input.hash,
            index: input.index,
            script: input.script,
            sequence: input.sequence,
        });
        txSegwitParsed.witness.push(txSegwitParsed.witness[index]);
    });
    return txSegwitParsed;
};
exports.toTxSegwitParsed = toTxSegwitParsed;
const toTxSegwitBase = (txSegwit, witnessLocktimeHex) => {
    const txSegwitBase = {
        version: txSegwit.version,
        marker: txSegwit.marker,
        flag: txSegwit.flag,
        inputs: [],
        outputs: txSegwit.outputs,
        witness_locktime: witnessLocktimeHex,
    };
    txSegwit.inputs.forEach((input, index) => {
        txSegwitBase.inputs.push({
            hash: input.hash,
            index: input.index,
            script: input.script,
            sequence: input.sequence,
        });
    });
    return txSegwitBase;
};
exports.toTxSegwitBase = toTxSegwitBase;


/***/ }),

/***/ "./src/bitcoin/helper.ts":
/*!*******************************!*\
  !*** ./src/bitcoin/helper.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
/* provided dependency */ var Buffer = __webpack_require__(/*! buffer */ "./node_modules/buffer/index.js")["Buffer"];

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.hex2buffer = exports.isHex = exports.buffer2hex = void 0;
function buffer2hex(obj) {
    if (Array.isArray(obj))
        obj = obj.map(buffer2hex);
    if (Buffer.isBuffer(obj))
        obj = obj.toString("hex");
    else if (typeof obj === "object") {
        for (var k in obj) {
            if (Buffer.isBuffer(obj[k]))
                obj[k] = obj[k].toString("hex");
            else if (Array.isArray(obj[k]))
                obj[k] = obj[k].map(buffer2hex);
            else if (typeof obj[k] === "object")
                obj[k] = buffer2hex(obj[k]);
        }
    }
    return obj;
}
exports.buffer2hex = buffer2hex;
function isHex(s) {
    return s.length % 2 === 0 && /^[0-9a-f]*$/.test(s);
}
exports.isHex = isHex;
function hex2buffer(obj) {
    if (Buffer.isBuffer(obj))
        return obj;
    if (Array.isArray(obj))
        obj = obj.map(hex2buffer);
    else if (typeof obj === "object") {
        for (var k in obj) {
            if (Array.isArray(obj[k]))
                obj[k] = obj[k].map(hex2buffer);
            else if (typeof obj[k] === "string" && isHex(obj[k]))
                obj[k] = Buffer.from(obj[k], "hex");
        }
    }
    if (typeof obj === "string" && isHex(obj))
        obj = Buffer.from(obj, "hex");
    return obj;
}
exports.hex2buffer = hex2buffer;


/***/ }),

/***/ "./src/bitcoin/someCodecs.ts":
/*!***********************************!*\
  !*** ./src/bitcoin/someCodecs.ts ***!
  \***********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TxWitnessBase = exports.Tx = void 0;
const __1 = __importDefault(__webpack_require__(/*! ../ */ "./src/index.ts"));
const TxVersion = __1.default.Number.UInt32LE; // int32_t
const TxInput = __1.default.Object([
    { name: "hash", type: __1.default.Buffer(32) },
    { name: "index", type: __1.default.Number.UInt32LE },
    { name: "script", type: __1.default.VarBuffer(__1.default.VarUIntBitcoin) },
    { name: "sequence", type: __1.default.Number.UInt32LE }, // uint32_t
]);
const TxInputs = __1.default.VarArray(__1.default.VarUIntBitcoin, TxInput);
const TxOutput = __1.default.Object([
    { name: "value", type: __1.default.Number.UInt64LE },
    { name: "script", type: __1.default.VarBuffer(__1.default.VarUIntBitcoin) },
]);
const TxOutputs = __1.default.VarArray(__1.default.VarUIntBitcoin, TxOutput);
const TxLocktime = __1.default.Number.UInt32LE; // uint32_t
exports.Tx = __1.default.Object([
    { name: "version", type: TxVersion },
    { name: "inputs", type: TxInputs },
    { name: "outputs", type: TxOutputs },
    { name: "locktime", type: TxLocktime },
]);
exports.TxWitnessBase = __1.default.Object([
    { name: "version", type: TxVersion },
    { name: "marker", type: __1.default.Byte },
    { name: "flag", type: __1.default.Byte },
    { name: "inputs", type: TxInputs },
    { name: "outputs", type: TxOutputs },
    { name: "witness_locktime", type: __1.default.AllBuffer },
]);


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const NumberTypes_1 = __webpack_require__(/*! ./models/NumberTypes */ "./src/models/NumberTypes.ts");
const CAllBuffer_1 = __webpack_require__(/*! ./lib/CAllBuffer */ "./src/lib/CAllBuffer.ts");
const CArray_1 = __webpack_require__(/*! ./lib/CArray */ "./src/lib/CArray.ts");
const CBuffer_1 = __webpack_require__(/*! ./lib/CBuffer */ "./src/lib/CBuffer.ts");
const CNumber_1 = __webpack_require__(/*! ./lib/CNumber */ "./src/lib/CNumber.ts");
const CObject_1 = __webpack_require__(/*! ./lib/CObject */ "./src/lib/CObject.ts");
const CString_1 = __webpack_require__(/*! ./lib/CString */ "./src/lib/CString.ts");
const CVarArray_1 = __webpack_require__(/*! ./lib/CVarArray */ "./src/lib/CVarArray.ts");
const CVarBuffer_1 = __webpack_require__(/*! ./lib/CVarBuffer */ "./src/lib/CVarBuffer.ts");
const CVarString_1 = __webpack_require__(/*! ./lib/CVarString */ "./src/lib/CVarString.ts");
const CVarUIntBitcoin_1 = __webpack_require__(/*! ./lib/CVarUIntBitcoin */ "./src/lib/CVarUIntBitcoin.ts");
exports["default"] = {
    AllBuffer: new CAllBuffer_1.CAllBuffer(),
    Array: (length, anyCodec) => new CArray_1.CArray(length, anyCodec),
    Buffer: (length) => new CBuffer_1.CBuffer(length),
    Byte: new CNumber_1.CNumber(NumberTypes_1.NumberTypes.UInt8, 1),
    Number: {
        Int8: new CNumber_1.CNumber(NumberTypes_1.NumberTypes.Int8, 1),
        UInt8: new CNumber_1.CNumber(NumberTypes_1.NumberTypes.UInt8, 1),
        Int16BE: new CNumber_1.CNumber(NumberTypes_1.NumberTypes.Int16BE, 2),
        Int16LE: new CNumber_1.CNumber(NumberTypes_1.NumberTypes.Int16LE, 2),
        UInt16BE: new CNumber_1.CNumber(NumberTypes_1.NumberTypes.UInt16BE, 2),
        UInt16LE: new CNumber_1.CNumber(NumberTypes_1.NumberTypes.UInt16LE, 2),
        Int32BE: new CNumber_1.CNumber(NumberTypes_1.NumberTypes.Int32BE, 4),
        Int32LE: new CNumber_1.CNumber(NumberTypes_1.NumberTypes.Int32LE, 4),
        UInt32BE: new CNumber_1.CNumber(NumberTypes_1.NumberTypes.UInt32BE, 4),
        UInt32LE: new CNumber_1.CNumber(NumberTypes_1.NumberTypes.UInt32LE, 4),
        Int64BE: new CNumber_1.CNumber(NumberTypes_1.NumberTypes.Int64BE, 8),
        Int64LE: new CNumber_1.CNumber(NumberTypes_1.NumberTypes.Int64LE, 8),
        UInt64BE: new CNumber_1.CNumber(NumberTypes_1.NumberTypes.UInt64BE, 8),
        UInt64LE: new CNumber_1.CNumber(NumberTypes_1.NumberTypes.UInt64LE, 8),
        FloatBE: new CNumber_1.CNumber(NumberTypes_1.NumberTypes.FloatBE, 4),
        FloatLE: new CNumber_1.CNumber(NumberTypes_1.NumberTypes.FloatLE, 4),
        DoubleBE: new CNumber_1.CNumber(NumberTypes_1.NumberTypes.DoubleBE, 8),
        DoubleLE: new CNumber_1.CNumber(NumberTypes_1.NumberTypes.DoubleLE, 8),
    },
    Object: (items) => new CObject_1.CObject(items),
    String: (length, encodingType = "utf8") => new CString_1.CString(length, encodingType),
    VarArray: (lengthType, anyCodec) => new CVarArray_1.CVarArray(lengthType, anyCodec),
    VarBuffer: (anyCodec) => new CVarBuffer_1.CVarBuffer(anyCodec),
    VarString: (anyCodec, encodingType = "utf8") => new CVarString_1.CVarString(anyCodec, encodingType),
    VarUIntBitcoin: new CVarUIntBitcoin_1.CVarUIntBitcoin(),
};


/***/ }),

/***/ "./src/lib/CAllBuffer.ts":
/*!*******************************!*\
  !*** ./src/lib/CAllBuffer.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
/* provided dependency */ var Buffer = __webpack_require__(/*! buffer */ "./node_modules/buffer/index.js")["Buffer"];

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CAllBuffer = void 0;
class CAllBuffer {
    length;
    encodingLength = () => this.length;
    encodeBytes;
    decodeBytes;
    constructor() {
        this.length = 0;
        this.encodeBytes = 0;
        this.decodeBytes = 0;
    }
    encode = (value, buffer, offset = 0) => {
        if (!Buffer.isBuffer(value))
            throw new TypeError("value must be a Buffer instance"); // for CArray encode iter
        this.length = value.length - offset;
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
        this.length = buffer.length - offset;
        if (offset + this.length > end)
            throw new RangeError("not enough data for decode");
        return Buffer.from(buffer.slice(offset, offset + this.length));
    };
}
exports.CAllBuffer = CAllBuffer;


/***/ }),

/***/ "./src/lib/CArray.ts":
/*!***************************!*\
  !*** ./src/lib/CArray.ts ***!
  \***************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
/* provided dependency */ var Buffer = __webpack_require__(/*! buffer */ "./node_modules/buffer/index.js")["Buffer"];

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CArray = void 0;
const util = __importStar(__webpack_require__(/*! ../util */ "./src/util.ts"));
class CArray {
    length;
    anyCodec;
    calcLength = (items) => {
        return util.size(items, this.anyCodec.encodingLength);
    };
    encodingLength = (array) => {
        if (array === undefined)
            throw new TypeError("value must be an Array instance");
        if (array.length !== this.length)
            throw new RangeError("value.length is out of bounds");
        return this.calcLength(array);
    };
    encodeBytes;
    decodeBytes;
    constructor(length, anyCodec) {
        this.length = length;
        this.anyCodec = anyCodec;
        this.encodeBytes = length;
        this.decodeBytes = length;
    }
    encode = (value, buffer, offset = 0) => {
        if (value.length !== this.length)
            throw new RangeError("value.length is out of bounds");
        if (!buffer)
            buffer = Buffer.allocUnsafe(this.calcLength(value));
        const typeEncode = this.anyCodec.encode;
        const typeEncodeBytes = this.anyCodec.encodeBytes;
        /* this.encodeBytes =
          value.reduce((previusValue, currentItem, _) => {
            this.anyCodec.encode(currentItem, buffer, previusValue);
            const newAnyCodecEncodeBytes = this.anyCodec.encodeBytes;
            return previusValue + newAnyCodecEncodeBytes;
          }, offset) - offset; */
        this.encodeBytes =
            util.size(value, function (item, index, loffset) {
                typeEncode(item, buffer, loffset);
                return typeEncodeBytes;
            }, offset) - offset;
        return buffer;
    };
    decode = (buffer, offset = 0, end) => {
        if (!offset)
            offset = 0;
        const items = new Array(this.length);
        const typeDecode = this.anyCodec.decode;
        const typeDecodeBytes = this.anyCodec.decodeBytes;
        /* this.decodeBytes =
          items.reduce((previusValue, currentItem, currentIndex) => {
            items[currentIndex] = this.anyCodec.decode(buffer, previusValue, end);
            const newAnyCodecDecodeBytes = this.anyCodec.decodeBytes;
            return previusValue + newAnyCodecDecodeBytes;
          }, offset + offset) - offset; */
        this.decodeBytes =
            util.size(items, function (item, index, loffset) {
                items[index || 0] = typeDecode(buffer, loffset, end);
                return typeDecodeBytes;
            }, offset) - offset;
        return items;
    };
}
exports.CArray = CArray;


/***/ }),

/***/ "./src/lib/CBuffer.ts":
/*!****************************!*\
  !*** ./src/lib/CBuffer.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
/* provided dependency */ var Buffer = __webpack_require__(/*! buffer */ "./node_modules/buffer/index.js")["Buffer"];

Object.defineProperty(exports, "__esModule", ({ value: true }));
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


/***/ }),

/***/ "./src/lib/CNumber.ts":
/*!****************************!*\
  !*** ./src/lib/CNumber.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
/* provided dependency */ var Buffer = __webpack_require__(/*! buffer */ "./node_modules/buffer/index.js")["Buffer"];

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CNumber = void 0;
const int53_1 = __webpack_require__(/*! @bitmatrix/int53 */ "./node_modules/@bitmatrix/int53/index.js");
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


/***/ }),

/***/ "./src/lib/CObject.ts":
/*!****************************!*\
  !*** ./src/lib/CObject.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
/* provided dependency */ var Buffer = __webpack_require__(/*! buffer */ "./node_modules/buffer/index.js")["Buffer"];

Object.defineProperty(exports, "__esModule", ({ value: true }));
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


/***/ }),

/***/ "./src/lib/CString.ts":
/*!****************************!*\
  !*** ./src/lib/CString.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
/* provided dependency */ var Buffer = __webpack_require__(/*! buffer */ "./node_modules/buffer/index.js")["Buffer"];

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CString = void 0;
const CBuffer_1 = __webpack_require__(/*! ./CBuffer */ "./src/lib/CBuffer.ts");
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


/***/ }),

/***/ "./src/lib/CVarArray.ts":
/*!******************************!*\
  !*** ./src/lib/CVarArray.ts ***!
  \******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
/* provided dependency */ var Buffer = __webpack_require__(/*! buffer */ "./node_modules/buffer/index.js")["Buffer"];

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CVarArray = void 0;
const util = __importStar(__webpack_require__(/*! ../util */ "./src/util.ts"));
class CVarArray {
    length = -1;
    lengthType;
    anyCodec;
    calcLength = (items) => {
        return util.size(items, this.anyCodec.encodingLength, this.lengthType.encodingLength(items.length));
    };
    encodingLength = (array) => {
        if (array === undefined)
            throw new TypeError("value must be an Array instance");
        return this.calcLength(array);
    };
    encodeBytes = -1;
    decodeBytes = -1;
    constructor(lengthType, anyCodec) {
        this.lengthType = lengthType;
        this.anyCodec = anyCodec;
    }
    encode = (value, buffer, offset = 0) => {
        if (!buffer)
            buffer = Buffer.allocUnsafe(this.calcLength(value));
        this.lengthType.encode(value.length, buffer, offset);
        /* this.encodeBytes =
          value.reduce((previusValue, currentItem, _) => {
            this.anyCodec.encode(currentItem, buffer, previusValue);
            const newAnyCodecEncodeBytes = this.anyCodec.encodeBytes;
            return previusValue + newAnyCodecEncodeBytes;
          }, this.lengthType.encodeBytes + offset) - offset; */
        this.encodeBytes =
            util.size(value, (item, index, loffset) => {
                this.anyCodec.encode(item, buffer, loffset);
                return this.anyCodec.encodeBytes;
            }, this.lengthType.encodeBytes + offset) - offset;
        return buffer;
    };
    decode = (buffer, offset = 0, end) => {
        if (!offset)
            offset = 0;
        const items = new Array(this.lengthType.decode(buffer, offset, end));
        /* this.decodeBytes =
          items.reduce((previusValue, currentItem, currentIndex) => {
            items[currentIndex] = this.anyCodec.decode(buffer, previusValue, end);
            const newAnyCodecDecodeBytes = this.anyCodec.decodeBytes;
            return previusValue + newAnyCodecDecodeBytes;
          }, this.lengthType.decodeBytes + offset) - offset; */
        this.decodeBytes =
            util.size(items, (item, index, loffset) => {
                items[index || 0] = this.anyCodec.decode(buffer, loffset, end);
                return this.anyCodec.decodeBytes;
            }, this.lengthType.decodeBytes + offset) - offset;
        return items;
    };
}
exports.CVarArray = CVarArray;


/***/ }),

/***/ "./src/lib/CVarBuffer.ts":
/*!*******************************!*\
  !*** ./src/lib/CVarBuffer.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
/* provided dependency */ var Buffer = __webpack_require__(/*! buffer */ "./node_modules/buffer/index.js")["Buffer"];

Object.defineProperty(exports, "__esModule", ({ value: true }));
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


/***/ }),

/***/ "./src/lib/CVarString.ts":
/*!*******************************!*\
  !*** ./src/lib/CVarString.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
/* provided dependency */ var Buffer = __webpack_require__(/*! buffer */ "./node_modules/buffer/index.js")["Buffer"];

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CVarString = void 0;
const CVarBuffer_1 = __webpack_require__(/*! ./CVarBuffer */ "./src/lib/CVarBuffer.ts");
class CVarString {
    anyCodec;
    encodingType;
    varBufferCodec;
    encodingLength;
    encodeBytes;
    decodeBytes;
    constructor(anyCodec, encodingType = "utf8") {
        this.anyCodec = anyCodec;
        this.encodingType = encodingType;
        this.varBufferCodec = new CVarBuffer_1.CVarBuffer(anyCodec);
        this.encodeBytes = 0;
        this.decodeBytes = 0;
        this.encodingLength = (value) => {
            if (value === undefined)
                throw new TypeError("value must be a string");
            const valueLength = Buffer.byteLength(value, this.encodingType);
            return this.anyCodec.encodingLength(value.length) + valueLength;
        };
    }
    encode = (value, buffer, offset = 0) => {
        const valueLength = Buffer.byteLength(value, this.encodingType);
        const bytes = this.anyCodec.encodingLength(value.length) + valueLength;
        if (!buffer)
            buffer = Buffer.allocUnsafe(bytes);
        if (offset + bytes > buffer.length)
            throw new RangeError("destination buffer is too small");
        this.anyCodec.encode(valueLength, buffer, offset);
        offset += this.anyCodec.encodeBytes;
        buffer.write(value, offset, valueLength, this.encodingType);
        this.encodeBytes = bytes;
        return buffer;
    };
    decode = (buffer, offset = 0, end) => {
        const str = this.varBufferCodec.decode(buffer, offset, end).toString(this.encodingType);
        this.decodeBytes = this.varBufferCodec.decodeBytes;
        return str;
    };
}
exports.CVarString = CVarString;


/***/ }),

/***/ "./src/lib/CVarUIntBitcoin.ts":
/*!************************************!*\
  !*** ./src/lib/CVarUIntBitcoin.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
/* provided dependency */ var Buffer = __webpack_require__(/*! buffer */ "./node_modules/buffer/index.js")["Buffer"];

Object.defineProperty(exports, "__esModule", ({ value: true }));
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


/***/ }),

/***/ "./src/models/NumberTypes.ts":
/*!***********************************!*\
  !*** ./src/models/NumberTypes.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NumberTypes = void 0;
var NumberTypes;
(function (NumberTypes) {
    NumberTypes["Byte"] = "UInt8";
    NumberTypes["Int8"] = "Int8";
    NumberTypes["UInt8"] = "UInt8";
    NumberTypes["Int16BE"] = "Int16BE";
    NumberTypes["Int16LE"] = "Int16LE";
    NumberTypes["UInt16BE"] = "UInt16BE";
    NumberTypes["UInt16LE"] = "UInt16LE";
    NumberTypes["Int32BE"] = "Int32BE";
    NumberTypes["Int32LE"] = "Int32LE";
    NumberTypes["UInt32BE"] = "UInt32BE";
    NumberTypes["UInt32LE"] = "UInt32LE";
    NumberTypes["Int64BE"] = "Int64BE";
    NumberTypes["Int64LE"] = "Int64LE";
    NumberTypes["UInt64BE"] = "UInt64BE";
    NumberTypes["UInt64LE"] = "UInt64LE";
    NumberTypes["FloatBE"] = "FloatBE";
    NumberTypes["FloatLE"] = "FloatLE";
    NumberTypes["DoubleBE"] = "DoubleBE";
    NumberTypes["DoubleLE"] = "DoubleLE";
})(NumberTypes = exports.NumberTypes || (exports.NumberTypes = {}));


/***/ }),

/***/ "./src/util.ts":
/*!*********************!*\
  !*** ./src/util.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.size = void 0;
const size = (items, iter, acc = 0) => {
    let result = acc;
    for (let i = 0; i < items.length; i++)
        result += iter(items[i], i, result);
    return result;
    /* return items.reduce((previusValue, currentItem, currentIndex) => {
      return previusValue + iter(items[currentIndex], currentIndex, previusValue);
    }, acc); */
};
exports.size = size;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
var exports = __webpack_exports__;
/*!************************!*\
  !*** ./src/bitcoin.ts ***!
  \************************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TxCodec = void 0;
const TxCodec_1 = __webpack_require__(/*! ./bitcoin/TxCodec */ "./src/bitcoin/TxCodec.ts");
Object.defineProperty(exports, "TxCodec", ({ enumerable: true, get: function () { return TxCodec_1.TxCodec; } }));

})();

bitcoin = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=bitcoin.umd.js.map