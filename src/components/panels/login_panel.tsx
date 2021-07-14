import React, { useState } from "react";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { AppBar, Button, Grid, Paper, TextField, Toolbar, Typography } from "@material-ui/core";
import { User } from "../../types/user";
import { LoginCredentials } from "../../types/login_credentials";
import { LoginTextBox } from "../login/login_textbox";
import { Email, Lock } from "@material-ui/icons";

const useStyles = (makeStyles<Theme>(theme => createStyles({
    panel: {
        backgroundColor: theme.palette.primary.main,
        height: "600px",
        width: "500px",
        display: "flex",
        justifyContent: "flex-start",
        flexDirection: "column",
        alignItems: "center",
        boxSizing: "border-box",
        paddingTop: "80px"
    },
    loginText: {
        fontWeight: 600,
        color: theme.palette.secondary.light,
        paddingBottom: "60px"
    },
    loginTextBox: {
        width: "300px",
        paddingBottom: "40px"
    },
    loginButton: {
        width: "300px",
        color: theme.palette.secondary.light,
        backgroundColor: theme.palette.primary.dark,
        borderRadius: "0px",
        '&:hover': {
            backgroundColor: theme.palette.primary.dark,
        }
    },
    loginMessage: {
        fontWeight: 400,
        color: theme.palette.secondary.light,
        paddingTop: "20px"
    }
})));

export type LoginPanelProps = {
    loginCredentials: LoginCredentials;
    onLoginCredentialsChange: (updates: Partial<LoginCredentials>) => void;
    loginMessage: string;
    attemptLogin: () => void;
}

export function LoginPanel({
    loginCredentials,
    onLoginCredentialsChange,
    loginMessage,
    attemptLogin
}: LoginPanelProps): JSX.Element {
    const classes = useStyles();

    return <div>
        <Paper square className={classes.panel}>
            <Typography className={classes.loginText} variant="h5">LOGIN</Typography>
            <LoginTextBox className={classes.loginTextBox} text="Email" icon={Email} value={loginCredentials.email} onChange={(e) => onLoginCredentialsChange({ email: e.target.value })} password={false} />
            <LoginTextBox className={classes.loginTextBox} text="Password" icon={Lock} value={loginCredentials.password} onChange={(e) => onLoginCredentialsChange({ password: e.target.value })} password={true} />
            <Button className={classes.loginButton} onClick={attemptLogin} disableElevation={true} disableRipple={true}>LOGIN</Button>
            <Typography className={classes.loginMessage} variant="body2">{loginMessage}</Typography>
        </Paper>
    </div>;
}