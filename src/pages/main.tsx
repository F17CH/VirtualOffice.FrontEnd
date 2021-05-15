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
import { IndividualConversation } from "../types/conversation/individual_conversation";
import { Message } from "../types/conversation/message";
import { Association } from "../types/group/association";
import { LoginCredentials } from "../types/login_credentials";
import { SessionUser } from "../types/session_user";
import { User } from "../types/user";

const useStyles = (makeStyles<Theme>(theme => createStyles({
    mainContainer: {
        flexDirection: "column",
        height: "100%",
        zIndex: 1,
    },
})));

export type MainProps = {
    sessionUser: SessionUser;
    onLogout: () => void;
}

export function Main({ sessionUser, onLogout }: MainProps): JSX.Element {
    const classes = useStyles();

    const [currentUser, setCurrentUser] = useState<User>(null);
    const [users, setUsers] = useState<{ [userId: string]: User }>({});

    const [associations, setAssociations] = useState<{ [associationId: string]: Association }>({});
    const [selectedAssociation, setSelectedAssociation] = useState<Association>(null);

    const [individualConversations, setIndividualConversations] = useState<{ [userId: string]: IndividualConversation }>({});
    const [selectedConversation, setSelectedConversation] = useState<Conversation>(null);

    useEffect(function (): void {
        (async function (): Promise<void> {
            userInit();
        })();
    }, [sessionUser]);

    function userInit(): void {
        var newCurrentUser: User = sessionUser;
        setCurrentUser(newCurrentUser);

        loadAssociations(sessionUser.associations);
        setIndividualConversations(sessionUser.individualConversations)

        initSocket();
        userChannelInit();
    }

    function userChannelInit(): void {
        var userChannel = newUserChannel(sessionUser.id);

        userChannel.on("conversation_new", async (response) => {
            var newConversation: Conversation = response.data;
            onNewConversation(newConversation);
        })

        joinChannel(userChannel);
    }

    function loadAssociations(newAssociations: Association[]): void {
        var newUsers : User[] = [];

        setAssociations((prevState) => {
            newAssociations.map((association, _) => {
                association.members.map((member, _) => {
                    newUsers.push(member.user);
                });
                prevState[association.id] = association;
            });

            loadUsers(newUsers);

            return { ...prevState }
        });
    }

    function loadUsers(newUsers: User[]): void {
        setUsers((prevState) => {
            newUsers.map((user, _) => {
                prevState[user.id] = user;
            });

            return { ...prevState }
        });
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



    function onSelectedAssociationChange(newSelectedAssociation: Association): void {
        setSelectedAssociation(newSelectedAssociation);
    }

    //async function loadUser(userId: string): Promise<User> {
    //   return await userCacheloadUser(userId);
    //}

    return (
        <>
            <Grid item className={classes.mainContainer} md={9}>
                <ConversationPanel currentUser={currentUser} conversationPackages={conversationPackages} onNewConversation={onNewConversation} onNewMessage={onNewMessage} loadUser={null} selectedAssociation={selectedAssociation} users={users} />
            </Grid>
            <Grid item className={classes.mainContainer} md={3}>
                <DataPanel currentUser={currentUser} users={users} onLogout={onLogout} associations={associations} selectedAssociation={selectedAssociation} onSelectedAssociationChange={onSelectedAssociationChange} />
            </Grid>
        </>
    )
}