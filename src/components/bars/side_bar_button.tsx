import React, { ReactNode, useState } from "react";
import { createStyles, makeStyles, Theme, withStyles } from '@material-ui/core/styles';
import { AppBar, Fab, Grid, Icon, IconTypeMap, Paper, SvgIcon, SvgIconTypeMap, Toolbar, Tooltip, Typography } from "@material-ui/core";
import { OverridableComponent } from "@material-ui/core/OverridableComponent";

const SideBarTooltip = withStyles((theme: Theme) => ({
    tooltip: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.secondary.light,
      maxWidth: 220,
      fontSize: theme.typography.pxToRem(12),
      fontFamily: theme.typography.fontFamily
    },
  }))(Tooltip);

const useStyles = (makeStyles<Theme>(theme => createStyles({
    sidebarButtonSquare: {
        backgroundColor: theme.palette.secondary.dark,
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
        color: theme.palette.primary.main,
        "&:hover": {
            color: theme.palette.secondary.main,
        }
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
            <SideBarTooltip title={title.toUpperCase()} aria-label={title} placement="right">
                <Icon className={classes.icon} />
            </SideBarTooltip>
        </Paper>
    )
}