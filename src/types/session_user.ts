import { IndividualConversation } from "./conversation/individual_conversation";
import { Association } from "./group/association";

export type SessionUser = {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    associations: Association[];
    individualConversations: { [userId: string]: IndividualConversation };
}