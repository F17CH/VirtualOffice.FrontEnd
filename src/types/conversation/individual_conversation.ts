import { User } from "../user";
import { Message } from "./message";

export type IndividualConversation = {
    id: string;
    recipientUser: User;
    messages: Message[];
}