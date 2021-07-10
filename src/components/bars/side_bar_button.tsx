import React, { ReactNode, useState } from "react";
import { createStyles, makeStyles, Theme, withStyles } from '@material-ui/core/styles';
import { AppBar, Fab, Grid, Icon, IconTypeMap, Paper, SvgIcon, SvgIconTypeMap, Toolbar, Tooltip, Typography } from "@material-ui/core";
import { OverridableComponent } from "@material-ui/core/OverridableComponent";

import '@fontsource/roboto';

const SideBarTooltip = withStyles((theme: Theme) => ({
    tooltip: {
      backgroundColor: theme.palette.primary.dark,
      color: theme.palette.secondary.light,
      maxWidth: 220,
      fontSize: theme.typography.pxToRem(12),
    },
  }))(Tooltip);

const useStyles = (makeStyles<Theme>(theme => createStyles({
    sidebarButtonSquare: {
        backgroundColor: theme.palette.primary.dark,
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
        color: theme.palette.secondary.light
    },
    tooltip: {
        fontWeight: 500,
        tooltip: theme.palette.primary.dark
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
            <SideBarTooltip className={classes.tooltip} title={title} aria-label={title} placement="right">
                <Icon className={classes.icon} />
            </SideBarTooltip>
        </Paper>
    )
}