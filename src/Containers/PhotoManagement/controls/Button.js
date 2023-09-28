import React from 'react'
import { makeStyles } from "@material-ui/core";
import Button from '@mui/material/Button';

const useStyles = makeStyles(theme => ({
    root: {
        margin: theme.spacing(0.5),
        background: '#e3d900',
        fontWeight:600,
    },
    label: {
        textTransform: 'none'
    }
}))

export default function PrButton(props) {

    const { text, size, color='#e3d900', variant, onClick, ...other } = props
    const classes = useStyles();

    return (
        <Button
            variant={variant || "contained"}
            size={size || "large"}
            color={color || "primary"}
            back
            onClick={onClick}>
            {text}
        </Button>
    )
}
