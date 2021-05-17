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
    const [selectedUser, setSelectedUser] = useState<User>(null);

    const [associations, setAssociations] = useState<{ [associationId: string]: Association }>({});
    const [selectedAssociation, setSelectedAssociation] = useState<Association>(null);

    const [conversations, setConversations] = useState<{ [conversationId: string]: Conversation }>({});
    const [individualConversations, setIndividualConversations] = useState<{ [userId: string]: Conversation }>({});
    const [selectedConversation, setSelectedConversation] = useState<Conversation>(null);

    useEffect(function (): void {
        (async function (): Promise<void> {
            userInit();
        })();
    }, [sessionUser]);

    function userInit(): void {
        var newCurrentUser: User = sessionUser;
        setCurrentUser(newCurrentUser);

        initSocket();
        userChannelInit();

        loadUsers([newCurrentUser]);
        loadAssociations(sessionUser.associations, newCurrentUser);
        loadConversations(sessionUser.individualConversations, newCurrentUser)
    }

    function userChannelInit(): void {
        var userChannel = newUserChannel(sessionUser.id);

        userChannel.on("conversation_new", async (response) => {
            var newConversation: Conversation = response.data;
            //onNewConversation(newConversation);
        })

        joinChannel(userChannel);
    }

    function loadAssociations(newAssociations: Association[], currentUser: User): void {
        var newUsers: User[] = [];

        setAssociations((prevState) => {
            newAssociations.map((association, _) => {
                association.members.map((member, _) => {
                    if (member.user.id != currentUser.id) {
                        newUsers.push(member.user);
                    }
                });
                prevState[association.id] = association;
            });

            loadUsers(newUsers);

            return { ...prevState }
        });
    }

    function loadConversations(newIndividualConversations: Conversation[], currentUser: User): void {
        var newUsers: User[] = [];

        setIndividualConversations((prevState) => {
            newIndividualConversations.map((conversation, _) => {
                var recipientUser: User = null;
                conversation.users.map((user, _) => {
                    if (user.id != currentUser.id) {
                        recipientUser = user;
                        newUsers.push(user);
                    }
                });
                if (recipientUser) {
                    prevState[recipientUser.id] = conversation;
                }
            });

            loadUsers(newUsers);

            return { ...prevState }
        });

        setConversations((prevState) => {
            newIndividualConversations.map((conversation, _) => {
                prevState[conversation.id] = conversation;
            });

            return { ...prevState }
        });

        newIndividualConversations.map((conversation, _) => {
            initConversation(conversation, currentUser);
        });
    }

     function initConversation(newConversation: Conversation, currentUser: User): void {
        newConversationChannel(newConversation, currentUser, onNewMessage)
    }

    function loadUsers(newUsers: User[]): void {
        setUsers((prevState) => {
            newUsers.map((user, _) => {
                prevState[user.id] = user;
            });

            return { ...prevState }
        });
    }

    function onNewMessage(currentConversation: Conversation, newMessage: Message): void {
        setConversations((prevState) => {
            currentConversation.messages.push(newMessage);
            prevState[currentConversation.id] = currentConversation;
            return { ...prevState }
        });
    }

    function onSelectedAssociationChange(newSelectedAssociation: Association): void {
        setSelectedAssociation(newSelectedAssociation);
    }

    function onSelectedUserChange(newSelectedUser: User): void {
        setSelectedUser(newSelectedUser);
        setSelectedConversation(individualConversations[newSelectedUser.id])
    }

    return (
        <>
            <Grid item className={classes.mainContainer} md={9}>
                <ConversationPanel currentUser={currentUser} selectedConversation={selectedConversation} onNewMessage={onNewMessage} users={users} onSelectedUserChange={onSelectedUserChange} selectedAssociation={selectedAssociation} />
            </Grid>
            <Grid item className={classes.mainContainer} md={3}>
                <DataPanel currentUser={currentUser} users={users} onLogout={onLogout} associations={associations} selectedAssociation={selectedAssociation} onSelectedAssociationChange={onSelectedAssociationChange} />
            </Grid>
        </>
    )
}