import React, { useState } from "react";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { AppBar, Button, Divider, Grid, MenuItem, Paper, Select, TextField, Toolbar, Typography } from "@material-ui/core";
import { User } from "../../../types/user";
import { SettingsGroup } from "../../setting/settings_group";
import { SettingsDivider } from "../../setting/settings_divider";
import Scrollbars from "react-custom-scrollbars";
import { Conversation } from "../../../types/conversation/conversation";
import { ConversationMenuBox } from "../../conversation/conversation_menu_box";
import { ConversationMenuBoxDivider } from "../../conversation/conversation_menu_box_divider";

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
    conversationPanel: {
        flexGrow: 1,
        backgroundColor: theme.palette.secondary.light
    },
})));

export type ConversationsPageProps = {
    currentUser: User;
    users: { [userId: string]: User };
    conversations: { [userId: string]: Conversation };
}

export function ConversationsPage({ currentUser, users, conversations }: ConversationsPageProps): JSX.Element {
    const classes = useStyles();

    return <div className={classes.conversationPage}>
        <Paper square className={classes.conversationsMenu}>
            {Object.keys(conversations).map(userId => (
                <>
                    <ConversationMenuBox conversation={conversations[userId]} user={users[userId]} onClick={null} />
                    <ConversationMenuBoxDivider />
                </>
            ))}
        </Paper>
        <Paper square className={classes.conversationPanel}>

        </Paper>
    </div>
}