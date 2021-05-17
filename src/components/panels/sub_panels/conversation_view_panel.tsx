import React, { useEffect, useState } from "react";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { AppBar, Button, Grid, Paper, TextField, Toolbar, Typography } from "@material-ui/core";
import { Conversation } from "../../../types/conversation/conversation";
import { ConversationMenuBox } from "../../conversation/conversation_menu_box";
import { NewConversationMenuBox } from "../../conversation/new_conversation_box";
import { MessageInput } from "../../conversation/message_input";
import { MessageRow } from "../../conversation/message_row";
import { User } from "../../../types/user";
import { Message } from "../../../types/conversation/message";
import { userCacheloadUser } from "../../../services/users/users_cache";
import { ConversationPackage } from "../../../types/conversation/conversation_package";


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
    selectedConversation: Conversation
    onNewMessageContent: (messageContent: string) => void
    users: { [userId: string]:  User };
}

export function ConversationViewPanel({ selectedConversation, onNewMessageContent, users }: ConversationViewPanelProps): JSX.Element {
    const classes = useStyles();

    return (
        <>
            <Grid container className={classes.backPanel}>
                <Paper className={classes.conversationPanel} square>
                    {selectedConversation ? (
                        <>
                            <Typography>{selectedConversation.id}</Typography>
                            <>
                                {selectedConversation.messages.map((message, index) => (
                                    <MessageRow message={message} user={users[message.userId]} key={message.id} />
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