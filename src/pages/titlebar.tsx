import React from "react";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { AppBar, Grid, Paper, Toolbar, Typography } from "@material-ui/core"

type StyleProps = 
{
    titleBarHeightStyle: string;
}
const useStyles = (makeStyles<Theme, StyleProps>(theme => createStyles({
    titleBarContainer: {
        minHeight: ({titleBarHeightStyle}) => `${titleBarHeightStyle}`,
    },
    titleBarPaper: {
        minHeight: ({titleBarHeightStyle}) => `${titleBarHeightStyle}`,
        backgroundColor: theme.palette.secondary.main,
        WebkitAppRegion: "drag"
    },
})));
  
type TitleBarProps = {
    titleBarHeight : string;
}

export function TitleBar({
    titleBarHeight
} : TitleBarProps): JSX.Element {
    const styleProps : StyleProps = {titleBarHeightStyle: titleBarHeight};
    const classes = useStyles(styleProps);

    return (
            <Grid container direction="row" className={classes.titleBarContainer} spacing={0}>
                <Grid item className={classes.titleBarContainer} xs={12} >
                    <Paper className={classes.titleBarPaper} square></Paper>
                </Grid>
            </Grid>
    )
}   