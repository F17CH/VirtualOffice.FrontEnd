import React, { useState } from "react";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { AppBar, Button, CircularProgress, Grid, Paper, TextField, Toolbar, Typography } from "@material-ui/core";
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
    },
    loginText: {
        paddingTop: "80px",
        fontWeight: 600,
        color: theme.palette.secondary.main,
        paddingBottom: "60px"
    },
    loginTextBox: {
        width: "300px",
        paddingBottom: "40px"
    },
    loginButton: {
        width: "300px",
        color: theme.palette.secondary.main,
        backgroundColor: theme.palette.primary.dark,
        borderRadius: "0px",
        '&:hover': {
            backgroundColor: theme.palette.primary.dark,
        }
    },
    loginMessage: {
        fontWeight: 400,
        color: theme.palette.secondary.main,
        paddingTop: "30px"
    },
    registerMessage: {
        fontWeight: 400,
        color: theme.palette.secondary.light,
        paddingTop: "20px",
        cursor: "pointer"
    },
    loadingDiv: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        width: "100%"
    },
    loadingSpinner: {
        color: theme.palette.secondary.light,
    }
})));

export type LoginPanelProps = {
    loginCredentials: LoginCredentials;
    onLoginCredentialsChange: (updates: Partial<LoginCredentials>) => void;
    loginMessage: string;
    attemptLogin: () => void;
    onRegisterSelect: () => void;
    loading: boolean;
}

export function LoginPanel({
    loginCredentials,
    onLoginCredentialsChange,
    loginMessage,
    attemptLogin,
    onRegisterSelect,
    loading
}: LoginPanelProps): JSX.Element {
    const classes = useStyles();

    return <div>
        <Paper square className={classes.panel}>
            {!loading ? (
                <>
                    <Typography className={classes.loginText} variant="h5">LOGIN</Typography>
                    <LoginTextBox className={classes.loginTextBox} text="Email" icon={Email} value={loginCredentials.email} onChange={(e) => onLoginCredentialsChange({ email: e.target.value })} password={false} />
                    <LoginTextBox className={classes.loginTextBox} text="Password" icon={Lock} value={loginCredentials.password} onChange={(e) => onLoginCredentialsChange({ password: e.target.value })} password={true} />
                    <Button className={classes.loginButton} onClick={attemptLogin} disableElevation={true} disableRipple={true}>LOGIN</Button>
                    <Typography className={classes.registerMessage} variant="body2" onClick={onRegisterSelect} >New User? Sign Up</Typography>
                    <Typography className={classes.loginMessage} variant="body1">{loginMessage}</Typography>
                </>
            ) : (
                <div className={classes.loadingDiv}>
                    <CircularProgress className={classes.loadingSpinner} />
                </div>
            )}
        </Paper>
    </div>;
}