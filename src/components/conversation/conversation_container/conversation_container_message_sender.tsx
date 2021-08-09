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
    messageSender: {

    }
})));

export type ConversationContainerMessageSenderProps = {
    onNewMessageContent: (newMessageContent: string) => void;
}

export function ConversationContainerMessageSender({ onNewMessageContent }: ConversationContainerMessageSenderProps): JSX.Element {
    const classes = useStyles();
    const [newMessageContent, setNewMessageContent] = useState<string>("");

    function onSubmitMessageContent(newMessageContent: string) {
        if (newMessageContent) {
            onNewMessageContent(newMessageContent);
            setNewMessageContent("");
        }
    }

    return (
        <>
            <TextField className={classes.inputBox} id="filled-basic" label="Message" variant="filled" value={newMessageContent} onChange={(e) => setNewMessageContent(e.target.value)} />
            <Button onClick={() => onSubmitMessageContent(newMessageContent)}> Submit</Button>
        </>
    )
}