import React, { useState } from "react";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { AppBar, Button, Grid, Paper, TextField, Toolbar, Typography } from "@material-ui/core";
import { User } from "../types/user";
import { LoginCredentials } from "../types/login_credentials";
import { postAttemptLogin } from "../api/login_api";


const useStyles = (makeStyles<Theme>(theme => createStyles({
})));

export type LoginBoxProps = {
    onLogin: (user: User) => void;
}

export function LoginBox({
    onLogin
}: LoginBoxProps): JSX.Element {
    const classes = useStyles();
    const [loginCredentials, setLoginCredentials] = useState<LoginCredentials>({email : "", password: ""});
    const [loginResponse, setLoginResponse] = useState<string>("no value");

    function handleLoginCredentialsChange(updates : Partial<LoginCredentials>) : void {
        setLoginCredentials((previousState) => ({...previousState, ...updates}));
    }

    function attemptLogin() : void {
        postAttemptLogin(loginCredentials).then((result) => {
            setLoginResponse(result.message);
        })
    }

    return <div>
        <TextField id="filled-basic" label="Username" variant="filled" value={loginCredentials.email} onChange={(e) => handleLoginCredentialsChange({email: e.target.value})}/>
        <TextField id="filled-basic" label="Password" variant="filled" value={loginCredentials.password} onChange={(e) => handleLoginCredentialsChange({password: e.target.value})}/>
        <Button variant="contained" onClick={attemptLogin}>Login</Button>
        <p>{loginResponse}</p>
    </div>;
}