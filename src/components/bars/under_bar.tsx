import React from "react";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Paper } from "@material-ui/core";


type StyleProps =
    {
        underBarHeightStyle: string;
    }
const useStyles = (makeStyles<Theme, StyleProps>(theme => createStyles({
    titleBarMainPaper: {
        width: "100%",
        minHeight: ({ underBarHeightStyle }) => `${underBarHeightStyle}`,
        maxHeight: ({ underBarHeightStyle }) => `${underBarHeightStyle}`,
        backgroundColor: theme.palette.primary.main,
        zIndex: 1000
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
        <Paper className={classes.titleBarMainPaper} square>
        </Paper>
    )
}