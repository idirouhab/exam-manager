import React from 'react';

import {makeStyles} from '@material-ui/core/styles';
import {Link as RouterLink} from 'react-router-dom';
import Button from "@material-ui/core/Button";




const useStyles = makeStyles({
    root: {
        width: 360,
    },
});

export default function Test() {
    const classes = useStyles();

    return (
        <div className={classes.root}>

            <Button color="primary" component={RouterLink} to="/admin/home">
                With prop forwarding
            </Button>
        </div>
    );
}
