import React, { useState } from "react";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { AppBar, Button, Grid, Paper, TextField, Toolbar, Typography } from "@material-ui/core";
import { Conversation } from "../../../types/conversation/conversation";
import { ConversationMenuBox } from "../../conversation/conversation_menu_box";
import { NewConversationMenuBox } from "../../conversation/new_conversation_box";
import { ConversationPackage } from "../../../types/conversation/conversation_package";


const useStyles = (makeStyles<Theme>(theme => createStyles({
    panelTopCover: {
        backgroundColor: theme.palette.primary.main,
        flexGrow: 1
    }
})));

export type ConversationSelectionPanelProps = {
    conversationPackages : ConversationPackage[];
    onNewConversation : (newConversation : Conversation) => void;
    onConversationPackageSelected : (selectedConversationPackage : ConversationPackage) => void;
}

export function ConversationSelectionPanel({conversationPackages, onNewConversation, onConversationPackageSelected}: ConversationSelectionPanelProps): JSX.Element {
    const classes = useStyles();

    return (
        <>
            <NewConversationMenuBox onNewConversation={onNewConversation} />
            {conversationPackages.map((conversationPackage, index) => (
                <ConversationMenuBox conversation={conversationPackage.conversation} onClick={() => onConversationPackageSelected(conversationPackage)} key={index} />
            ))}
            <Paper className={classes.panelTopCover} square />
        </>
    )
}