import { Conversation } from "./conversation/conversation";
import { Association } from "./group/association";

export type SessionUser = {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    associations: Association[];
    individualConversations: Conversation[];
    //individualConversations: { [userId: string]: IndividualConversation };
}