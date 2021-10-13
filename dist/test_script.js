let logMessage = "";

// tx
logMessage = bitcoin.TxCodec.decode(data.tx.hex);
console.log("TxCodec.decode", logMessage);

logMessage = bitcoin.TxCodec.encode(data.tx.raw);
console.log("TxCodec.encode", logMessage);

// message header
logMessage = bitcoin.MessageStructureCodec.decode(data.messageStructure.hex);
console.log("MessageStructureCodec.decode", logMessage);

logMessage = bitcoin.MessageStructureCodec.encode(data.messageStructure.raw);
console.log("MessageStructureCodec.encode", logMessage);
