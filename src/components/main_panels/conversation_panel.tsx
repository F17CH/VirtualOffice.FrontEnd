import React, { useState } from "react";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { AppBar, Button, Grid, Paper, TextField, Toolbar, Typography } from "@material-ui/core";
import { User } from "../../types/user";
import { LoginCredentials } from "../../types/login_credentials";
import { UserBox } from "../user/user_box";
import { NewConversationBox } from "../conversation/new_conversation_box";
import { Conversation } from "../../types/conversation/conversation";
import { ConversationBox } from "../conversation/conversation_box";

const useStyles = (makeStyles<Theme>(theme => createStyles({
    panelBack: {
        padding: theme.spacing(0),
        textAlign: 'center',
        backgroundColor: theme.palette.secondary.main,
        height: "100%"
    },
    panelGridMain: {
        height: "100%",
        flexDirection: "column"
    },
    panelTopCover: {
        flexGrow: 1
    }
})));

export type ConversationPanelProps = {
}

export function ConversationPanel({ }: ConversationPanelProps): JSX.Element {
    const classes = useStyles();
    const [conversations, setConversations] = useState<Conversation[]>([]);


    function onNewConversation(conversationId: string): void {
        var newConversation: Conversation = { id: conversationId };

        setConversations((prevState: Conversation[]) => [...prevState, newConversation]);
    }

    return (
        <Paper className={classes.panelBack} square>
            <Grid container className={classes.panelGridMain}>
                <NewConversationBox onNewConversation={onNewConversation} />
                {conversations.map((conversation, index) => (
                    <ConversationBox conversation={conversation} />
                ))}
                <Paper className={classes.panelTopCover} square />
            </Grid>
        </Paper>
    )
}