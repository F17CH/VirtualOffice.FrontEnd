import { createStyles, Grid, makeStyles, Paper, Theme } from "@material-ui/core";
import React, { useState } from "react";
import { LoginBox } from "../components/login/login_box";
import { postAttemptSignIn } from "../services/api/user/user_requests";
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
    onLogin: () => void;
}

export function Login({onLogin} : LoginProps): JSX.Element {
    const classes = useStyles();
    const [loginCredentials, setLoginCredentials] = useState<LoginCredentials>({ email: "", password: "" });
    const [loginResponse, setLoginResponse] = useState<string>("");

    function handleLoginCredentialsChange(updates: Partial<LoginCredentials>): void {
        setLoginCredentials((previousState) => ({ ...previousState, ...updates }));
    }

    function attemptLogin(): void {
        postAttemptSignIn(loginCredentials).then((result) => {
            setLoginResponse(result.message);

            if (result.success)
            {
                onLogin();
            }
        })
    }

    return (
        <Grid item className={classes.background} xs={12}>
            <LoginBox loginCredentials={loginCredentials} onLoginCredentialsChange={handleLoginCredentialsChange} loginMessage={loginResponse} attemptLogin={attemptLogin} />
        </Grid>
    )
}