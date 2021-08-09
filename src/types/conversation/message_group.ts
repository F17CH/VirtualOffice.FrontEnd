import { Conversation } from "./conversation";
import { Message } from "./message";

export type MessageGroup = {
    messages: Message[];
    userId: string;
    displayTime: Date
}

const maxMinutesPerGroup: number = 5;

export function getMessageGroups(conversation: Conversation) : MessageGroup[] {
    let messageGroups : MessageGroup[] = [];
    let currentGroup: MessageGroup = null;

    conversation.messages.map(message => {
        if (currentGroup && currentGroup.userId == message.userId)
        {
            currentGroup.messages.push(message);
        }
        else
        {
            let newGroup: MessageGroup = { messages: [ message ], userId: message.userId, displayTime: null }
            messageGroups.push(newGroup);
            currentGroup = newGroup;
        }
    });


    return messageGroups;
}