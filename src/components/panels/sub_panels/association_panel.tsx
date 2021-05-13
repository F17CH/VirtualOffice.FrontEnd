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
    associations: { [associationId: string]: Association };
    currentAssociation: Association;
    onCurrentAssociationChange: (newCurrentAssociation: Association) => void;
}

export function AssociationPanel({ currentUser, associations, currentAssociation, onCurrentAssociationChange }: AssociationPanellProps): JSX.Element {
    const classes = useStyles();

    function setAssociation(associationId: string): void {
        onCurrentAssociationChange(associations[associationId]);
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
                            {Object.keys(associations).map(id => (
                                <MenuItem key={id} value={id}> {associations[id].name}</MenuItem>
                            ))}
                        </Select>
                        {currentAssociation ? (
                            currentAssociation.members.map((member: Member, index) => (
                                <p key={index}> {member.user.firstName + " " + member.user.lastName + " - " + member.role} </p>
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