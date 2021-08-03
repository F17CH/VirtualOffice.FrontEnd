import React, { useState } from "react";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Divider } from "@material-ui/core";

const useStyles = (makeStyles<Theme>(theme => createStyles({
    dividerDiv: {
        width: "100%",
    },
    divider: {
        margin: 0,
        padding: 0,
        borderWidth: "1px",
        borderColor: theme.palette.secondary.dark,
    }
})));

export function ConversationMenuBoxDivider(): JSX.Element {
    const classes = useStyles();

    return (
        <div className={classes.dividerDiv} >
            <hr className={classes.divider} />
        </div >
    )
}