import React, { useState } from "react";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { AppBar, Grid, Paper, SvgIcon, Toolbar, Typography } from "@material-ui/core";
import { ipcRenderer as ipc, remote } from 'electron';
import { Business, Settings, Person, People } from "@material-ui/icons";
import { SideBarButton } from "./side_bar_button";

type StyleProps =
    {
        sideBarWidthStyle: string;
        underBarSizeStyle: string;
    }
const useStyles = (makeStyles<Theme, StyleProps>(theme => createStyles({
    sideBarDiv: {
        minWidth: ({ sideBarWidthStyle }) => `${sideBarWidthStyle}`,
        maxWidth: ({ sideBarWidthStyle }) => `${sideBarWidthStyle}`,
        height: "100%",
        display: "flex",
        flexDirection: "row",
        zIndex: 100,
    },
    sideBarMainPaper: {
        paddingTop: "20px",
        paddingBottom: "20px",
        minWidth: ({ sideBarWidthStyle, underBarSizeStyle }) => `calc(${sideBarWidthStyle} - ${underBarSizeStyle})`,
        maxWidth: ({ sideBarWidthStyle, underBarSizeStyle }) => `calc(${sideBarWidthStyle} - ${underBarSizeStyle})`,
        backgroundColor: theme.palette.secondary.dark,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
    },
    underBarPaper: {
        minWidth: ({ underBarSizeStyle }) => `${underBarSizeStyle}`,
        maxWidth: ({ underBarSizeStyle }) => `${underBarSizeStyle}`,
        backgroundColor: theme.palette.primary.main,
        zIndex: 1000
    },
})));

type SideBarProps = {
    sideBarWidth: string;
    underBarSize: string;
    onOfficeViewClick: () => void;
    onConversationsClick: () => void;
    onGroupsClick: () => void;
    onSettingsClick: () => void;
}

export function SideBar({
    sideBarWidth,
    underBarSize,
    onOfficeViewClick,
    onConversationsClick,
    onGroupsClick,
    onSettingsClick
}: SideBarProps): JSX.Element {
    const styleProps: StyleProps = { sideBarWidthStyle: sideBarWidth, underBarSizeStyle: underBarSize };
    const classes = useStyles(styleProps);

    return (
        <div className={classes.sideBarDiv}>
            <Paper className={classes.sideBarMainPaper} square>
                <div>
                    <SideBarButton icon={Business} title={"Office View"} onClick={onOfficeViewClick} />
                    <SideBarButton icon={Person} title={"Conversations"} onClick={onConversationsClick} />
                    <SideBarButton icon={People} title={"Groups"} onClick={onGroupsClick} />
                </div>
                <div>
                    <SideBarButton icon={Settings} title={"Settings"} onClick={onSettingsClick} />
                </div>
            </Paper>
            <Paper className={classes.underBarPaper} square>

            </Paper>
        </div>
    )
}