import { User } from "../user";
import { Message } from "./message";

export type Conversation = {
    id: string;
    individual: boolean;
    messages: Message[];
    users: User[]; 
}