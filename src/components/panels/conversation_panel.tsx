import React, { useState } from "react";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { AppBar, Button, Grid, Paper, TextField, Toolbar, Typography } from "@material-ui/core";
import { User } from "../../types/user";
import { LoginCredentials } from "../../types/login_credentials";
import { UserBox } from "../user/user_box";
import { NewConversationMenuBox } from "../conversation/new_conversation_box";
import { Conversation } from "../../types/conversation/conversation";
import { ConversationMenuBox } from "../conversation/conversation_menu_box";
import { ConversationSelectionPanel } from "./sub_panels/conversation_selection_panel";
import { ConversationViewPanel } from "./sub_panels/conversation_view_panel";

const useStyles = (makeStyles<Theme>(theme => createStyles({
    panelGridContainer: {
        height: "100%",
        flexDirection: "row"
    },
    panelGridItem: {
        height: "100%",
        flexDirection: "column"
    },
    panelCover: {
        flexGrow: 1
    }
})));

export type ConversationPanelProps = {
}

export function ConversationPanel({ }: ConversationPanelProps): JSX.Element {
    const classes = useStyles();
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [selectedConversation, setSelectedConversation] = useState<Conversation>();

    function onNewConversation(newConversation: Conversation): void {
        setConversations((prevState: Conversation[]) => [...prevState, newConversation]);
    }

    function onConversationSelected(selectedConversation: Conversation): void {
        setSelectedConversation(selectedConversation);
    }

    return (
        <>
            <Grid container className={classes.panelGridContainer}>
                <Grid item container className={classes.panelGridItem} md={3}>
                    <ConversationSelectionPanel conversations={conversations} onNewConversation={onNewConversation} onConversationSelected={onConversationSelected} />
                </Grid>
                <Grid item container className={classes.panelGridItem} md={9}>
                    <ConversationViewPanel conversation={selectedConversation} />
                </Grid>
            </Grid>
        </>
    )
}