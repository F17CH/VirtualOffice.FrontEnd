import React, { useState } from "react";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { AppBar, Button, Divider, Grid, MenuItem, Paper, Select, TextField, Toolbar, Typography } from "@material-ui/core";
import { User } from "../../../types/user";
import { SettingsGroup } from "../../setting/settings_group";
import { SettingsDivider } from "../../setting/settings_divider";
import Scrollbars from "react-custom-scrollbars";

const useStyles = (makeStyles<Theme>(theme => createStyles({
    settings: {
        height: "100%",
        width: "100%",
        display: "flex",
        justifyContent: "flex-start",
        flexDirection: "row",
    },
    settingsMenu: {
        width: "300px",
        backgroundColor: theme.palette.secondary.main,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    settingsOptions: {
        flexGrow: 1,
        backgroundColor: theme.palette.secondary.light
    },
})));

export type ConversationsPageProps = {
    user: User;
}

export function ConversationsPage({ user }: ConversationsPageProps): JSX.Element {
    const classes = useStyles();

    return <div className={classes.settings}>
        <Paper square className={classes.settingsMenu}>
        </Paper>
        <Paper square className={classes.settingsOptions}>

        </Paper>
    </div>
}