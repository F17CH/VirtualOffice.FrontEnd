import React, { useState } from "react";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { AppBar, Button, Grid, Paper, TextField, Toolbar, Typography } from "@material-ui/core";
import { Conversation } from "../../../types/conversation/conversation";
import { ConversationMenuBox } from "../../conversation/conversation_menu_box";
import { NewConversationMenuBox } from "../../conversation/new_conversation_box";


const useStyles = (makeStyles<Theme>(theme => createStyles({
    panelTopCover: {
        flexGrow: 1
    }
})));

export type ConversationViewPanelProps = {
    conversation: Conversation
}

export function ConversationViewPanel({ conversation }: ConversationViewPanelProps): JSX.Element {
    const classes = useStyles();

    return (
        <>
            <Paper className={classes.panelTopCover} square>
                {conversation ? (
                    <h1>{conversation.id}</h1>
                ) : (
                    <h1>NO CONVERSATION SELECTED</h1>
                )}
            </Paper>
        </>
    )
}