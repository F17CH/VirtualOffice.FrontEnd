import React, { useState } from "react";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { AppBar, Button, Grid, Paper, TextField, Toolbar, Typography } from "@material-ui/core";
import { Conversation } from "../../../types/conversation/conversation";
import { ConversationMenuBox } from "../../conversation/conversation_menu_box";
import { NewConversationMenuBox } from "../../conversation/new_conversation_box";
import { ConversationPackage } from "../../../types/conversation/conversation_package";
import { User } from "../../../types/user";
import { Association } from "../../../types/group/association";
import { UserSelectionBox } from "../../group/user_selection_box";


const useStyles = (makeStyles<Theme>(theme => createStyles({
    panelTopCover: {
        backgroundColor: theme.palette.primary.main,
        flexGrow: 1
    }
})));

export type UserSelectionPanelProps = {
    currentUser: User;
    users: { [userId: string]: User };
    selectedAssociation: Association;
}

export function UserSelectionPanel({ currentUser, users, selectedAssociation }: UserSelectionPanelProps): JSX.Element {
    const classes = useStyles();

    return (
        <>
            {selectedAssociation ? (

                selectedAssociation.members.map((member, index) => (
                    <UserSelectionBox user={users[member.user.id]} onClick={null} key={index} />
                ))
            ) : (
                <>
                </>
            )}
            <Paper className={classes.panelTopCover} square />
        </>
    )
}