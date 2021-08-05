import { User } from "../user";
import { Message } from "./message";

export type Conversation = {
    id: string;
    individual: boolean;
    individualRecipientUser?: User;
    messages: Message[];
    users: User[];
}