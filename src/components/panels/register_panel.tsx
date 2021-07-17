import React, { useState } from "react";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { AppBar, Button, CircularProgress, Grid, Paper, TextField, Toolbar, Typography } from "@material-ui/core";
import { User } from "../../types/user";
import { LoginCredentials } from "../../types/login_credentials";
import { LoginTextBox } from "../login/login_textbox";
import { Email, KeyboardBackspace, Lock } from "@material-ui/icons";

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
        paddingTop: "30px"
    },
    registerMessage: {
        fontWeight: 400,
        color: "#bdbdbd",
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
    topDiv: {
        height: "140px",
        width: "100%",
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        boxSizing: "border-box",
        padding: "20px"
    },
    backIcon: {
        color: theme.palette.secondary.light,
        height: "50px",
        width: "50px",
        cursor: "pointer",
        alignSelf: "flex-start"
    },
    titleDiv: {
        height: "100px",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        fontWeight: 600,
        color: theme.palette.secondary.light,
        justifySelf: "center"
    },
    loadingSpinner: {
        color: theme.palette.secondary.light,
    }
})));

export type RegisterPanelProps = {
    registerCredentials: LoginCredentials;
    onRegisterCredentialsChange: (updates: Partial<LoginCredentials>) => void;
    registerMessage: string;
    attemptRegister: () => void;
    onBack: () => void;
    loading: boolean;
}

export function RegisterPanel({
    registerCredentials,
    onRegisterCredentialsChange,
    registerMessage,
    attemptRegister,
    onBack,
    loading
}: RegisterPanelProps): JSX.Element {
    const classes = useStyles();

    return <div>
        <Paper square className={classes.panel}>
            {!loading ? (
                <>
                    <div className={classes.topDiv}>
                        <KeyboardBackspace className={classes.backIcon} onClick={onBack} />
                        <Typography className={classes.title} variant="h5">REGISTER</Typography>
                    </div>
                    <div className={classes.titleDiv}>

                    </div>

                    {/* <LoginTextBox className={classes.loginTextBox} text="Email" icon={Email} value={loginCredentials.email} onChange={(e) => onLoginCredentialsChange({ email: e.target.value })} password={false} />
                    <LoginTextBox className={classes.loginTextBox} text="Password" icon={Lock} value={loginCredentials.password} onChange={(e) => onLoginCredentialsChange({ password: e.target.value })} password={true} />
                    <Button className={classes.loginButton} onClick={attemptLogin} disableElevation={true} disableRipple={true}>LOGIN</Button>
                    <Typography className={classes.registerMessage} variant="body2">New User? Sign Up</Typography>
                    <Typography className={classes.loginMessage} variant="body1">{loginMessage}</Typography> */}
                </>
            ) : (
                <div className={classes.loadingDiv}>
                    <CircularProgress className={classes.loadingSpinner} />
                </div>
            )}
        </Paper>
    </div >;
}