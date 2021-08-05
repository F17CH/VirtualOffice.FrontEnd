import React, { useState } from "react";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { AppBar, Button, Grid, Paper, TextField, Toolbar, Typography } from "@material-ui/core";
import { User } from "../../../types/user";
import { LoginCredentials } from "../../../types/login_credentials";
import { postConversationCreate } from "../../../services/api/conversation/conversation_requests";
import { ConversationCreateRequest } from "../../../services/api/conversation/types/conversation_create_request";
import { Conversation } from "../../../types/conversation/conversation";

import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { ConversationContainerHeader } from "./conversation_container_header";

const useStyles = (makeStyles<Theme>(theme => createStyles({
    conversationMenu: {
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent:"flex-start"
    },
    conversationPaper: {
        flexGrow: 1,
        backgroundColor: theme.palette.secondary.light
    }
})));

export type ConversationContainerProps = {
    conversation: Conversation;
    currentUser: User;
    recipientUser?: User;
}

export function ConversationContainer({ conversation, currentUser }: ConversationContainerProps): JSX.Element {
    const classes = useStyles();
    const [itemHover, setItemHover] = useState<boolean>(false);

    return (
        <>
            {conversation ? (
                <div className={classes.conversationMenu}>
                    <ConversationContainerHeader conversation={conversation} currentUser={currentUser} />
                    <Paper square className={classes.conversationPaper}>

                    </Paper>
                </div>
            ) : (
                <div>

                </div>
            )}
        </>
    )
}