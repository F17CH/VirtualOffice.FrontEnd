import React, { useState } from "react";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { AppBar, Button, Grid, Paper, TextField, Toolbar, Typography } from "@material-ui/core";
import { User } from "../../types/user";
import { LoginCredentials } from "../../types/login_credentials";
import { UserBox } from "../user/user_box";

const useStyles = (makeStyles<Theme>(theme => createStyles({
    panelGridContainer: {
        height: "100%",
        flexDirection: "row"
    },
    panelGridItem: {
        height: "100%",
        flexDirection: "column"
    },
    panelCover: {
        backgroundColor: theme.palette.primary.main,
        flexGrow: 1
    }
})));

export type DataPanelProps = {
    user: User;
    onLogout: () => void;
}

export function DataPanel({ user, onLogout }: DataPanelProps): JSX.Element {
    const classes = useStyles();

    return (
        <>
            <Grid container className={classes.panelGridContainer}>
                <Grid item container className={classes.panelGridItem} md={12}>
                    <Paper className={classes.panelCover} square />
                    <UserBox user={user} onLogout={onLogout} />
                </Grid>
            </Grid>
        </>
    )
}