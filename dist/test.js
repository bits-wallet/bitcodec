let logMessage = "";

// tx
logMessage = bitcoin.TxCodec.decode(data.tx.hex);
console.log("TxCodec.decode", logMessage);

logMessage = bitcoin.TxCodec.encode(data.tx.raw);
console.log("TxCodec.encode", logMessage);

// message header
logMessage = bitcoin.HeaderCodec.decode(data.messageHeader.hex);
console.log("HeaderCodec.decode", logMessage);

logMessage = bitcoin.HeaderCodec.encode(data.messageHeader.raw);
console.log("HeaderCodec.encode", logMessage);
