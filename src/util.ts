export const calcAllLength = <T>(items: T[], calcLength: (item?: T, itemIndex?: number, itemOffset?: number) => number, allOffset: number = 0) => {
  let lOffset = allOffset;
  for (let i = 0; i < items.length; i++) lOffset += calcLength(items[i], i, lOffset);
  return lOffset;

  /* return items.reduce((previusValue, currentItem, currentIndex) => {
    return previusValue + iter(items[currentIndex], currentIndex, previusValue);
  }, acc); */
};

const copy = (obj: any): any => {
  if (Buffer.isBuffer(obj)) return obj.slice();
  if (Array.isArray(obj)) return obj.map(copy);
  if (typeof obj === "object") {
    const newObj: any = {};
    for (let k in obj) {
      newObj[k] = copy(obj[k]);
    }
    return newObj;
  }

  if (typeof obj === "function") throw "unsupported copy!";
  return obj;
};

function isHex(s: string) {
  return s.length % 2 === 0 && /^[0-9a-f]*$/.test(s.toLowerCase());
}

export function hex2buffer(obj: any) {
  if (Buffer.isBuffer(obj)) return copy(obj);
  else if (typeof obj === "string" && isHex(obj)) return Buffer.from(obj, "hex");
  else if (typeof obj === "object") {
    const newObj = copy(obj);
    for (var k in newObj) {
      newObj[k] = hex2buffer(newObj[k]);
    }
    return newObj;
  } else if (Array.isArray(obj)) {
    return copy(obj).map(hex2buffer);
  }

  return obj;
}

export function buffer2hex(obj: any) {
  if (Buffer.isBuffer(obj)) {
    const newBuffer = copy(obj);
    return newBuffer.toString("hex");
  } else if (Array.isArray(obj)) {
    let newObj = copy(obj);
    newObj = newObj.map(buffer2hex);
    return newObj;
  } else if (typeof obj === "object") {
    const newObj = copy(obj);
    for (var k in newObj) {
      newObj[k] = buffer2hex(newObj[k]);
    }
    return newObj;
  }

  return obj;
}
