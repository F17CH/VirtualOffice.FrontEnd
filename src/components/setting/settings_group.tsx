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
        color: theme.palette.primary.main,
        paddingLeft: "5px"
    },
    itemPaper: {
        paddingLeft: "5px",
        cursor: "pointer",
        backgroundColor: theme.palette.secondary.main,
    },
    itemPaperHover: {
        paddingLeft: "5px",
        cursor: "pointer",
        backgroundColor: theme.palette.primary.main,
    },
    itemText: {
        color: theme.palette.primary.main
    },
    itemTextHover: {
        color: theme.palette.secondary.main
    }
})));

export type SettingsGroupProps = {
    groupTitle: string;
    groupItems: [string, () => void][];
}

export function SettingsGroup({
    groupTitle,
    groupItems
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
            <Typography className={classes.title} variant="body1">{groupTitle.toUpperCase()}</Typography>
            {groupItems.map((item, index) => (
                <Paper elevation={0} className={itemHover[index] ? classes.itemPaperHover : classes.itemPaper} square onMouseOver={() => hover(index)} onMouseOut={() => noHover(index)} onClick={item[1]} >
                    <Typography className={itemHover[index] ? classes.itemTextHover : classes.itemText} variant="body1">{item[0]}</Typography>
                </ Paper>
            ))}
        </div>
    )
}