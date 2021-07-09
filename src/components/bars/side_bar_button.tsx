import React, { ReactNode, useState } from "react";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { AppBar, Grid, Icon, IconTypeMap, Paper, SvgIcon, SvgIconTypeMap, Toolbar, Typography } from "@material-ui/core";
import { OverridableComponent } from "@material-ui/core/OverridableComponent";

import '@fontsource/roboto';

const useStyles = (makeStyles<Theme>(theme => createStyles({
    sidebarButtonSquare: {
        backgroundColor: theme.palette.secondary.main,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        "&:hover": {
            backgroundColor: theme.palette.primary.main,
            cursor: "pointer"
        }
    },
    icon: {
        height: "50px",
        width: "40px",
        color: theme.palette.primary.dark
    },
    title: {
        fontWeight: 500,
        color: theme.palette.primary.dark
    }
})));


type SideBarButtonProps = {
    icon: OverridableComponent<SvgIconTypeMap>;
    title: string;
}

export function SideBarButton({
    icon,
    title
}: SideBarButtonProps): JSX.Element {
    const classes = useStyles();

    const Icon = icon;

    return (
            <Paper square className={classes.sidebarButtonSquare} elevation={0} >
                <Icon className={classes.icon}/>

                <Typography variant="h3" className={classes.title}>{title.toUpperCase()}</Typography>
            </Paper>
    )
}