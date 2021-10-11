export declare type MessageHeader = {
    startString: number;
    commandName: string;
    payloadSize: number;
    checksum: string;
    payload: string;
};
