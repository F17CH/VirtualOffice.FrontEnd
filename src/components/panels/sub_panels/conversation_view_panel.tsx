import React, { useState } from "react";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { AppBar, Button, Grid, Paper, TextField, Toolbar, Typography } from "@material-ui/core";
import { Conversation } from "../../../types/conversation/conversation";
import { ConversationMenuBox } from "../../conversation/conversation_menu_box";
import { NewConversationMenuBox } from "../../conversation/new_conversation_box";
import { MessageInput } from "../../conversation/message_input";
import { MessageRow } from "../../conversation/message_row";
import { User } from "../../../types/user";
import { Message } from "../../../types/conversation/message";


const useStyles = (makeStyles<Theme>(theme => createStyles({
    backPanel: {
        flexGrow: 1,
        backgroundColor: theme.palette.primary.main,
        padding: "20px"
    },
    conversationPanel: {
        flexGrow: 1,
        backgroundColor: theme.palette.secondary.main,
        height: "100%"
    }
})));

export type ConversationViewPanelProps = {
    conversation: Conversation
    loadUser: (userId: string) => User;
    onNewMessageContent: (messageContent: string) => void
}

export function ConversationViewPanel({ conversation, loadUser, onNewMessageContent }: ConversationViewPanelProps): JSX.Element {
    const classes = useStyles();

    return (
        <>
            <Grid container className={classes.backPanel}>
                <Paper className={classes.conversationPanel} square>
                    {conversation ? (
                        <>
                            <Typography>{conversation.id}</Typography>
                            <>
                                {conversation.messages.map((message, index) => (
                                    <MessageRow message={message} user={loadUser(message.user_id)} key={message.id} />
                                ))}
                            </>
                            <MessageInput onNewMessageContent={onNewMessageContent} />
                        </>
                    ) : (
                        <h1>NO CONVERSATION SELECTED</h1>
                    )}

                </Paper>
            </Grid>
        </>
    )
}