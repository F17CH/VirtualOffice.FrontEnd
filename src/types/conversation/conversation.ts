import { Message } from "./message";

export type Conversation = {
    id: string;
    user_ids: string[];
    messages: Message[];
}