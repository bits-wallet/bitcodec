(()=>{"use strict";var e={727:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.toDouble=t.intHighLow=t.uintHighLow=t.onesComplement=t.assert=t.Int53Type=void 0;const n=4294967295;var r;(r=t.Int53Type||(t.Int53Type={})).Int64BE="Int64BE",r.Int64LE="Int64LE",r.UInt64BE="UInt64BE",r.UInt64LE="UInt64LE",t.assert=(e,t)=>{if(!e)throw new Error(t)},t.onesComplement=e=>((e=~e)<0&&(e=2147483648+(2147483647&e)),e),t.uintHighLow=e=>{(0,t.assert)(e>-1&&e<=9007199254740991,"number out of range"),(0,t.assert)(Math.floor(e)===e,"number must be an integer");var r=0,o=4294967295&e,i=o<0?2147483648+(2147483647&e):o;return e>n&&(r=(e-i)/4294967296),[r,i]},t.intHighLow=e=>{if(e>-1)return(0,t.uintHighLow)(e);var r=(0,t.uintHighLow)(-e),o=(0,t.onesComplement)(r[0]),i=(0,t.onesComplement)(r[1]);return i===n?(o+=1,i=0):i+=1,[o,i]},t.toDouble=(e,n,r)=>r&&0!=(2147483648&e)?(e=(0,t.onesComplement)(e),n=(0,t.onesComplement)(n),(0,t.assert)(e<2097152,"number too small"),-(4294967296*e+n+1)):((0,t.assert)(e<2097152,"number too large"),4294967296*e+n)},716:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.readInt53=t.writeInt53=t.Int53Type=void 0;var r=n(727);Object.defineProperty(t,"Int53Type",{enumerable:!0,get:function(){return r.Int53Type}});var o=n(733);Object.defineProperty(t,"writeInt53",{enumerable:!0,get:function(){return o.write}});var i=n(120);Object.defineProperty(t,"readInt53",{enumerable:!0,get:function(){return i.read}})},120:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.read=void 0;const r=n(727);t.read=(e,t,n=0)=>{const o=e.endsWith("BE"),[i,s]=o?[t.readUInt32BE(n),t.readUInt32BE(n+4)]:[t.readUInt32LE(n+4),t.readUInt32LE(n)],d=e.startsWith("Int");return(0,r.toDouble)(i,s,d)}},733:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.write=void 0;const r=n(727);t.write=(e,t,n,o=0)=>{const i=e.startsWith("Int")?(0,r.intHighLow)(t):(0,r.uintHighLow)(t);e.endsWith("BE")?(n.writeUInt32BE(i[0],o),n.writeUInt32BE(i[1],o+4)):(n.writeUInt32LE(i[1],o),n.writeUInt32LE(i[0],o+4))}},68:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.CAllBuffer=void 0,t.CAllBuffer=class{length;encodingLength=()=>this.length;encodeBytes;decodeBytes;constructor(){this.length=0,this.encodeBytes=0,this.decodeBytes=0}encode=(e,t,n=0)=>{if(!Buffer.isBuffer(e))throw new TypeError("value must be a Buffer instance");if(this.length=e.length-n,!t)return Buffer.from(e);if(n+this.length>t.length)throw new RangeError("destination buffer is too small");return e.copy(t,n),t};decode=(e,t=0,n)=>{if(n||(n=e.length),this.length=e.length-t,t+this.length>n)throw new RangeError("not enough data for decode");return Buffer.from(e.slice(t,t+this.length))}}},157:function(e,t,n){var r=this&&this.__createBinding||(Object.create?function(e,t,n,r){void 0===r&&(r=n),Object.defineProperty(e,r,{enumerable:!0,get:function(){return t[n]}})}:function(e,t,n,r){void 0===r&&(r=n),e[r]=t[n]}),o=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),i=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)"default"!==n&&Object.prototype.hasOwnProperty.call(e,n)&&r(t,e,n);return o(t,e),t};Object.defineProperty(t,"__esModule",{value:!0}),t.CArray=void 0;const s=i(n(882));t.CArray=class{length;anyCodec;calcLength=e=>s.size(e,this.anyCodec.encodingLength);encodingLength=e=>{if(void 0===e)throw new TypeError("value must be an Array instance");if(e.length!==this.length)throw new RangeError("value.length is out of bounds");return this.calcLength(e)};encodeBytes;decodeBytes;constructor(e,t){this.length=e,this.anyCodec=t,this.encodeBytes=e,this.decodeBytes=e}encode=(e,t,n=0)=>{if(e.length!==this.length)throw new RangeError("value.length is out of bounds");t||(t=Buffer.allocUnsafe(this.calcLength(e)));const r=this.anyCodec.encode,o=this.anyCodec.encodeBytes;return this.encodeBytes=s.size(e,(function(e,n,i){return r(e,t,i),o}),n)-n,t};decode=(e,t=0,n)=>{t||(t=0);const r=new Array(this.length),o=this.anyCodec.decode,i=this.anyCodec.decodeBytes;return this.decodeBytes=s.size(r,(function(t,s,d){return r[s||0]=o(e,d,n),i}),t)-t,r}}},483:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.CBuffer=void 0,t.CBuffer=class{length;encodingLength=()=>this.length;encodeBytes;decodeBytes;constructor(e){this.length=e,this.encodeBytes=e,this.decodeBytes=e}encode=(e,t,n=0)=>{if(!Buffer.isBuffer(e))throw new TypeError("value must be a Buffer instance");if(e.length!==this.length)throw new RangeError("value.length is out of bounds");if(!t)return Buffer.from(e);if(n+this.length>t.length)throw new RangeError("destination buffer is too small");return e.copy(t,n),t};decode=(e,t=0,n)=>{if(n||(n=e.length),t+this.length>n)throw new RangeError("not enough data for decode");return Buffer.from(e.slice(t,t+this.length))}}},193:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.CNumber=void 0;const r=n(716);t.CNumber=class{length;write;read;encodingLength=()=>this.length;encodeBytes;decodeBytes;constructor(e,t){this.length=t,this.encodeBytes=t,this.decodeBytes=t,Buffer.prototype["write"+e]?this.write=(t,n,r)=>t["write"+e](n,r):this.write=(t,n,o)=>(0,r.writeInt53)(e,n,t,o),Buffer.prototype["read"+e]?this.read=(t,n)=>t["read"+e](n):this.read=(t,n)=>(0,r.readInt53)(e,t,n)}encode=(e,t,n=0)=>(t=t||Buffer.allocUnsafe(this.length),this.write(t,e,n),t);decode=(e,t=0,n)=>n?this.read(e.slice(t,n),0):this.read(e,t)}},759:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.CObject=void 0,t.CObject=class{items;encodeBytes;decodeBytes;encodingLength;constructor(e){this.items=e.map((e=>Array.isArray(e)?{name:e[0],type:e[1]}:e)),this.encodeBytes=0,this.decodeBytes=0,this.encodingLength=e=>{if(void 0===e)throw new TypeError("Expected Object, got "+e);return this.items.reduce(((t,n)=>{const r=e[n.name];return t+n.type.encodingLength(r)}),0)}}encode=(e,t,n=0)=>{const r=this.encodingLength(e);if(void 0===t)t=Buffer.allocUnsafe(r);else if(t.length-n<r)throw new RangeError("destination buffer is too small");return this.items.forEach((r=>{const o=e[r.name];r.type.encode(o,t,n),n+=r.type.encodeBytes})),this.encodeBytes=r,t};decode=(e,t=0,n)=>{let r={};const o=t;return this.items.forEach((o=>{const i=o.type.decode(e,t,n);t+=o.type.decodeBytes,r[o.name]=i})),this.decodeBytes=t-o,r}}},129:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.CString=void 0;const r=n(483);t.CString=class{length;bufferCodec;encodingType;encodingLength;encodeBytes;decodeBytes;constructor(e,t="utf8"){this.length=e,this.encodingType=t,this.bufferCodec=new r.CBuffer(this.length),this.encodeBytes=e,this.decodeBytes=e,this.encodingLength=e=>this.length}encode=(e,t,n=0)=>{if(Buffer.byteLength(e,this.encodingType)!==this.length)throw new RangeError("value.length is out of bounds");if(!t)return Buffer.from(e,this.encodingType);if(n+this.length>t.length)throw new RangeError("destination buffer is too small");return t.write(e,n,length,this.encodingType),t};decode=(e,t=0,n)=>this.bufferCodec.decode(e,t,n).toString(this.encodingType)}},161:function(e,t,n){var r=this&&this.__createBinding||(Object.create?function(e,t,n,r){void 0===r&&(r=n),Object.defineProperty(e,r,{enumerable:!0,get:function(){return t[n]}})}:function(e,t,n,r){void 0===r&&(r=n),e[r]=t[n]}),o=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),i=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)"default"!==n&&Object.prototype.hasOwnProperty.call(e,n)&&r(t,e,n);return o(t,e),t};Object.defineProperty(t,"__esModule",{value:!0}),t.CVarArray=void 0;const s=i(n(882));t.CVarArray=class{length=-1;lengthType;anyCodec;calcLength=e=>s.size(e,this.anyCodec.encodingLength,this.lengthType.encodingLength(e.length));encodingLength=e=>{if(void 0===e)throw new TypeError("value must be an Array instance");return this.calcLength(e)};encodeBytes=-1;decodeBytes=-1;constructor(e,t){this.lengthType=e,this.anyCodec=t}encode=(e,t,n=0)=>(t||(t=Buffer.allocUnsafe(this.calcLength(e))),this.lengthType.encode(e.length,t,n),this.encodeBytes=s.size(e,((e,n,r)=>(this.anyCodec.encode(e,t,r),this.anyCodec.encodeBytes)),this.lengthType.encodeBytes+n)-n,t);decode=(e,t=0,n)=>{t||(t=0);const r=new Array(this.lengthType.decode(e,t,n));return this.decodeBytes=s.size(r,((t,o,i)=>(r[o||0]=this.anyCodec.decode(e,i,n),this.anyCodec.decodeBytes)),this.lengthType.decodeBytes+t)-t,r}}},5:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.CVarBuffer=void 0,t.CVarBuffer=class{anyCodec;encodingLength;encodeBytes;decodeBytes;constructor(e){this.anyCodec=e,this.encodeBytes=0,this.decodeBytes=0,this.encodingLength=e=>{if(void 0===e)throw new TypeError("value must be a Buffer instance");return this.anyCodec.encodingLength(e.length)+e.length}}encode=(e,t,n=0)=>{const r=this.encodingLength(e);if(t){if(t.length-n<r)throw new RangeError("destination buffer is too small")}else t=Buffer.allocUnsafe(r);return this.anyCodec.encode(e.length,t,n),n+=this.anyCodec.encodeBytes,e.copy(t,n),this.encodeBytes=r,t};decode=(e,t=0,n)=>{void 0===n&&(n=e.length);const r=t,o=this.anyCodec.decode(e,t,n);if((t+=this.anyCodec.decodeBytes)+o>n)throw new RangeError("not enough data for decode");return this.decodeBytes=t+o-r,Buffer.from(e.slice(t,t+o))}}},513:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.CVarString=void 0;const r=n(5);t.CVarString=class{anyCodec;encodingType;varBufferCodec;encodingLength;encodeBytes;decodeBytes;constructor(e,t="utf8"){this.anyCodec=e,this.encodingType=t,this.varBufferCodec=new r.CVarBuffer(e),this.encodeBytes=0,this.decodeBytes=0,this.encodingLength=e=>{if(void 0===e)throw new TypeError("value must be a string");const t=Buffer.byteLength(e,this.encodingType);return this.anyCodec.encodingLength(e.length)+t}}encode=(e,t,n=0)=>{const r=Buffer.byteLength(e,this.encodingType),o=this.anyCodec.encodingLength(e.length)+r;if(t||(t=Buffer.allocUnsafe(o)),n+o>t.length)throw new RangeError("destination buffer is too small");return this.anyCodec.encode(r,t,n),n+=this.anyCodec.encodeBytes,t.write(e,n,r,this.encodingType),this.encodeBytes=o,t};decode=(e,t=0,n)=>{const r=this.varBufferCodec.decode(e,t,n).toString(this.encodingType);return this.decodeBytes=this.varBufferCodec.decodeBytes,r}}},492:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.CVarUIntBitcoin=void 0,t.CVarUIntBitcoin=class{MAX_SAFE_INTEGER=9007199254740991;checkUInt53=e=>{if(e<0||e>this.MAX_SAFE_INTEGER||e%1!=0)throw new RangeError("value out of range")};encodeBytes;decodeBytes;encodingLength;constructor(){this.encodeBytes=0,this.decodeBytes=0,this.encodingLength=e=>{if(void 0===e)throw new TypeError("Expected number, got undefined");return this.checkUInt53(e),e<253?1:e<=65535?3:e<=4294967295?5:9}}encode=(e,t,n=0)=>(t||(t=Buffer.allocUnsafe(this.encodingLength(e))),e<253?(t.writeUInt8(e,n),this.encodeBytes=1):e<=65535?(t.writeUInt8(253,n),t.writeUInt16LE(e,n+1),this.encodeBytes=3):e<=4294967295?(t.writeUInt8(254,n),t.writeUInt32LE(e,n+1),this.encodeBytes=5):(t.writeUInt8(255,n),t.writeUInt32LE(e>>>0,n+1),t.writeUInt32LE(e/4294967296|0,n+5),this.encodeBytes=9),t);decode=(e,t=0,n)=>{const r=e.readUInt8(t);if(r<253)return this.decodeBytes=1,r;if(253===r)return this.decodeBytes=3,e.readUInt16LE(t+1);if(254===r)return this.decodeBytes=5,e.readUInt32LE(t+1);this.decodeBytes=9;var o=e.readUInt32LE(t+1),i=4294967296*e.readUInt32LE(t+5)+o;return this.checkUInt53(i),i}}},960:(e,t)=>{var n;Object.defineProperty(t,"__esModule",{value:!0}),t.NumberTypes=void 0,(n=t.NumberTypes||(t.NumberTypes={})).Byte="UInt8",n.Int8="Int8",n.UInt8="UInt8",n.Int16BE="Int16BE",n.Int16LE="Int16LE",n.UInt16BE="UInt16BE",n.UInt16LE="UInt16LE",n.Int32BE="Int32BE",n.Int32LE="Int32LE",n.UInt32BE="UInt32BE",n.UInt32LE="UInt32LE",n.Int64BE="Int64BE",n.Int64LE="Int64LE",n.UInt64BE="UInt64BE",n.UInt64LE="UInt64LE",n.FloatBE="FloatBE",n.FloatLE="FloatLE",n.DoubleBE="DoubleBE",n.DoubleLE="DoubleLE"},882:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.size=void 0,t.size=(e,t,n=0)=>{let r=n;for(let n=0;n<e.length;n++)r+=t(e[n],n,r);return r}}},t={};function n(r){var o=t[r];if(void 0!==o)return o.exports;var i=t[r]={exports:{}};return e[r].call(i.exports,i,i.exports,n),i.exports}var r={};(()=>{var e=r;Object.defineProperty(e,"__esModule",{value:!0});const t=n(960),o=n(68),i=n(157),s=n(483),d=n(193),c=n(759),u=n(129),h=n(161),a=n(5),l=n(513),f=n(492);e.default={AllBuffer:new o.CAllBuffer,Array:(e,t)=>new i.CArray(e,t),Buffer:e=>new s.CBuffer(e),Byte:new d.CNumber(t.NumberTypes.UInt8,1),Number:{Int8:new d.CNumber(t.NumberTypes.Int8,1),UInt8:new d.CNumber(t.NumberTypes.UInt8,1),Int16BE:new d.CNumber(t.NumberTypes.Int16BE,2),Int16LE:new d.CNumber(t.NumberTypes.Int16LE,2),UInt16BE:new d.CNumber(t.NumberTypes.UInt16BE,2),UInt16LE:new d.CNumber(t.NumberTypes.UInt16LE,2),Int32BE:new d.CNumber(t.NumberTypes.Int32BE,4),Int32LE:new d.CNumber(t.NumberTypes.Int32LE,4),UInt32BE:new d.CNumber(t.NumberTypes.UInt32BE,4),UInt32LE:new d.CNumber(t.NumberTypes.UInt32LE,4),Int64BE:new d.CNumber(t.NumberTypes.Int64BE,8),Int64LE:new d.CNumber(t.NumberTypes.Int64LE,8),UInt64BE:new d.CNumber(t.NumberTypes.UInt64BE,8),UInt64LE:new d.CNumber(t.NumberTypes.UInt64LE,8),FloatBE:new d.CNumber(t.NumberTypes.FloatBE,4),FloatLE:new d.CNumber(t.NumberTypes.FloatLE,4),DoubleBE:new d.CNumber(t.NumberTypes.DoubleBE,8),DoubleLE:new d.CNumber(t.NumberTypes.DoubleLE,8)},Object:e=>new c.CObject(e),String:(e,t="utf8")=>new u.CString(e,t),VarArray:(e,t)=>new h.CVarArray(e,t),VarBuffer:e=>new a.CVarBuffer(e),VarString:(e,t="utf8")=>new l.CVarString(e,t),VarUIntBitcoin:new f.CVarUIntBitcoin}})(),module.exports=r})();
//# sourceMappingURL=index.js.map