import React, { useState } from "react";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { AppBar, Button, CircularProgress, Grid, Paper, TextField, Toolbar, Typography } from "@material-ui/core";
import { User } from "../../types/user";
import { LoginCredentials } from "../../types/login_credentials";
import { LoginTextBox } from "../login/login_textbox";
import { Email, KeyboardBackspace, Lock, Person } from "@material-ui/icons";
import { RegisterCredentials } from "../../types/register_credentials";
import { Scrollbars } from 'react-custom-scrollbars';

const useStyles = (makeStyles<Theme>(theme => createStyles({
    panel: {
        backgroundColor: theme.palette.primary.main,
        minHeight: "600px",
        height: "80%",
        maxHeight: "850px",
        width: "500px",
        display: "flex",
        justifyContent: "flex-start",
        flexDirection: "column",
        alignItems: "center",
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
        justifyContent: "space-between",
        alignItems: "center",
        boxSizing: "border-box",
        padding: "20px"
    },
    scroll: {
        flexGrow: 1
    },
    middleDiv: {
        display: "flex",
        justifyContent: "flex-start",
        flexDirection: "column",
        alignItems: "center",
        flexGrow: 1
    },
    backIcon: {
        color: theme.palette.secondary.light,
        height: "50px",
        width: "50px",
        cursor: "pointer",
        alignSelf: "flex-start"
    },
    empty: {
        height: "50px",
        width: "50px",
    },
    title: {
        fontWeight: 600,
        color: theme.palette.secondary.light,
        justifySelf: "center"
    },
    loginTextBox: {
        width: "300px",
        paddingBottom: "40px"
    },
    registerButton: {
        width: "300px",
        color: theme.palette.secondary.light,
        backgroundColor: theme.palette.primary.dark,
        borderRadius: "0px",
        '&:hover': {
            backgroundColor: theme.palette.primary.dark,
        }
    },
    registerMessage: {
        fontWeight: 400,
        color: theme.palette.secondary.light,
        padding: "30px"
    },
    credentialsDiv: {

    },
    passwordDiv: {
        paddingTop: "40px"
    },
    loadingSpinner: {
        color: theme.palette.secondary.light,
    }
})));

export type RegisterPanelProps = {
    registerCredentials: RegisterCredentials;
    onRegisterCredentialsChange: (updates: Partial<RegisterCredentials>) => void;
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

    return <Paper square className={classes.panel}>
        {!loading ? (
            <>
                <div className={classes.topDiv}>
                    <KeyboardBackspace className={classes.backIcon} onClick={onBack} />
                    <Typography className={classes.title} variant="h5">REGISTER</Typography>
                    <div className={classes.empty}></div>
                </div>
                <Scrollbars className={classes.scroll}>
                    <div className={classes.middleDiv}>
                        <div className={classes.credentialsDiv}>
                            <LoginTextBox className={classes.loginTextBox} text="Email" icon={Email} value={registerCredentials.email} onChange={(e) => onRegisterCredentialsChange({ email: e.target.value })} password={false} />
                            <LoginTextBox className={classes.loginTextBox} text="First Name" icon={Person} value={registerCredentials.first_name} onChange={(e) => onRegisterCredentialsChange({ first_name: e.target.value })} password={false} />
                            <LoginTextBox className={classes.loginTextBox} text="Last Name" icon={Person} value={registerCredentials.last_name} onChange={(e) => onRegisterCredentialsChange({ last_name: e.target.value })} password={false} />
                        </div>
                        <div className={classes.passwordDiv}>
                            <LoginTextBox className={classes.loginTextBox} text="Password" icon={Lock} value={registerCredentials.password} onChange={(e) => onRegisterCredentialsChange({ password: e.target.value })} password={true} />
                            <LoginTextBox className={classes.loginTextBox} text="Password Confirmation" icon={Lock} value={registerCredentials.password_confirmation} onChange={(e) => onRegisterCredentialsChange({ password_confirmation: e.target.value })} password={true} />
                        </div>
                        <Button className={classes.registerButton} onClick={attemptRegister} disableElevation={true} disableRipple={true}>REGISTER</Button>
                        <Typography className={classes.registerMessage} variant="body1">{registerMessage}</Typography>
                    </div>
                </Scrollbars>
            </>
        ) : (
            <div className={classes.loadingDiv}>
                <CircularProgress className={classes.loadingSpinner} />
            </div>
        )}
    </Paper>;
}