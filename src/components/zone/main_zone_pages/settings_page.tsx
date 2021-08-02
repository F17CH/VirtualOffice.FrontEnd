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
    settingsMenuZone: {
        width: "200px",
        backgroundColor: theme.palette.primary.main,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: "40px",
        paddingBottom: "40px",
        paddingRight: "10px",
    },
    scroll: {
        height: "100%",
    },
    scrollInner: {
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    settingsOptions: {
        flexGrow: 1,
        backgroundColor: theme.palette.secondary.light
    },
    zoneDiv: {
        margin: "auto",
        paddingTop: "30px",
        paddingBottom: "30px"
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
            <Scrollbars className={classes.scroll}>
                <div className={classes.scrollInner}>
                    <div className={classes.zoneDiv}>
                        <Paper square className={classes.settingsMenuZone} >
                            <div>
                                <SettingsGroup groupTitle="PlaceHolder" groupItems={[["Test 1", null], ["Test 2", null], ["Test 3", null]]} />
                                <SettingsDivider />
                                <SettingsGroup groupTitle="PlaceHolder" groupItems={[["Test 1", null], ["Test 2", null], ["Test 3", null]]} />
                                <SettingsDivider />
                                <SettingsGroup groupTitle="PlaceHolder" groupItems={[["Test 1", null], ["Test 2", null], ["Test 3", null]]} />
                                <SettingsDivider />
                                <SettingsGroup groupTitle="PlaceHolder" groupItems={[["Test 1", null], ["Test 2", null], ["Test 3", null]]} />
                                <SettingsDivider />
                                <SettingsGroup groupTitle="PlaceHolder" groupItems={[["Test 1", null], ["Test 2", null], ["Test 3", null]]} />
                                <SettingsDivider />
                                <SettingsGroup groupTitle="PlaceHolder" groupItems={[["Test 1", null], ["Test 2", null], ["Test 3", null]]} />
                                <SettingsDivider />
                                <SettingsGroup groupTitle="PlaceHolder" groupItems={[["Test 1", null], ["Test 2", null], ["Test 3", null]]} />
                                <SettingsDivider />
                                <SettingsGroup groupTitle="" noTitle alertText groupItems={[["Log Out", onLogout]]} />
                            </div>
                        </Paper>
                    </div>
                </div>
            </Scrollbars>
        </Paper>
        <Paper square className={classes.settingsOptions}>

        </Paper>
    </div>
}