import React, { useState } from "react";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { AppBar, Grid, Paper, Toolbar, Typography } from "@material-ui/core";
import SvgClose from "../icons/close";
import SvgMax from "../icons/max";
import SvgMin from "../icons/min";
import { ipcRenderer as ipc, remote} from 'electron';

type StyleProps =
    {
        titleBarHeightStyle: string;
    }
const useStyles = (makeStyles<Theme, StyleProps>(theme => createStyles({
    titleBarContainer: {
        minHeight: ({ titleBarHeightStyle }) => `${titleBarHeightStyle}`,
        maxHeight: ({ titleBarHeightStyle }) => `${titleBarHeightStyle}`,
    },
    titleBarMainPaper: {
        minHeight: ({ titleBarHeightStyle }) => `${titleBarHeightStyle}`,
        maxHeight: ({ titleBarHeightStyle }) => `${titleBarHeightStyle}`,
        backgroundColor: theme.palette.secondary.dark,
        padding: 0
    },
    titleBarHover: {
        minHeight: ({ titleBarHeightStyle }) => `${titleBarHeightStyle}`,
        maxHeight: ({ titleBarHeightStyle }) => `${titleBarHeightStyle}`,
        backgroundColor: theme.palette.secondary.dark,
        WebkitAppRegion: "drag",
        flexGrow: 1
    },
    titleBarButtonContainer: {

    },
    closeButton: {
        stroke: theme.palette.primary.main,
        WebkitAppRegion: "none",
    },
    closeButtonHover: {
        background: theme.palette.error.main,
        stroke: theme.palette.secondary.main,
        cursor: "pointer",
        WebkitAppRegion: "none",
    },
    maxButton: {
        stroke: theme.palette.primary.main,
        WebkitAppRegion: "none",
    },
    maxButtonHover: {
        background: theme.palette.primary.main,
        stroke: theme.palette.secondary.main,
        cursor: "pointer",
        WebkitAppRegion: "none",
    },
    minButton: {
        stroke: theme.palette.primary.main,
        WebkitAppRegion: "none",
    },
    minButtonHover: {
        background: theme.palette.primary.main,
        stroke: theme.palette.secondary.main,
        cursor: "pointer",
        WebkitAppRegion: "none",
    }
})));

type TitleBarProps = {
    titleBarHeight: string;
}

export function TitleBar({
    titleBarHeight
}: TitleBarProps): JSX.Element {
    const styleProps: StyleProps = { titleBarHeightStyle: titleBarHeight };
    const classes = useStyles(styleProps);

    const [closeHover, setCloseHover] = useState(false);
    const [maxHover, setMaxHover] = useState(false);
    const [minHover, setMinHover] = useState(false);

    const mainWindowStateChangeRequest = (windowState : string) => {
        ipc.send('windowstate-modification-request', windowState);
    }

    return (
        <Grid container direction="row" className={classes.titleBarContainer} spacing={0}>
            <Grid item className={classes.titleBarContainer} xs={12} >
                <Paper className={classes.titleBarMainPaper} square>
                    <Grid container className={classes.titleBarHover}>
                        <Grid container item xs={6} className={classes.titleBarContainer} direction="row" justify="flex-start">
                        </Grid>
                        <Grid container item xs={6} className={classes.titleBarContainer} direction="row-reverse" justify="flex-start">
                        <SvgClose className={closeHover ? classes.closeButtonHover : classes.closeButton}
                            height = {titleBarHeight}
                            onMouseEnter={() => setCloseHover(true)}
                            onMouseLeave={() => setCloseHover(false)}
                            onClick={() => mainWindowStateChangeRequest('close')} />
                        <SvgMax className={maxHover ? classes.maxButtonHover : classes.maxButton}
                            height={titleBarHeight}
                            onMouseEnter={() => setMaxHover(true)}
                            onMouseLeave={() => setMaxHover(false)}
                            onClick={() => mainWindowStateChangeRequest('maximize')} />
                        <SvgMin className={minHover ? classes.minButtonHover : classes.minButton}
                            height={titleBarHeight}
                            onMouseEnter={() => setMinHover(true)}
                            onMouseLeave={() => setMinHover(false)}
                            onClick={() => mainWindowStateChangeRequest('minimize')} />
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    )
}   