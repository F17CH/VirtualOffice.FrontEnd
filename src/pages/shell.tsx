import React, { useEffect, useState } from "react";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { AppBar, Grid, Paper, Toolbar, Typography } from "@material-ui/core"
import { TitleBar } from "../components/shell/title_bar";
import { Login } from "./login";
import { Main } from "./main";
import { deleteUserToken, getUserToken } from "../services/user_token_manager";
import { getHealthCheck, postSignOut } from "../services/api/user/user_requests";

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
    }
})));

export function Shell(): JSX.Element {
    const titleBarHeight: string = '30px';
    const styleProps: StyleProps = { titleBarHeightStyle: titleBarHeight };
    const classes = useStyles(styleProps);

    const [userSignedIn, setUserSignedIn] = useState<boolean>(false);

    useEffect(function (): void {
        (async function (): Promise<void> {
            if (await getHealthCheck()) {
                setUserSignedIn(true);
            }
        })();
    }, []);

    async function onLogin(): Promise<void> {
        if (await getHealthCheck()) {
        setUserSignedIn(true)
    }
    }

    async function onLogout(): Promise<void> {
        await postSignOut().then(() => {

            deleteUserToken();
            setUserSignedIn(false);
        });
    }

    return (
        <div className={classes.shellMain}>
            <TitleBar titleBarHeight={titleBarHeight} />
            <div className={classes.shellBody}>
                <Grid container direction="row" className={classes.container} spacing={0}>
                    {userSignedIn ? (
                        <Main onLogout={onLogout}/>
                    ) : (
                        <Login onLogin={onLogin} />
                    )}
                </Grid>
            </div>
        </div>
    )
}