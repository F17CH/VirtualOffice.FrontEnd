import React, { useState } from "react";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { AppBar, Button, Grid, Paper, TextField, Toolbar, Typography } from "@material-ui/core";
import { User } from "../../types/user";
import { LoginCredentials } from "../../types/login_credentials";
import { UserBox } from "../user/user_box";
import { NewConversationMenuBox } from "../conversation/new_conversation_box";
import { Conversation } from "../../types/conversation/conversation";
import { ConversationMenuBox } from "../conversation/conversation_menu_box";
import { ConversationViewPanel } from "./sub_panels/conversation_view_panel";
import { Message } from "../../types/conversation/message";
import { Socket } from "phoenix";
import { initSocket } from "../../services/channel/socket_handler";
import { postMessageCreate } from "../../services/api/conversation/message_requests";
import { userCacheloadUser } from "../../services/users/users_cache";
import { ConversationPackage } from "../../types/conversation/conversation_package";
import { UserSelectionBox } from "../group/user_selection_box";
import { UserSelectionPanel } from "./sub_panels/user_selection_panel";
import { Association } from "../../types/group/association";

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
    selectedConversation: Conversation;
    onNewMessage: (conversation: Conversation, message: Message) => void;
    users: { [userId: string]:  User };
    onSelectedUserChange: (newSelectedUser: User) => void;
    selectedAssociation: Association;
}

export function ConversationPanel({ currentUser, selectedConversation, onNewMessage, users, onSelectedUserChange, selectedAssociation }: ConversationPanelProps): JSX.Element {
    const classes = useStyles();

    function onNewMessageContent(selectedConversation: Conversation, messageContent: string) : void {
        var newMessage: Message = { id: null, userId: currentUser.id, content: messageContent };

        postMessageCreate(selectedConversation.id, newMessage).then(message => {
            onNewMessage(selectedConversation, message);
        })
    }

    return (
        <>
            <Grid container className={classes.panelGridContainer}>
                <Grid item container className={classes.panelGridItem} md={3}>
                    <UserSelectionPanel currentUser={currentUser} selectedAssociation={selectedAssociation} users={users} onSelectedUserChange={onSelectedUserChange}  />
                </Grid>
                <Grid item container className={classes.panelGridItem} md={9}>
                    <ConversationViewPanel selectedConversation={selectedConversation} onNewMessageContent={(messageContent: string) => onNewMessageContent(selectedConversation, messageContent)} users={users} />
                </Grid>
            </Grid>
        </>
    )
}
