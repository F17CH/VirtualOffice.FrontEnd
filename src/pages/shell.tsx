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
        underBarSizeStyle: string;
    }
const useStyles = (makeStyles<Theme, StyleProps>(theme => createStyles({
    shellMain: {
        flexGrow: 1,
        margin: 0,
        minHeight: '100vh'
    },
    shellBody: {
        height: ({ titleBarHeightStyle }) => `calc(100vh - ${titleBarHeightStyle})`,
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "flex-start"
    },
    container: {
        height: ({ titleBarHeightStyle }) => `calc(100vh - ${titleBarHeightStyle})`,
    }
})));

export function Shell(): JSX.Element {
    const titleBarHeight: string = '30px';
    const underBarSize: string = '3px'
    const sideBarWidth: string = '60px'

    const styleProps: StyleProps = { titleBarHeightStyle: titleBarHeight, underBarSizeStyle: underBarSize };
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
            <Grid container className={classes.shellBody}>
                <SideBar sideBarWidth={sideBarWidth} underBarSize={underBarSize} />
                    <UnderBar underBarHeight={underBarSize} />
                    {/* {sessionUser ? (
                        <Main sessionUser={sessionUser} onLogout={onLogout} />
                    ) : (
                        <Login onLogin={onLogin} />
                    )} */}
            </Grid>
        </div>
    )
}