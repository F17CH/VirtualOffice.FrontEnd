import React, { useState } from "react";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { AppBar, Button, Grid, MenuItem, Paper, Select, TextField, Toolbar, Typography } from "@material-ui/core";
import { User } from "../../../types/user";

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

export type SettingsPageProps = {
    user: User;
    onLogout: () => void;
}

export function SettingsPage({user, onLogout}: SettingsPageProps): JSX.Element {
    const classes = useStyles();

    return (<Paper className={classes.userBox} square>
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