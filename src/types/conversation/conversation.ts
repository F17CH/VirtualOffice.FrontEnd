import { Message } from "./message";

export type Conversation = {
    id: string;
    userIds: string[];
    messages: Message[];
}