import React, { useEffect, useState } from "react";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { AppBar, Button, Grid, Paper, TextField, Toolbar, Typography } from "@material-ui/core";
import { User } from "../../../types/user";
import { LoginCredentials } from "../../../types/login_credentials";
import { postConversationCreate } from "../../../services/api/conversation/conversation_requests";
import { ConversationCreateRequest } from "../../../services/api/conversation/types/conversation_create_request";
import { Conversation } from "../../../types/conversation/conversation";

import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { ConversationContainerHeader } from "./conversation_container_header";
import { getMessageGroups, MessageGroup } from "../../../types/conversation/message_group";
import { ConversationContainerMessageGroup } from "./conversation_container_message_group";
import { Message } from "../../../types/conversation/message";
import { ConversationContainerMessageSender } from "./conversation_container_message_sender";
import { postMessageCreate } from "../../../services/api/conversation/message_requests";

const useStyles = (makeStyles<Theme>(theme => createStyles({
    conversationMenu: {
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start"
    },
    conversationPaper: {
        flexGrow: 1,
        backgroundColor: theme.palette.secondary.light
    }
})));

export type ConversationContainerProps = {
    conversation: Conversation;
    currentUser: User;
    users: { [userId: string]: User };
    onNewMessage: (conversation: Conversation, message: Message) => void;
}

export function ConversationContainer({ conversation, currentUser, users, onNewMessage }: ConversationContainerProps): JSX.Element {
    const classes = useStyles();
    const [messageGroups, setMessageGroups] = useState<MessageGroup[]>([]);

    useEffect(function (): void {
        if (conversation) {
            console.log("change2")
            let newMessageGroups = getMessageGroups(conversation);
            console.log(newMessageGroups);
            setMessageGroups(newMessageGroups)
        }
    }, [conversation]);

    function onNewMessageContent(messageContent: string) : void {
        var newMessage: Message = { id: null, userId: currentUser.id, content: messageContent };

        postMessageCreate(conversation.id, newMessage).then(message => {
            onNewMessage(conversation, message);
        })
    }

    return (
        <>
            {conversation ? (
                <div className={classes.conversationMenu}>
                    <ConversationContainerHeader conversation={conversation} currentUser={currentUser} />
                    <Paper square className={classes.conversationPaper}>
                        {messageGroups.map((messageGroup, index) => (
                            <ConversationContainerMessageGroup key={index} messageGroup={messageGroup} user={users[messageGroup.userId]} />
                        ))}
                    <ConversationContainerMessageSender onNewMessageContent={onNewMessageContent} />
                    </Paper>
                </div>
            ) : (
                <div>

                </div>
            )}
        </>
    )
}