import { CircularProgress, createStyles, Grid, makeStyles, Paper, Theme } from "@material-ui/core";
import React, { useState } from "react";
import { LoginPanel } from "../panels/login_panel";
import { postAttemptRegister, postAttemptSignIn } from "../../services/api/user/user_requests";
import { LoginCredentials } from "../../types/login_credentials";
import { UnderBar } from "../bars/under_bar";
import { RegisterPanel } from "../panels/register_panel";
import { getBlankCredentials, RegisterCredentials } from "../../types/register_credentials";

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
        height: "100%",
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
    const [registerMode, setRegisterMode] = useState<boolean>(false);
    const [registerCredentials, setRegisterCredentials] = useState<RegisterCredentials>(getBlankCredentials());
    const [registerResponse, setRegisterResponse] = useState<string>("");

    function handleLoginCredentialsChange(updates: Partial<LoginCredentials>): void {
        setLoginCredentials((previousState) => ({ ...previousState, ...updates }));
    }

    function handleRegisterCredentialsChange(updates: Partial<RegisterCredentials>): void {
        setRegisterCredentials((previousState) => ({ ...previousState, ...updates }));
    }

    function attemptLogin(): void {
        if (loginCredentials.email != "" &&
            loginCredentials.password != "") {

            setLoading(true);
            postAttemptSignIn(loginCredentials).then((result) => {
                setLoginResponse(result.message);

                if (result.success) {
                    onLogin();
                }
                else {
                    handleLoginCredentialsChange({ password: "" });
                    setLoading(false);
                }
            });
        }
        else {
            setLoginResponse("Please enter a value for all fields.")
        }
    }

    function attemptRegister(): void {
        if (registerCredentials.email != "" &&
            registerCredentials.first_name != "" &&
            registerCredentials.last_name != "" &&
            registerCredentials.password != "" &&
            registerCredentials.password_confirmation != "") {
            if (registerCredentials.password === registerCredentials.password_confirmation) {
                setLoading(true);
                postAttemptRegister(registerCredentials).then((result) => {
                    setRegisterResponse(result.message);

                    if (result.success) {
                        onLogin();
                        onRegisterHide();
                    }
                    else {
                        setLoading(false);
                    }
                })
            }
            else {
                setRegisterResponse("Passwords do not match.")
            }
        }
        else {
            setRegisterResponse("Please enter a value for all fields.")
        }
    }

    function onRegisterShow(): void {
        setRegisterMode(true);

        setLoginResponse("");
        setLoginCredentials({ email: "", password: "" });
    }

    function onRegisterHide(): void {
        setRegisterMode(false);

        setRegisterResponse("");
        setRegisterCredentials(getBlankCredentials());
    }

    return (
        <div className={classes.mainBody}>
            <UnderBar underBarHeight={underBarSize} />
            <div className={classes.background}>
                {registerMode ? (
                    <RegisterPanel registerCredentials={registerCredentials} onRegisterCredentialsChange={handleRegisterCredentialsChange} registerMessage={registerResponse} attemptRegister={attemptRegister} onBack={onRegisterHide} loading={loading} />
                ) : (
                    <LoginPanel loginCredentials={loginCredentials} onLoginCredentialsChange={handleLoginCredentialsChange} loginMessage={loginResponse} attemptLogin={attemptLogin} onRegisterSelect={onRegisterShow} loading={loading} />
                )}
            </div>
        </div>
    )
}
