import { CircularProgress, createStyles, Grid, makeStyles, Paper, Theme } from "@material-ui/core";
import React, { useState } from "react";
import { LoginPanel } from "../panels/login_panel";
import { postAttemptSignIn } from "../../services/api/user/user_requests";
import { LoginCredentials } from "../../types/login_credentials";
import { UnderBar } from "../bars/under_bar";

type StyleProps =
    {
        titleBarHeightStyle: string;
    }

const useStyles = (makeStyles<Theme, StyleProps>(theme => createStyles({
    mainBody: {
        height: ({ titleBarHeightStyle }) => `calc(100vh - ${titleBarHeightStyle})`,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        width: "100%"
    },
    background: {
        flexGrow: 1,
        backgroundColor: theme.palette.secondary.light,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%"
    },
})));

export type LoginZoneProps = {
    onLogin: () => void;
    titleBarHeight: string;
    underBarSize: string;
}

export function LoginZone({ onLogin, titleBarHeight, underBarSize }: LoginZoneProps): JSX.Element {
    const styleProps: StyleProps = { titleBarHeightStyle: titleBarHeight };
    const classes = useStyles(styleProps);
    const [loading, setLoading] = useState<boolean>(false);
    const [loginCredentials, setLoginCredentials] = useState<LoginCredentials>({ email: "", password: "" });
    const [loginResponse, setLoginResponse] = useState<string>("");

    function handleLoginCredentialsChange(updates: Partial<LoginCredentials>): void {
        setLoginCredentials((previousState) => ({ ...previousState, ...updates }));
    }

    function attemptLogin(): void {
        setLoading(true);
        postAttemptSignIn(loginCredentials).then((result) => {
            setLoginResponse(result.message);


            if (result.success) {
                onLogin();
            }
            else {
                setLoading(false);
            }
        })
    }

    return (
        <div className={classes.mainBody}>
            <UnderBar underBarHeight={underBarSize} />
            <Paper square className={classes.background}>
                {!loading ? (
                    <LoginPanel loginCredentials={loginCredentials} onLoginCredentialsChange={handleLoginCredentialsChange} loginMessage={loginResponse} attemptLogin={attemptLogin} />
                ) : (
                    <CircularProgress />
                )}
            </Paper>
        </div>
    )
}