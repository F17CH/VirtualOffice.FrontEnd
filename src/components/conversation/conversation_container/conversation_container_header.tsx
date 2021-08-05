import React, { useState } from "react";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { AppBar, Button, Grid, Paper, TextField, Toolbar, Typography } from "@material-ui/core";
import { getFullName, User } from "../../../types/user";
import { LoginCredentials } from "../../../types/login_credentials";
import { postConversationCreate } from "../../../services/api/conversation/conversation_requests";
import { ConversationCreateRequest } from "../../../services/api/conversation/types/conversation_create_request";
import { Conversation } from "../../../types/conversation/conversation";

import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const useStyles = (makeStyles<Theme>(theme => createStyles({
    conversationHeader: {
        width: "100%",
        height: "60px",
        backgroundColor: theme.palette.secondary.main,
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center"
    },
    conversationText: {
        userSelect: "none",
        color: theme.palette.primary.main,
        paddingLeft: "20px"
    }
})));

export type ConversationContainerHeaderProps = {
    conversation: Conversation;
    currentUser: User;
}

export function ConversationContainerHeader({ conversation, currentUser }: ConversationContainerHeaderProps): JSX.Element {
    const classes = useStyles();

    return (
        <Paper square elevation={0} className={classes.conversationHeader}>
            <Typography className={classes.conversationText}>{conversation.individual ? getFullName(conversation.individualRecipientUser) : "Group Conversation"}</Typography>
        </Paper>
    )
}