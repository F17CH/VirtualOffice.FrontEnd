import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Grid, Paper, Toolbar, Typography } from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
    shellRoot: {
        flexGrow: 1,
        margin: 0,
        minHeight: '100vh'
    },
    container: {
        height: "100vh",
    },
    sidePaper: {
        padding: theme.spacing(0),
        textAlign: 'center',
        backgroundColor: theme.palette.primary.main,
        height: "100%"
        
    },
    mainPaper: {
        padding: theme.spacing(0),
        textAlign: 'center',
        backgroundColor: theme.palette.secondary.main,
        height: "100%"
    },
}));

export function Shell(): JSX.Element {
    const classes = useStyles();

    return (
        <div className={classes.shellRoot}>
            <Grid container direction="row" className={classes.container} spacing={0}>
                <Grid item className={classes.container} xs={6} lg={3}>
                    <Paper className={classes.sidePaper} square >xs = 3</Paper>
                </Grid>
                <Grid item className={classes.container} xs={2} lg = {6}>
                    <Paper className={classes.mainPaper} square>xs = 6</Paper>
                </Grid>
                <Grid item className={classes.container} xs={6} lg={3}>
                    <Paper className={classes.sidePaper} square>xs = 3</Paper>
                </Grid>
            </Grid>
        </div>
    )
}   