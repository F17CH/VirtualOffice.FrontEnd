import { createStyles, Grid, makeStyles, Paper, Theme } from "@material-ui/core";
import React, { useState } from "react";
import { postAttemptLogin } from "../api/login_api";
import { LoginBox } from "../components/login_box";
import { LoginCredentials } from "../types/login_credentials";
import { User } from "../types/user";

const useStyles = (makeStyles<Theme>(theme => createStyles({
    background: {
        padding: theme.spacing(0),
        backgroundColor: theme.palette.primary.main,
        height: "100%",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center"
    }
})));

export type LoginProps = {
    onLogin: (user: User) => void;
}

export function Login({onLogin} : LoginProps): JSX.Element {
    const classes = useStyles();
    const [loginCredentials, setLoginCredentials] = useState<LoginCredentials>({ email: "", password: "" });
    const [loginResponse, setLoginResponse] = useState<string>("");

    function handleLoginCredentialsChange(updates: Partial<LoginCredentials>): void {
        setLoginCredentials((previousState) => ({ ...previousState, ...updates }));
    }

    function attemptLogin(): void {
        postAttemptLogin(loginCredentials).then((result) => {
            setLoginResponse(result.message);

            if (result.success && result.user)
            {
                onLogin(result.user);
            }
        })
    }

    return (
        <Grid item className={classes.background} xs={12}>
            <LoginBox loginCredentials={loginCredentials} onLoginCredentialsChange={handleLoginCredentialsChange} loginMessage={loginResponse} attemptLogin={attemptLogin} />
        </Grid>
    )
}