import React from "react";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { AppBar, Grid, Paper, Toolbar, Typography } from "@material-ui/core";
import close from "../../public/images/titlebar/close.svg";
import max from "../../public/images/titlebar/max.svg";
import min from "../../public/images/titlebar/min.svg";

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
    },
    closeButtonHover: {
        background: theme.palette.error.main,
        cursor: "pointer",
        stroke: "#00FF00",
    },
    maxButton: {

    },
    maxButtonHover: {
        background: theme.palette.error.main,
        cursor: "pointer",
        fill: "#00FF00",
    },
    minButton: {

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

    return (
        <Grid container direction="row" className={classes.titleBarContainer} spacing={0}>
            <Grid item className={classes.titleBarContainer} xs={12} >
                <Paper className={classes.titleBarMainPaper} square>
                    <Grid container direction="row-reverse" justify="flex-start">
                        <img src={close}
                            className={classes.closeButton}
                            onMouseEnter={e => e.currentTarget.className = classes.closeButtonHover}
                            onMouseLeave={e => e.currentTarget.className = classes.closeButton} />
                        <img src={max}
                            className={classes.closeButton}
                            onMouseEnter={e => e.currentTarget.className = classes.maxButtonHover}
                            onMouseLeave={e => e.currentTarget.className = classes.maxButton} />
                        <img src={min} alt="" className={classes.minButton} />
                        <Grid className={classes.titleBarHover} />
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    )
}   