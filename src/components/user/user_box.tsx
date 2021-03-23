import React, { useState } from "react";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { AppBar, Button, Grid, Paper, TextField, Toolbar, Typography } from "@material-ui/core";
import { User } from "../../types/user";
import { LoginCredentials } from "../../types/login_credentials";

const useStyles = (makeStyles<Theme>(theme => createStyles({
    userBox: {
        flexBasis: "200px",
        backgroundColor: theme.palette.secondary.main,
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center"
    },
})));

export type UserBoxProps = {
    user: User;
    onLogout: () => void;
}

export function UserBox({user, onLogout}: UserBoxProps): JSX.Element {
    const classes = useStyles();

    return (<Paper className={classes.userBox}>
        {user ? (
        <>
        <p> {user.firstName + " " + user.lastName} </p>
        <Button variant="contained" onClick={onLogout}>Logout</Button>
        </>
        ) : (
        <>
        </>
        )}
    </Paper>)
}