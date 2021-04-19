import React, { useState } from "react";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { AppBar, Button, Grid, Paper, TextField, Toolbar, Typography } from "@material-ui/core";
import { User } from "../../types/user";
import { LoginCredentials } from "../../types/login_credentials";
import { UserBox } from "../user/user_box";
import { NewConversationMenuBox } from "../conversation/new_conversation_box";
import { Conversation } from "../../types/conversation/conversation";
import { ConversationMenuBox } from "../conversation/conversation_menu_box";
import { ConversationSelectionPanel } from "./sub_panels/conversation_selection_panel";
import { ConversationViewPanel } from "./sub_panels/conversation_view_panel";
import { Message } from "../../types/conversation/message";
import { Socket } from "phoenix";
import { joinChannel, newChannel, sayHello } from "../../services/channel/channel_handler";
import { initSocket } from "../../services/channel/socket_handler";

const useStyles = (makeStyles<Theme>(theme => createStyles({
    panelGridContainer: {
        height: "100%",
        flexDirection: "row"
    },
    panelGridItem: {
        height: "100%",
        flexDirection: "column"
    },
    panelCover: {
        backgroundColor: theme.palette.primary.main,
        flexGrow: 1
    }
})));

export type ConversationPanelProps = {
    currentUser: User;
    conversations: Conversation[];
    onNewConversation: (conversation: Conversation) => void;
    onNewMessage: (conversation: Conversation, messageContent: string) => void;
    loadUser: (userId: string) => User;
}

export function ConversationPanel({ currentUser, conversations, onNewConversation, onNewMessage, loadUser }: ConversationPanelProps): JSX.Element {
    const classes = useStyles();
    const [selectedConversation, setSelectedConversation] = useState<Conversation>();

    function getConversationUsers(conversation: Conversation): { [id: string]: User } {
        var users: { [id: string]: User } = {};

        if (conversation) {
            conversation.user_ids.map((userId) => {
                if (userId == currentUser.id) {
                    users[currentUser.id] = currentUser;
                }
                else {
                    users[userId] == loadUser(userId);
                }
            });
        }

        if (conversation) {
            users[currentUser.id] = currentUser;
        }

        return users;
    }

    function onConversationSelected(selectedConversation: Conversation): void {
        setSelectedConversation(selectedConversation);
    }

    return (
        <>
            <Grid container className={classes.panelGridContainer}>
                <Grid item container className={classes.panelGridItem} md={3}>
                    <ConversationSelectionPanel conversations={conversations} onNewConversation={onNewConversation} onConversationSelected={onConversationSelected} />
                </Grid>
                <Grid item container className={classes.panelGridItem} md={9}>
                    <ConversationViewPanel conversation={selectedConversation} users={getConversationUsers(selectedConversation)} onNewMessageContent={(messageContent: string) => onNewMessage(selectedConversation, messageContent)} />
                </Grid>
            </Grid>
        </>
    )
}
