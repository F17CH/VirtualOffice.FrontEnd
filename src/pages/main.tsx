import { Button, createStyles, Grid, makeStyles, Paper, Theme } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { LoginBox } from "../components/login/login_box";
import { ConversationPanel } from "../components/main_panels/conversation_panel";
import { DataPanel } from "../components/main_panels/data_panel";
import { UserBox } from "../components/user/user_box";
import { getSelf, postAttemptSignIn } from "../services/api/user/user_requests";
import { LoginCredentials } from "../types/login_credentials";
import { User } from "../types/user";

const useStyles = (makeStyles<Theme>(theme => createStyles({
    sideContainer: {
        flexDirection: "column",
        height: "100%",
        zIndex: 2,
    },
    middleContainer: {
        flexDirection: "column",
        height: "100%",
        zIndex: 1,
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

export type MainProps = {
    onLogout: () => void;
}

export function Main({ onLogout }: MainProps): JSX.Element {
    const classes = useStyles();
    const [user, setUser] = useState<User|null>(null);

    useEffect(function (): void {
        (async function (): Promise<void> {
            await getSelf().then((user) => {
                setUser(user);
            });
        })();
    }, []);

    return (
        <>
            <Grid item className={classes.sideContainer} xs={3} lg={3}>
                <ConversationPanel/> 
            </Grid>
            <Grid item className={classes.middleContainer} xs={6} lg={6}>
                <Paper className={classes.mainPaper} square>
                </Paper>
            </Grid>
            <Grid item className={classes.sideContainer} xs={3} lg={3}>
                <DataPanel user={user} onLogout={onLogout} />
            </Grid>
        </>
    )
}