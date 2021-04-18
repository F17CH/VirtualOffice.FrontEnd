import React, { useState } from "react";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { AppBar, Button, Grid, Paper, TextField, Toolbar, Typography } from "@material-ui/core";
import { Conversation } from "../../../types/conversation/conversation";
import { ConversationMenuBox } from "../../conversation/conversation_menu_box";
import { NewConversationMenuBox } from "../../conversation/new_conversation_box";


const useStyles = (makeStyles<Theme>(theme => createStyles({
    panelTopCover: {
        backgroundColor: theme.palette.primary.main,
        flexGrow: 1
    }
})));

export type ConversationSelectionPanelProps = {
    conversations : Conversation[];
    onNewConversation : (newConversation : Conversation) => void;
    onConversationSelected : (selectedConversation : Conversation) => void;
}

export function ConversationSelectionPanel({conversations, onNewConversation, onConversationSelected}: ConversationSelectionPanelProps): JSX.Element {
    const classes = useStyles();

    return (
        <>
            <NewConversationMenuBox onNewConversation={onNewConversation} />
            {conversations.map((conversation, index) => (
                <ConversationMenuBox conversation={conversation} onClick={() => onConversationSelected(conversation)} />
            ))}
            <Paper className={classes.panelTopCover} square />
        </>
    )
}