import { Button, createStyles, Grid, makeStyles, Paper, Theme } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { LoginBox } from "../components/login/login_box";
import { ConversationPanel } from "../components/panels/conversation_panel";
import { DataPanel } from "../components/panels/data_panel";
import { UserBox } from "../components/user/user_box";
import { getSelf, getUser, postAttemptSignIn } from "../services/api/user/user_requests";
import { joinChannel } from "../services/channel/channel_handler";
import { newConversationChannel } from "../services/channel/conversation_channel_handler";
import { initSocket } from "../services/channel/socket_handler";
import { newUserChannel } from "../services/channel/user_channel_handler";
import { Conversation } from "../types/conversation/conversation";
import { Message } from "../types/conversation/message";
import { LoginCredentials } from "../types/login_credentials";
import { User } from "../types/user";

const useStyles = (makeStyles<Theme>(theme => createStyles({
    mainContainer: {
        flexDirection: "column",
        height: "100%",
        zIndex: 1,
    },
})));

export type MainProps = {
    currentUser: User;
    onLogout: () => void;
}

export function Main({ currentUser, onLogout }: MainProps): JSX.Element {
    const classes = useStyles();

    useEffect(function (): void {
        (async function (): Promise<void> {
            userInit();
        })();
    }, [currentUser]);

    function userInit(): void {
        initSocket();
        userChannelInit();

    }

    function userChannelInit(): void {
        var userChannel = newUserChannel(currentUser.id);

        userChannel.on("conversation_new", async (response) => {
            var newConversation: Conversation = response.data;
            onNewConversation(newConversation);
        })

        joinChannel(userChannel);
    }

    const [conversations, setConversations] = useState<Conversation[]>([]);

    function onNewConversation(newConversation: Conversation): void {
        var conversationChannel = newConversationChannel(newConversation.id);

        conversationChannel.on("message_new", async (response) => {
            var newMessage: Message = response.data;

            if (newMessage.user_id != currentUser.id) {
                onNewMessage(newConversation, newMessage);
            }
        });

        joinChannel(conversationChannel);

        setConversations((prevState: Conversation[]) => [...prevState, newConversation]);
    }

    function onNewMessage(currentConversation: Conversation, newMessage: Message): void {
        setConversations((prevState) => {
            var convIndex = prevState.findIndex(conv => conv == currentConversation);
            currentConversation.messages.push(newMessage);
            prevState[convIndex] = currentConversation;
            return [...prevState];
        });
    }

    const loadedUsers: { [id: string]: User } = {};

    function loadUser(userId: string): User {
        debugger;
        
        var user: User = null;

        if (userId == currentUser.id) {
            user = currentUser;
        }
        else if (loadedUsers[userId]) {
            user = loadedUsers[userId];
        }
        else {
            getUser(userId).then((newUser: User) => {
                loadedUsers[newUser.id] = newUser;
                user = newUser;
            });
        }

        return user;
    }

    return (
        <>
            <Grid item className={classes.mainContainer} md={9}>
                <ConversationPanel currentUser={currentUser} conversations={conversations} onNewConversation={onNewConversation} onNewMessage={onNewMessage} loadUser={loadUser} />
            </Grid>
            <Grid item className={classes.mainContainer} md={3}>
                <DataPanel user={currentUser} onLogout={onLogout} />
            </Grid>
        </>
    )
}