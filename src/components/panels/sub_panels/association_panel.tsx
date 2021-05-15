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
    users: { [userId: string]:  User };
    associations: { [associationId: string]:  Association };
    selectedAssociation: Association;
    onSelectedAssociationChange: (newSelectedAssociation: Association) => void;
}

export function AssociationPanel({ currentUser, users, associations, selectedAssociation, onSelectedAssociationChange }: AssociationPanellProps): JSX.Element {
    const classes = useStyles();

    function setAssociation(associationId: string): void {
        onSelectedAssociationChange(associations[associationId]);
    }

    return (
        <>
            <Grid container className={classes.backPanel}>
                {currentUser ? (
                    <Paper className={classes.associationPanel} square>
                        <Select
                            className={classes.associationItem}
                            value={selectedAssociation ? selectedAssociation.id : "-1"}
                            onChange={(event) => setAssociation(event.target.value as string)} >
                            <MenuItem key={-1} value={"-1"}> No Association Selected</MenuItem>
                            {Object.keys(associations).map(id => (
                                <MenuItem key={id} value={id}> {associations[id].name}</MenuItem>
                            ))}
                        </Select>
                        {selectedAssociation ? (
                            selectedAssociation.members.map((member: Member, index) => (
                                <p key={index}> {users[member.user.id].firstName + " " + users[member.user.id].lastName + " - " + member.role} </p>
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