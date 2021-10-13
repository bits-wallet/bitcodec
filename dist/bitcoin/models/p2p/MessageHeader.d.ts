export interface MessageHeader<T> {
    startString: number;
    commandName: string;
    payloadSize: number;
    checksum: string;
    payload: T;
}
