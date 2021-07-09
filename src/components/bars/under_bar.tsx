import React, { useState } from "react";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { AppBar, Grid, Paper, SvgIcon, Toolbar, Typography } from "@material-ui/core";
import SvgClose from "../icons/close";
import SvgMax from "../icons/max";
import SvgMin from "../icons/min";
import { ipcRenderer as ipc, remote} from 'electron';

import { Business } from '@material-ui/icons';

type StyleProps =
    {
        underBarHeightStyle: string;
    }
const useStyles = (makeStyles<Theme, StyleProps>(theme => createStyles({
    titleBarContainer: {
        minHeight: ({ underBarHeightStyle }) => `${underBarHeightStyle}`,
        maxHeight: ({ underBarHeightStyle }) => `${underBarHeightStyle}`,
    },
    titleBarMainPaper: {
        minHeight: ({ underBarHeightStyle }) => `${underBarHeightStyle}`,
        maxHeight: ({ underBarHeightStyle }) => `${underBarHeightStyle}`,
        backgroundColor: theme.palette.secondary.main,
        padding: 0
    },
    titleBarHover: {
        minHeight: ({ underBarHeightStyle }) => `${underBarHeightStyle}`,
        maxHeight: ({ underBarHeightStyle }) => `${underBarHeightStyle}`,
        backgroundColor: theme.palette.secondary.main,
        WebkitAppRegion: "drag",
        flexGrow: 1
    }
})));

type UnderBarProps = {
    underBarHeight: string;
}

export function UnderBar({
    underBarHeight
}: UnderBarProps): JSX.Element {
    const styleProps: StyleProps = { underBarHeightStyle: underBarHeight };
    const classes = useStyles(styleProps);

    return (
        <Grid container direction="row" className={classes.titleBarContainer} spacing={0}>
            <Grid item className={classes.titleBarContainer} xs={12} >
                <Paper className={classes.titleBarMainPaper} square>
                </Paper>
            </Grid>
        </Grid>
    )
}   