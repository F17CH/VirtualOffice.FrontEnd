import React, { useState } from "react";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { AppBar, Grid, Paper, SvgIcon, Toolbar, Typography } from "@material-ui/core";
import SvgClose from "../icons/close";
import SvgMax from "../icons/max";
import SvgMin from "../icons/min";
import { ipcRenderer as ipc, remote} from 'electron';
import { Business, Settings, Person, People } from "@material-ui/icons";
import { SideBarButton } from "./side_bar_button";

type StyleProps =
    {
        sideBarWidthStyle: string;
    }
const useStyles = (makeStyles<Theme, StyleProps>(theme => createStyles({
    sideBarContainer: {
        minWidth: ({ sideBarWidthStyle }) => `${sideBarWidthStyle}`,
        maxWidth: ({ sideBarWidthStyle }) => `${sideBarWidthStyle}`,
    },
    sideBarMainPaper: {
        minWidth: ({ sideBarWidthStyle }) => `${sideBarWidthStyle}`,
        maxWidth: ({ sideBarWidthStyle }) => `${sideBarWidthStyle}`,
        backgroundColor: theme.palette.secondary.main,
        padding: 0
    },
    closeButton: {
        stroke: "black",
        WebkitAppRegion: "none",
    },
    closeButtonHover: {
        background: theme.palette.error.main,
        stroke: "white",
        cursor: "pointer",
        WebkitAppRegion: "none",
    },
    maxButton: {
        stroke: "black",
        WebkitAppRegion: "none",
    },
    maxButtonHover: {
        background: theme.palette.secondary.main,
        stroke: "white",
        cursor: "pointer",
        WebkitAppRegion: "none",
    },
    minButton: {
        stroke: "black",
        WebkitAppRegion: "none",
    },
    minButtonHover: {
        background: theme.palette.secondary.main,
        stroke: "white",
        cursor: "pointer",
        WebkitAppRegion: "none",
    }
})));

type SideBarProps = {
    sideBarWidth: string;
}

export function SideBar({
    sideBarWidth
}: SideBarProps): JSX.Element {
    const styleProps: StyleProps = { sideBarWidthStyle: sideBarWidth };
    const classes = useStyles(styleProps);

    return (
        <Grid container direction="row" className={classes.sideBarContainer} spacing={0}>
                <Paper className={classes.sideBarMainPaper} square>
                    <SideBarButton icon={Business} title={"Office View"} />
                    <SideBarButton icon={Person} title={"Conversations"} />
                    <SideBarButton icon={People} title={"Groups"} />
                    <SideBarButton icon={Settings} title={"Settings"} />
                </Paper>
        </Grid>
    )
}   