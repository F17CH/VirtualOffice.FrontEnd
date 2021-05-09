import React, { useEffect, useState } from "react";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Grid, MenuItem, Paper, Select } from "@material-ui/core";
import { User } from "../../../types/user";
import { Association } from "../../../types/group/association";
import { Member } from "../../../types/group/member";


const useStyles = (makeStyles<Theme>(theme => createStyles({
    backPanel: {
        flexGrow: 1,
        backgroundColor: theme.palette.primary.main,
    },
    associationPanel: {
        flexGrow: 1,
        backgroundColor: theme.palette.secondary.main,
        height: "100%"
    },
    associationItem: {
        width: "100%",
        overflow: "hidden"
    }
})));

export type AssociationPanellProps = {
    currentUser: User;
    currentAssociation: Association;
    onCurrentAssociationChange: (newCurrentAssociation: Association) => void;
}

export function AssociationPanel({ currentUser, currentAssociation, onCurrentAssociationChange }: AssociationPanellProps): JSX.Element {
    const classes = useStyles();

    function setAssociation(associationId: string): void {
        onCurrentAssociationChange(currentUser.associations.find((association) => association.id == associationId));
    }

    return (
        <>
            <Grid container className={classes.backPanel}>
                {currentUser ? (
                    <Paper className={classes.associationPanel} square>
                        <Select
                            className={classes.associationItem}
                            value={currentAssociation ? currentAssociation.id : "-1"}
                            onChange={(event) => setAssociation(event.target.value as string)} >
                            <MenuItem key={-1} value={"-1"}> No Association Selected</MenuItem>
                            {currentUser.associations.map((association: Association, index) => (
                                <MenuItem key={index} value={association.id}> {association.name}</MenuItem>
                            ))}
                        </Select>
                        {currentAssociation ? (
                            currentAssociation.members.map((member: Member, index) => (
                                <p> {member.user.firstName + " " + member.user.lastName + " - " + member.role} </p>
                            ))
                        ) : (
                            <>
                            </>
                        )}
                    </Paper>
                ) : (
                    <>
                    </>
                )}
            </Grid>
        </>
    )
}