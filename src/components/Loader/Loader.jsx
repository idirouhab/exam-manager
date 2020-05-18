import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import {blue} from "@material-ui/core/colors";


const useStyles = makeStyles(() => ({
    loaderContainer: {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",

    },
    loader: {
        left: "50%",
        top: "30%",
        zIndex: -1,
        position: "absolute",

    },
    spinner: {
        color: blue[500]
    }
}));

export default function Loader() {
    const classes = useStyles();
    return (
        <div className={classes.loaderContainer}>
            <div className={classes.loader}>
                <CircularProgress className={classes.spinner} variant="indeterminate" size={100}/>
            </div>
        </div>
    );
}
