import React, { useState } from "react";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { AppBar, Button, Divider, Grid, MenuItem, Paper, Select, TextField, Toolbar, Typography } from "@material-ui/core";
import { User } from "../../../types/user";
import { SettingsGroup } from "../../setting/settings_group";
import { SettingsDivider } from "../../setting/settings_divider";

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
        justifyContent: "flex-end",
        alignItems: "center",
        paddingRight: "10px"
    },
    settingsOptions: {
        flexGrow: 1,
        backgroundColor: theme.palette.secondary.light
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
            <div>
                <SettingsGroup groupTitle="PlaceHolder" groupItems={[["Logout!", onLogout], ["test2", null]]} />
                <SettingsDivider />
                <SettingsGroup groupTitle="PlaceHolder" groupItems={[["Logout!", onLogout], ["test2", null]]} />
                <SettingsDivider />
                <SettingsGroup groupTitle="PlaceHolder" groupItems={[["Logout!", onLogout], ["test2", null]]} />
                <SettingsDivider />
                <SettingsGroup groupTitle="PlaceHolder" groupItems={[["Logout!", onLogout], ["test2", null]]} />
                <SettingsDivider />
                <SettingsGroup groupTitle="PlaceHolder" groupItems={[["Logout!", onLogout], ["test2", null]]} />
                <SettingsDivider />
                <SettingsGroup groupTitle="PlaceHolder" groupItems={[["Logout!", onLogout], ["test2", null]]} />
            </div>

            {/* <Button onClick={onLogout}></Button> */}
        </Paper>
        <Paper square className={classes.settingsOptions}>

        </Paper>
    </div>
}