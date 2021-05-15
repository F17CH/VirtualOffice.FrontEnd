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
import { joinChannel, newChannel, sayHello } from "../../services/channel/channel_handler";
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
    conversationPackages: ConversationPackage[];
    onNewConversation: (conversation: Conversation) => void;
    onNewMessage: (conversation: Conversation, message: Message) => void;
    loadUser: (userId: string) => Promise<User>;
    users: { [userId: string]:  User };
    selectedAssociation: Association;
}

export function ConversationPanel({ currentUser, conversationPackages, onNewConversation, onNewMessage, loadUser, users, selectedAssociation }: ConversationPanelProps): JSX.Element {
    const classes = useStyles();
    const [selectedConversationPackage, setSelectedConversationPackage] = useState<ConversationPackage>();

    function onConversationPackageSelected(selectedConversationPackage: ConversationPackage): void {
        setSelectedConversationPackage(selectedConversationPackage);
    }

    function onNewMessageContent(selectedConversationPackage: ConversationPackage, messageContent: string) : void {
        var newMessage: Message = { id: null, user_id: currentUser.id, content: messageContent };

        postMessageCreate(selectedConversationPackage.conversation.id, newMessage).then(message => {
            onNewMessage(selectedConversationPackage.conversation, message);
        })
    }

    return (
        <>
            <Grid container className={classes.panelGridContainer}>
                <Grid item container className={classes.panelGridItem} md={3}>
                    <UserSelectionPanel currentUser={currentUser} selectedAssociation={selectedAssociation} users={users}  />
                </Grid>
                <Grid item container className={classes.panelGridItem} md={9}>
                    <ConversationViewPanel conversationPackage={selectedConversationPackage} onNewMessageContent={(messageContent: string) => onNewMessageContent(selectedConversationPackage, messageContent)} />
                </Grid>
            </Grid>
        </>
    )
}
