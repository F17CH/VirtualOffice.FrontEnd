import React, { useState } from "react";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { AppBar, Grid, Paper, SvgIcon, Toolbar, Typography } from "@material-ui/core";
import SvgClose from "../icons/close";
import SvgMax from "../icons/max";
import SvgMin from "../icons/min";
import { ipcRenderer as ipc, remote } from 'electron';
import { Business, Settings, Person, People } from "@material-ui/icons";
import { SideBarButton } from "./side_bar_button";

type StyleProps =
    {
        sideBarWidthStyle: string;
        underBarSizeStyle: string;
    }
const useStyles = (makeStyles<Theme, StyleProps>(theme => createStyles({
    sideBarContainer: {
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
        backgroundColor: theme.palette.primary.dark,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
    },
    underBarPaper: {
        minWidth: ({ underBarSizeStyle }) => `${underBarSizeStyle}`,
        maxWidth: ({ underBarSizeStyle }) => `${underBarSizeStyle}`,
        backgroundColor: theme.palette.primary.main,
    },
})));

type SideBarProps = {
    sideBarWidth: string;
    underBarSize: string;
}

export function SideBar({
    sideBarWidth,
    underBarSize
}: SideBarProps): JSX.Element {
    const styleProps: StyleProps = { sideBarWidthStyle: sideBarWidth, underBarSizeStyle: underBarSize };
    const classes = useStyles(styleProps);

    return (
        <Grid container direction="row" className={classes.sideBarContainer} spacing={0}>
            <Paper className={classes.sideBarMainPaper} square>
                <div>
                    <SideBarButton icon={Business} title={"Office View"} />
                    <SideBarButton icon={Person} title={"Conversations"} />
                    <SideBarButton icon={People} title={"Groups"} />
                </div>
                <div>
                    <SideBarButton icon={Settings} title={"Settings"} />
                </div>
            </Paper>
            <Paper className={classes.underBarPaper} square>

            </Paper>
        </Grid>
    )
}