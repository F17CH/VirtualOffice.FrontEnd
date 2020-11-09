import React, { useState } from "react";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { AppBar, Grid, Paper, Toolbar, Typography } from "@material-ui/core";
import SvgClose from "./icons/close";
import SvgMax from "./icons/max";
import SvgMin from "./icons/min";

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
        backgroundColor: theme.palette.secondary.main,
        padding: 0
    },
    titleBarHover: {
        minHeight: ({ titleBarHeightStyle }) => `${titleBarHeightStyle}`,
        maxHeight: ({ titleBarHeightStyle }) => `${titleBarHeightStyle}`,
        backgroundColor: theme.palette.secondary.main,
        WebkitAppRegion: "drag",
        flexGrow: 1
    },
    titleBarButtonContainer: {

    },
    closeButton: {
        stroke: "black"
    },
    closeButtonHover: {
        background: theme.palette.error.main,
        stroke: "white",
        cursor: "pointer",
    },
    maxButton: {
        stroke: "black"
    },
    maxButtonHover: {
        background: theme.palette.secondary.light,
        stroke: "white",
        cursor: "pointer",
    },
    minButton: {
        stroke: "black"
    },
    minButtonHover: {
        background: theme.palette.secondary.light,
        stroke: "white",
        cursor: "pointer",
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

    return (
        <Grid container direction="row" className={classes.titleBarContainer} spacing={0}>
            <Grid item className={classes.titleBarContainer} xs={12} >
                <Paper className={classes.titleBarMainPaper} square>
                    <Grid container direction="row-reverse" justify="flex-start">
                        <SvgClose className={closeHover ? classes.closeButtonHover : classes.closeButton}
                            onMouseEnter={() => setCloseHover(true)}
                            onMouseLeave={() => setCloseHover(false)} />
                        <SvgMax className={maxHover ? classes.maxButtonHover : classes.maxButton}
                            onMouseEnter={() => setMaxHover(true)}
                            onMouseLeave={() => setMaxHover(false)} />
                        <SvgMin className={minHover ? classes.minButtonHover : classes.minButton}
                            onMouseEnter={() => setMinHover(true)}
                            onMouseLeave={() => setMinHover(false)} />
                        <Grid className={classes.titleBarHover} />
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    )
}   