import React, { useState } from "react";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { AppBar, Button, Grid, MenuItem, Paper, Select, TextField, Toolbar, Typography } from "@material-ui/core";
import { User } from "../../../types/user";

const useStyles = (makeStyles<Theme>(theme => createStyles({
    settings: {
        height: "100%",
        width: "100%",
        display: "flex",
        justifyContent: "flex-start",
        flexDirection: "row",
    },
    settingsMenu: {
        width: "33.3%",
        backgroundColor: theme.palette.primary.dark
    },
    settingsOptions: {
        width: "66.6%",
        backgroundColor: theme.palette.secondary.main
    }
})));

export type SettingsPageProps = {
    user: User;
    onLogout: () => void;
}

export function SettingsPage({ user, onLogout }: SettingsPageProps): JSX.Element {
    const classes = useStyles();

    return <div className={classes.settings}>
        <Paper square className={classes.settingsMenu}>

        </Paper>
        <Paper square className={classes.settingsOptions}>

        </Paper>
    </div>
}