import React, { useState } from "react";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { AppBar, Button, Grid, Paper, TextField, Toolbar, Typography } from "@material-ui/core";
import { User } from "../../types/user";
import { LoginCredentials } from "../../types/login_credentials";
import { postConversationCreate } from "../../services/api/conversation/conversation_requests";
import { ConversationCreateRequest } from "../../services/api/conversation/types/conversation_create_request";
import { Conversation } from "../../types/conversation/conversation";

const useStyles = (makeStyles<Theme>(theme => createStyles({
    newConversationBox: {
        flexBasis: "200px",
        backgroundColor: theme.palette.secondary.main,
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center"
    },
})));

export type NewConversationMenuBoxProps = {
    onNewConversation: (newConversation: Conversation) => void;
}

export function NewConversationMenuBox({onNewConversation}: NewConversationMenuBoxProps): JSX.Element {
    const classes = useStyles();
    const [userId, setUserId] = useState<string>("");
    const [createConversationRequest, setCreateConversationRequest] = useState<ConversationCreateRequest>({ user_ids: [] }); 

    function handleCreateConversationChange(updates: Partial<ConversationCreateRequest>): void {
        setCreateConversationRequest((previousState : ConversationCreateRequest) => ({ ...previousState, ...updates }));
    }

    function attemptCreateConversation(): void {
        var newState : ConversationCreateRequest;

        setCreateConversationRequest((previousState : ConversationCreateRequest) => {
            previousState.user_ids.push(userId)
            newState = previousState;
            return newState;
        });

        postConversationCreate(newState).then((createConversationResponse) => {
            onNewConversation(createConversationResponse);
            setCreateConversationRequest( { user_ids: [] } );
        });
    }

    return (<Paper className={classes.newConversationBox} square>
        <TextField className={classes.loginObject} id="filled-basic" label="User Id" variant="filled" value={userId} onChange={(e) => setUserId(e.target.value)} />
        <Button variant="contained" onClick={attemptCreateConversation}>Start Conversation</Button>
    </Paper>)
}