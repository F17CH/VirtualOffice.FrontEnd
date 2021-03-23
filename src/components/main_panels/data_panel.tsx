import React, { useState } from "react";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { AppBar, Button, Grid, Paper, TextField, Toolbar, Typography } from "@material-ui/core";
import { User } from "../../types/user";
import { LoginCredentials } from "../../types/login_credentials";
import { UserBox } from "../user/user_box";

const useStyles = (makeStyles<Theme>(theme => createStyles({
    panelBack: {
        padding: theme.spacing(0),
        textAlign: 'center',
        backgroundColor: theme.palette.primary.main,
        height: "100%"
    },
    panelGridMain: {
        height: "100%",
        flexDirection: "column"
    },
    panelTopCover: {
        flexGrow: 1
    }
})));

export type DataPanelProps = {
    user: User;
    onLogout: () => void;
}

export function DataPanel({user, onLogout}: DataPanelProps): JSX.Element {
    const classes = useStyles();

    return (
        <Paper className={classes.panelBack}>
            <Grid container className={classes.panelGridMain}>
                <Paper className={classes.panelTopCover} />
                <UserBox user={user} onLogout={onLogout}/>
            </Grid>
        </Paper>
    )
}