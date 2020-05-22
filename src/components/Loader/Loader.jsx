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

}));

export default function Loader(props) {
    const classes = useStyles();
    const PROGRESS_COLOR = props.progressColor || blue[500];
    const BACKGROUND_COLOR = props.backgroundColor || "transparent";

    return (
        <div className={classes.loaderContainer} style={{backgroundColor: BACKGROUND_COLOR}}>
            <div className={classes.loader}>
                <CircularProgress
                    className={"spinner"}
                    style={{color: PROGRESS_COLOR}}
                    variant="indeterminate"
                    size={100}/>
            </div>
        </div>
    );
}
