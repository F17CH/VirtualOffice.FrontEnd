import React, { useEffect, useState } from "react";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { AppBar, Button, Grid, Paper, TextField, Toolbar, Typography } from "@material-ui/core";
import { getFullName, User } from "../../../types/user";
import { LoginCredentials } from "../../../types/login_credentials";
import { postConversationCreate } from "../../../services/api/conversation/conversation_requests";
import { ConversationCreateRequest } from "../../../services/api/conversation/types/conversation_create_request";
import { Conversation } from "../../../types/conversation/conversation";

import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { ConversationContainerHeader } from "./conversation_container_header";
import { getMessageGroups, MessageGroup } from "../../../types/conversation/message_group";

const useStyles = (makeStyles<Theme>(theme => createStyles({
    messageGroupDiv: {
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start"
    },
    userNameText: {
        color: theme.palette.primary.main
    },
    messageText: {
        color: theme.palette.primary.main
    }
})));

export type ConversationContainerMessageGroupProps = {
    messageGroup: MessageGroup;
    user: User;
}

export function ConversationContainerMessageGroup({ messageGroup, user }: ConversationContainerMessageGroupProps): JSX.Element {
    const classes = useStyles();

    return (
        <div className={classes.messageGroupDiv}>
            <Typography className={classes.userName}>{getFullName(user)}</Typography>
            {messageGroup.messages.map((message, index) => (
              <Typography key={index} className={classes.messageText}>{message.content}</Typography>  
            ))}
        </div>
    )
}