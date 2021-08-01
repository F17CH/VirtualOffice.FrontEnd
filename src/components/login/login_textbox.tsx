import React, { useState } from "react";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { AppBar, Button, Grid, Paper, SvgIconTypeMap, TextField, Toolbar, Typography } from "@material-ui/core";
import { User } from "../../types/user";
import { LoginCredentials } from "../../types/login_credentials";
import { OverridableComponent } from "@material-ui/core/OverridableComponent";

const useStyles = (makeStyles<Theme>(theme => createStyles({
    outer: {
    },
    inner: {
        height: "40px",
        display: "flex",
        justifyContent: "flex-start",
        flexDirection: "row",
    },
    upperText: {
        fontWeight: 500,
        color: "white",
        paddingBottom: "10px"
    },
    iconPaper: {
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: theme.palette.primary.dark,
        width: "40px"
    },
    icon: {
        height: "25px",
        width: "25px",
        color: "white",
    },
    textBox: {
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        flexGrow: 1,
        backgroundColor: "white",
    },
    textBoxText: {
        paddingLeft: "10px",
        paddingRight: "10px",
        fontSize: 15
    }
})));

export type LoginTextBoxProps = {
    value: string;
    onChange: (e: any) => void;
    password: boolean;
    className: string;
    text: string;
    icon: OverridableComponent<SvgIconTypeMap>;
}

export function LoginTextBox({
    value,
    onChange,
    password,
    className,
    text,
    icon
}: LoginTextBoxProps): JSX.Element {
    const classes = useStyles();

    const Icon = icon;

    return <div className={className}>
        <Typography className={classes.upperText} variant="body2">{text.toUpperCase()}</Typography>
        <div className={classes.inner}>
            <Paper square className={classes.iconPaper}>
                <Icon className={classes.icon} />
            </Paper>
            <TextField className={classes.textBox} value={value} onChange={onChange} type={password ? "password" : ""} InputProps={{ classes: { input: classes.textBoxText }, disableUnderline: true, } } label={""}></TextField>
        </div>
    </div>
}