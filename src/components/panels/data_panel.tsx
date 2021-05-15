import React, { useState } from "react";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { AppBar, Button, Grid, Paper, TextField, Toolbar, Typography } from "@material-ui/core";
import { User } from "../../types/user";
import { LoginCredentials } from "../../types/login_credentials";
import { UserBox } from "../user/user_box";
import { Association } from "../../types/group/association";
import { AssociationPanel } from "./sub_panels/association_panel";

const useStyles = (makeStyles<Theme>(theme => createStyles({
    panelGridContainer: {
        height: "100%",
        flexDirection: "row"
    },
    panelGridItem: {
        height: "100%",
        flexDirection: "column"
    },
    panelCover: {
        backgroundColor: theme.palette.primary.main,
        flexGrow: 1
    }
})));

export type DataPanelProps = {
    currentUser: User;
    onLogout: () => void;
    users: { [userId: string]:  User };
    associations: { [associationId: string]:  Association };
    selectedAssociation: Association;
    onSelectedAssociationChange: (newSelectedAssociation: Association) => void;
}

export function DataPanel({ currentUser, onLogout, users, associations, selectedAssociation, onSelectedAssociationChange }: DataPanelProps): JSX.Element {
    const classes = useStyles();

    return (
        <>
            <Grid container className={classes.panelGridContainer}>
                <Grid item container className={classes.panelGridItem} md={12}>
                    <AssociationPanel currentUser={currentUser} users={users} associations={associations} selectedAssociation={selectedAssociation} onSelectedAssociationChange={onSelectedAssociationChange} />
                    <Paper className={classes.panelCover} square />
                    <UserBox user={currentUser} onLogout={onLogout} />
                </Grid>
            </Grid>
        </>
    )
}