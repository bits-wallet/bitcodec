export interface MessageStructure<T> {
    magic: number;
    command: string;
    length: number;
    checksum: string;
    payload: T;
}
