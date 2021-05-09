import { Button, createStyles, Grid, makeStyles, Paper, Theme } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { LoginBox } from "../components/login/login_box";
import { ConversationPanel } from "../components/panels/conversation_panel";
import { DataPanel } from "../components/panels/data_panel";
import { UserBox } from "../components/user/user_box";
import { joinChannel } from "../services/channel/channel_handler";
import { newConversationChannel } from "../services/channel/conversation_channel_handler";
import { initSocket } from "../services/channel/socket_handler";
import { newUserChannel } from "../services/channel/user_channel_handler";
import { userCacheCurrentUser, userCacheloadUser } from "../services/users/users_cache";
import { Conversation } from "../types/conversation/conversation";
import { ConversationPackage } from "../types/conversation/conversation_package";
import { Message } from "../types/conversation/message";
import { Association } from "../types/group/association";
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
        userCacheCurrentUser(currentUser);
        var userChannel = newUserChannel(currentUser.id);

        userChannel.on("conversation_new", async (response) => {
            var newConversation: Conversation = response.data;
            onNewConversation(newConversation);
        })

        joinChannel(userChannel);
    }

    const [conversationPackages, setConversationPackages] = useState<ConversationPackage[]>([]);

    async function onNewConversation(newConversation: Conversation): Promise<void> {
        newConversationChannel(newConversation, currentUser, onNewMessage);

        var newConversationPackage: ConversationPackage = { conversation: newConversation, users: {} }

        newConversation.user_ids.map(async (userId) => {
            newConversationPackage.users[userId] = await userCacheloadUser(userId);
        });

        setConversationPackages((prevState: ConversationPackage[]) => [...prevState, newConversationPackage]);
    }

    function onNewMessage(currentConversation: Conversation, newMessage: Message): void {
        setConversationPackages((prevState) => {
            var convIndex = prevState.findIndex(convPackage => convPackage.conversation == currentConversation);
            currentConversation.messages.push(newMessage);
            prevState[convIndex].conversation = currentConversation;
            return [...prevState];
        });
    }

    const [currentAssociation, setCurrentAssociation] = useState<Association>(null);

    function onCurrentAssociationChange(newCurrentAssociation: Association): void {
        setCurrentAssociation(newCurrentAssociation);
    }

    async function loadUser(userId: string): Promise<User> {
        return await userCacheloadUser(userId);
    }

    return (
        <>
            <Grid item className={classes.mainContainer} md={9}>
                <ConversationPanel currentUser={currentUser} conversationPackages={conversationPackages} onNewConversation={onNewConversation} onNewMessage={onNewMessage} loadUser={loadUser} />
            </Grid>
            <Grid item className={classes.mainContainer} md={3}>
                <DataPanel currentUser={currentUser} onLogout={onLogout} currentAssociation={currentAssociation} onCurrentAssociationChange={onCurrentAssociationChange} />
            </Grid>
        </>
    )
}