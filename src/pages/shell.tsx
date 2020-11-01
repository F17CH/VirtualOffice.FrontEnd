import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Grid, Paper, Toolbar, Typography } from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

export function Shell(): JSX.Element {
    const classes = useStyles();

    return (
        <div className={classes.root}>

            <Grid container spacing={0}>
                <Grid item xs={6} lg={3}>
                    <Paper className={classes.paper}>xs = 3</Paper>
                </Grid>
                <Grid item xs={undefined} lg = {6}>
                    <Paper className={classes.paper}>xs = 6</Paper>
                </Grid>
                <Grid item xs={6} lg={3}>
                    <Paper className={classes.paper}>xs = 3</Paper>
                </Grid>
            </Grid>
        </div>
    )
}   