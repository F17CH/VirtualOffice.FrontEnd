import React, { useEffect, useState } from "react";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { AppBar, Button, Divider, Grid, MenuItem, Paper, Select, TextField, Toolbar, Typography } from "@material-ui/core";
import { User } from "../../../types/user";
import { SettingsGroup } from "../../setting/settings_group";
import { SettingsDivider } from "../../setting/settings_divider";
import Scrollbars from "react-custom-scrollbars";
import { Conversation } from "../../../types/conversation/conversation";
import { ConversationMenuBox } from "../../conversation/conversation_menu_box";
import { ConversationMenuBoxDivider } from "../../conversation/conversation_menu_box_divider";
import { ConversationContainer } from "../../conversation/conversation_container/conversation_container";
import { Message } from "../../../types/conversation/message";

const useStyles = (makeStyles<Theme>(theme => createStyles({
    conversationPage: {
        height: "100%",
        width: "100%",
        display: "flex",
        justifyContent: "flex-start",
        flexDirection: "row",
    },
    conversationsMenu: {
        width: "300px",
        backgroundColor: theme.palette.secondary.main,
        display: "flex",
        justifyContent: "flex-start",
        flexDirection: "column",
        alignItems: "center",
    },
    verticalLine: {
        margin: 0,
        padding: 0,
        borderWidth: "1px",
        borderColor: theme.palette.secondary.dark,
    },
    conversationPanel: {
        flexGrow: 1,
    },
})));

export type ConversationsPageProps = {
    currentUser: User;
    users: { [userId: string]: User };
    conversations: { [userId: string]: Conversation };
    onNewMessage: (conversation: Conversation, message: Message) => void;
}

export function ConversationsPage({ currentUser, users, conversations, onNewMessage }: ConversationsPageProps): JSX.Element {
    const classes = useStyles();
    const [selectedConversation, setSelectedConversation] = useState<Conversation>(null);

    useEffect(function (): void {
        if (selectedConversation) {
            console.log("CHANGE")
            setSelectedConversation(prevState => conversations[prevState.individualRecipientUser.id])
        }
    }, [conversations]);

    return <div className={classes.conversationPage}>
        <Paper square className={classes.conversationsMenu}>
            {Object.keys(conversations).map(userId => (
                <React.Fragment key={userId}>
                    <ConversationMenuBox conversation={conversations[userId]} user={users[userId]} onClick={() => setSelectedConversation(conversations[userId])} />
                    <ConversationMenuBoxDivider />
                </React.Fragment>
            ))}
        </Paper>
        <hr  className={classes.verticalLine} />
        <div className={classes.conversationPanel}>
            <ConversationContainer conversation={selectedConversation} currentUser={currentUser} users={users} onNewMessage={onNewMessage} />
        </div>
    </div>
}