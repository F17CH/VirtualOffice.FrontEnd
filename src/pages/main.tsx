import { Button, createStyles, Grid, makeStyles, Paper, Theme } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { LoginBox } from "../components/login/login_box";
import { ConversationPanel } from "../components/panels/conversation_panel";
import { DataPanel } from "../components/panels/data_panel";
import { UserBox } from "../components/user/user_box";
import { getSelf, postAttemptSignIn } from "../services/api/user/user_requests";
import { LoginCredentials } from "../types/login_credentials";
import { User } from "../types/user";

const useStyles = (makeStyles<Theme>(theme => createStyles({
    mainContainer: {
        flexDirection: "column",
        height: "100%",
        zIndex: 1,
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
            <Grid item className={classes.mainContainer} md={9}>
                <ConversationPanel/>
            </Grid>
            <Grid item className={classes.mainContainer} md={3}>
                <DataPanel user={user} onLogout={onLogout} />
            </Grid>
        </>
    )
}