import React, { useState } from "react";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { AppBar, Button, Grid, Paper, TextField, Toolbar, Typography } from "@material-ui/core";
import { User } from "../types/user";
import { LoginCredentials } from "../types/login_credentials";

const useStyles = (makeStyles<Theme>(theme => createStyles({
    box: {
        backgroundColor: theme.palette.secondary.main,
        height: "600px",
        width: "600px",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center"
    },
    loginObject: {
        height: "60px",
        width: "60%",
    }
})));

export type LoginBoxProps = {
    loginCredentials: LoginCredentials;
    onLoginCredentialsChange: (updates : Partial<LoginCredentials>) => void;
    loginMessage: string;
    attemptLogin: () => void;
}

export function LoginBox({
    loginCredentials,
    onLoginCredentialsChange,
    loginMessage,
    attemptLogin
}: LoginBoxProps): JSX.Element {
    const classes = useStyles();

    return <div>
        <Paper className={classes.box} variant="outlined">
            <TextField className={classes.loginObject} id="filled-basic" label="Username" variant="filled" value={loginCredentials.email} onChange={(e) => onLoginCredentialsChange({ email: e.target.value })} />
            <TextField className={classes.loginObject} id="filled-basic" label="Password" variant="filled" value={loginCredentials.password} onChange={(e) => onLoginCredentialsChange({ password: e.target.value })} />
            <Button className={classes.loginObject} variant="contained" onClick={attemptLogin}>Login</Button>
            <p>{loginMessage}</p>
        </Paper>
    </div>;
}