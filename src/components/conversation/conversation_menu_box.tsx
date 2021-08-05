import React, { useState } from "react";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { AppBar, Button, Grid, Paper, TextField, Toolbar, Typography } from "@material-ui/core";
import { getFullName, User } from "../../types/user";
import { LoginCredentials } from "../../types/login_credentials";
import { postConversationCreate } from "../../services/api/conversation/conversation_requests";
import { ConversationCreateRequest } from "../../services/api/conversation/types/conversation_create_request";
import { Conversation } from "../../types/conversation/conversation";

import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const useStyles = (makeStyles<Theme>(theme => createStyles({
    conversationMenuItem: {
        width: "100%",
        height: "60px",
    },
    conversationMenuBox: {
        width: "100%",
        height: "100%",
        backgroundColor: theme.palette.secondary.main,
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        cursor: "pointer"
    },
    conversationMenuBoxHover: {
        width: "100%",
        height: "100%",
        backgroundColor: theme.palette.secondary.light,
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        cursor: "pointer"
    },
    icon: {
        color: theme.palette.primary.main,
        height: "40px",
        width: "40px",
        paddingLeft: "10px",
        paddingRight: "10px"
    },
    nameText: {
        userSelect: "none",
        color: theme.palette.primary.main,
    }
})));

export type ConversationMenuBoxProps = {
    conversation: Conversation;
    user: User;
    onClick: () => void;
}

export function ConversationMenuBox({ conversation, user, onClick }: ConversationMenuBoxProps): JSX.Element {
    const classes = useStyles();
    const [itemHover, setItemHover] = useState<boolean>(false);

    return (
        <div className={classes.conversationMenuItem}>
            <Paper className={itemHover ? classes.conversationMenuBoxHover : classes.conversationMenuBox} square elevation={0} onClick={onClick} onMouseOver={() => setItemHover(true)} onMouseOut={() => setItemHover(false)} >
                <AccountCircleIcon className={classes.icon} />
                <Typography className={classes.nameText}> {conversation.individual ? getFullName(conversation.individualRecipientUser) : "Group Conversation"} </Typography>
            </Paper>
        </div>
    )
}