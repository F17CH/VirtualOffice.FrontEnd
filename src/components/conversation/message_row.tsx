import React, { useState } from "react";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { AppBar, Button, Grid, Paper, TextField, Toolbar, Typography } from "@material-ui/core";
import { User } from "../../types/user";
import { LoginCredentials } from "../../types/login_credentials";
import { postConversationCreate } from "../../services/api/conversation/conversation_requests";
import { ConversationCreateRequest } from "../../services/api/conversation/types/conversation_create_request";
import { Conversation } from "../../types/conversation/conversation";
import { Message } from "../../types/conversation/message";

const useStyles = (makeStyles<Theme>(theme => createStyles({})));

export type MessageRowProps = {
    message: Message;
    user: User;
}

export function MessageRow({ message, user }: MessageRowProps): JSX.Element {
    const classes = useStyles();

    return (
        <>
        <Typography variant="body1">
            {user ? user.firstName : "NULL USER"} : {message.content}
        </Typography>
        </>
    )
}