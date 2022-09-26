export enum MessageType {
    INFO, WARNING, ERROR
}

export interface IMessage {
    text: string | null;
    type: MessageType;
}

export class Message implements IMessage{
    text: string | null;
    type: MessageType;

    constructor(text: string | null, type: MessageType) {
        this.text = text;
        this.type = type;
    }
}
