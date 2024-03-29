import React, { useState } from "react";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { AppBar, Button, Grid, Paper, TextField, Toolbar, Typography } from "@material-ui/core";
import { User } from "../../types/user";
import { LoginCredentials } from "../../types/login_credentials";
import { postConversationCreate } from "../../services/api/conversation/conversation_requests";
import { ConversationCreateRequest } from "../../services/api/conversation/types/conversation_create_request";
import { Conversation } from "../../types/conversation/conversation";

const useStyles = (makeStyles<Theme>(theme => createStyles({
    userSelectionBox: {
        flexBasis: "40px",
        backgroundColor: theme.palette.secondary.main,
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center"
    },
})));

export type UserSelectionBoxProps = {
    user: User;
    onClick: () => void;
}

export function UserSelectionBox({user, onClick}: UserSelectionBoxProps): JSX.Element {
    const classes = useStyles();

    return (<Paper className={classes.newConversationBox} square onClick={onClick}>
        <p> {user.firstName} {user.lastName} </p>
    </Paper>)
}