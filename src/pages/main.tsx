import { Button, createStyles, Grid, makeStyles, Paper, Theme } from "@material-ui/core";
import React, { useState } from "react";
import { LoginBox } from "../components/login_box";
import { postAttemptSignIn } from "../services/api/user/user_requests";
import { LoginCredentials } from "../types/login_credentials";
import { User } from "../types/user";

const useStyles = (makeStyles<Theme>(theme => createStyles({
    container: {
    },
    sidePaper: {
        padding: theme.spacing(0),
        textAlign: 'center',
        backgroundColor: theme.palette.primary.main,
        height: "100%"

    },
    mainPaper: {
        padding: theme.spacing(0),
        textAlign: 'center',
        backgroundColor: theme.palette.primary.main,
        height: "100%"
    },
})));

export type MainProps = {
    onLogout: () => void;
}

export function Main({onLogout} : MainProps): JSX.Element {
    const classes = useStyles();

    return (
        <>
        <Grid item className={classes.container} xs={3} lg={3}>
            <Paper className={classes.sidePaper} square ></Paper>
        </Grid>
        <Grid item className={classes.container} xs={6} lg={6}>
            <Paper className={classes.mainPaper} square>
            <Button variant="contained" onClick={onLogout}>Logout</Button>
            </Paper>
        </Grid>
        <Grid item className={classes.container} xs={3} lg={3}>
            <Paper className={classes.sidePaper} square></Paper>
        </Grid>
    </>
    )
}