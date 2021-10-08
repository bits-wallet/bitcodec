import bitcodec from "../index";

export function buffer2hex(obj: any) {
  if (Array.isArray(obj)) obj = obj.map(buffer2hex);

  if (Buffer.isBuffer(obj)) obj = obj.toString("hex");
  else if (typeof obj === "object") {
    for (var k in obj) {
      if (Buffer.isBuffer(obj[k])) obj[k] = obj[k].toString("hex");
      else if (Array.isArray(obj[k])) obj[k] = obj[k].map(buffer2hex);
      else if (typeof obj[k] === "object") obj[k] = buffer2hex(obj[k]);
    }
  }

  return obj;
}

export function isHex(s: string) {
  return s.length % 2 === 0 && /^[0-9a-f]*$/.test(s);
}

export function hex2buffer(obj: any) {
  if (Buffer.isBuffer(obj)) return obj;

  if (Array.isArray(obj)) obj = obj.map(hex2buffer);
  else if (typeof obj === "object") {
    for (var k in obj) {
      if (Array.isArray(obj[k])) obj[k] = obj[k].map(hex2buffer);
      else if (typeof obj[k] === "string" && isHex(obj[k])) obj[k] = Buffer.from(obj[k], "hex");
    }
  }

  if (typeof obj === "string" && isHex(obj)) obj = Buffer.from(obj, "hex");
  return obj;
}
