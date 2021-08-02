import React, { useState } from "react";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { AppBar, Button, Grid, Paper, SvgIconTypeMap, TextField, Toolbar, Typography } from "@material-ui/core";
import { User } from "../../types/user";
import { LoginCredentials } from "../../types/login_credentials";
import { OverridableComponent } from "@material-ui/core/OverridableComponent";

const useStyles = (makeStyles<Theme>(theme => createStyles({
    group: {
        width: "150px",
        paddingLeft: "5px"
    },
    title: {
        fontWeight: "bold",
        color: theme.palette.secondary.main,
        paddingLeft: "5px",
        userSelect: "none"
    },
    itemPaper: {
        paddingLeft: "5px",
        cursor: "pointer",
        backgroundColor: theme.palette.primary.main,
    },
    itemPaperHover: {
        paddingLeft: "5px",
        cursor: "pointer",
        backgroundColor: theme.palette.primary.light,
    },
    itemText: {
        color: theme.palette.secondary.main
    },
    itemTextAlert: {
        color: theme.palette.error.main
    }
})));

export interface SettingsGroupProps {
    groupTitle: string;
    groupItems: [string, () => void][];
    noTitle?: boolean;
    alertText?: boolean;
}

export function SettingsGroup({
    groupTitle,
    groupItems,
    noTitle,
    alertText
}: SettingsGroupProps): JSX.Element {
    const classes = useStyles();
    const [itemHover, setItemHover] = useState<boolean[]>(Array<boolean>(groupItems.length));

    function hover(index: number): void {
        setItemHover(prevState => {
            prevState[index] = true;
            return [...prevState]
        });
    }

    function noHover(index: number): void {
        setItemHover(prevState => {
            prevState[index] = false;
            return [...prevState]
        });
    }


    return (
        <div className={classes.group}>
            {noTitle ? (
                <>
                </>
            ) : (
                <Typography className={classes.title} variant="body1">{groupTitle.toUpperCase()}</Typography>
            )}
            {groupItems.map((item, index) => (
                <Paper key={index} elevation={0} className={itemHover[index] ? classes.itemPaperHover : classes.itemPaper} square onMouseOver={() => hover(index)} onMouseOut={() => noHover(index)} onClick={item[1]} >
                    <Typography key={index} className={alertText ? classes.itemTextAlert : classes.itemText} variant="body1">{item[0]}</Typography>
                </ Paper>
            ))}
        </div>
    )
}