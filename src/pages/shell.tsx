import React, { useState } from "react";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { AppBar, Grid, Paper, Toolbar, Typography } from "@material-ui/core"
import { TitleBar } from "../components/title_bar";
import { User } from "../types/user";
import { LoginBox } from "../components/login_box";
import { Login } from "./login";

type StyleProps =
    {
        titleBarHeightStyle: string;
    }
const useStyles = (makeStyles<Theme, StyleProps>(theme => createStyles({
    shellMain: {
        flexGrow: 1,
        margin: 0,
        minHeight: '100vh'
    },
    shellBody: {
        flexGrow: 1,
        margin: 0,
        minHeight: '100%'
    },
    container: {
        height: ({ titleBarHeightStyle }) => `calc(100vh - ${titleBarHeightStyle})`,
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
        backgroundColor: theme.palette.primary.main,
        height: "100%"
    },
})));

export function Shell(): JSX.Element {
    const titleBarHeight: string = '30px';
    const styleProps: StyleProps = { titleBarHeightStyle: titleBarHeight };
    const classes = useStyles(styleProps);

    const [currentUser, setCurrentUser] = useState<User | null>(null);

    function onLogin(user: User): void {
        setCurrentUser(user);
    }

    return (
        <div className={classes.shellMain}>
            <TitleBar titleBarHeight={titleBarHeight} />
            <div className={classes.shellBody}>
                <Grid container direction="row" className={classes.container} spacing={0}>
                    {currentUser != null ? (
                        <>
                            <Grid item className={classes.container} xs={3} lg={3}>
                                <Paper className={classes.sidePaper} square ></Paper>
                            </Grid>
                            <Grid item className={classes.container} xs={6} lg={6}>
                                <Paper className={classes.mainPaper} square></Paper>
                            </Grid>
                            <Grid item className={classes.container} xs={3} lg={3}>
                                <Paper className={classes.sidePaper} square></Paper>
                            </Grid>
                        </>
                    ) : (
                        <Login onLogin={onLogin}/>
                    )}
                </Grid>
            </div>
        </div>
    )
}