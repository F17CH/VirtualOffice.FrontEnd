import { Button, createStyles, Grid, makeStyles, Paper, Theme } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { LoginBox } from "../components/login/login_box";
import { ConversationPanel } from "../components/panels/conversation_panel";
import { DataPanel } from "../components/panels/data_panel";
import { UserBox } from "../components/user/user_box";
import { getSelf, getUser, postAttemptSignIn } from "../services/api/user/user_requests";
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
    currentUser: User;
    onLogout: () => void;
}

export function Main({ currentUser, onLogout }: MainProps): JSX.Element {
    const classes = useStyles();
    const [loadedUsers, setLoadedUsers] = useState<{ [id: string]: User }>({});

    function loadUser(userId: string): User {
        var user: User = null;

        if (loadedUsers[userId]) {
            user = loadedUsers[userId];
        }
        else {
            getUser(userId).then((newUser: User) => {
                user = newUser;

                setLoadedUsers((prevState) => {
                    prevState[userId] = user;
                    return { ...prevState };
                });
            });
        }

        return user;
    }

    return (
        <>
            <Grid item className={classes.mainContainer} md={9}>
                <ConversationPanel currentUser={currentUser} loadUser={loadUser} />
            </Grid>
            <Grid item className={classes.mainContainer} md={3}>
                <DataPanel user={currentUser} onLogout={onLogout} />
            </Grid>
        </>
    )
}