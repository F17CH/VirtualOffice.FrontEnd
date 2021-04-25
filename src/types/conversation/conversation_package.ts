import { User } from "../user";
import { Conversation } from "./conversation";

export type ConversationPackage = {
    conversation: Conversation
    users: { [id: string]: User };
}