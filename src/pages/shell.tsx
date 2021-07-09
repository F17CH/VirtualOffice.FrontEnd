import React, { useEffect, useState } from "react";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Grid } from "@material-ui/core"
import { TitleBar } from "../components/bars/title_bar";
import { Login } from "./login";
import { Main } from "./main";
import { deleteUserToken } from "../services/user_token_manager";
import { getCurrentUser, postSignOut } from "../services/api/user/user_requests";
import { User } from "../types/user";
import { SessionUser } from "../types/session_user";
import { UnderBar } from "../components/bars/under_bar";
import { SideBar } from "../components/bars/side_bar";

type StyleProps =
    {
        titleBarHeightStyle: string;
        underBarHeightStyle: string;
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
        height: ({ titleBarHeightStyle, underBarHeightStyle }) => `calc(100vh - ${titleBarHeightStyle} - ${underBarHeightStyle})`,
    }
})));

export function Shell(): JSX.Element {
    const titleBarHeight: string = '30px';
    const underBarHeight: string = '3px'
    const sideBarWidth: string = '100px'

    const styleProps: StyleProps = { titleBarHeightStyle: titleBarHeight, underBarHeightStyle: underBarHeight };
    const classes = useStyles(styleProps);

    const [sessionUser, setSessionUser] = useState<SessionUser | null>(null);

    useEffect(function (): void {
        (async function (): Promise<void> {
            await attemptLoginUser();
        })();
    }, []);

    async function onLogin(): Promise<void> {
        await attemptLoginUser();
    }

    async function onLogout(): Promise<void> {
        await postSignOut().then(() => {

            deleteUserToken();
            setSessionUser(null);
        });
    }

    async function attemptLoginUser(): Promise<void> {
        getCurrentUser().then((sessionUser) => {
            if (sessionUser) {
                setSessionUser(sessionUser)
            }
        });
    }

    return (
        <div className={classes.shellMain}>
            <TitleBar titleBarHeight={titleBarHeight} />
            <UnderBar underBarHeight={underBarHeight} />
            <div className={classes.shellBody}>
                <Grid container direction="row" className={classes.container} spacing={0}>
                    <SideBar sideBarWidth={sideBarWidth} />
                    {/* {sessionUser ? (
                        <Main sessionUser={sessionUser} onLogout={onLogout} />
                    ) : (
                        <Login onLogin={onLogin} />
                    )} */}
                </Grid>
            </div>
        </div>
    )
}