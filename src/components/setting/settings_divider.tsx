import React, { useState } from "react";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Divider } from "@material-ui/core";

const useStyles = (makeStyles<Theme>(theme => createStyles({
    dividerDiv: {
        paddingTop: "15px",
        paddingBottom: "15px"
    },
    divider: {
        zIndex: 100,
        borderColor: theme.palette.secondary.dark,
    }
})));

export function SettingsDivider(): JSX.Element {
    const classes = useStyles();

    return (
        <div className={classes.dividerDiv} >
            <hr className={classes.divider} />
        </div >
    )
}