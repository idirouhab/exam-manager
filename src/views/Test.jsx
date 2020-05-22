import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import lightBlue from "@material-ui/core/colors/lightBlue";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
    root: {
        position: 'absolute',
        height: '100px',
        width: '100px',
        top: "50%",
        left: "50%",
        marginLeft: "-50px",
        marginTop: "-50px",
        backgroundSize: "100%",
    },
    loaderContainer: {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: lightBlue[500]
    },

}));

export default function ControlledExpansionPanels() {
    const classes = useStyles();

    return (
        <div className={classes.loaderContainer}>
            <Grid container justify={"center"}>
                <Grid item xs={6} alignContent={"center"} style={{backgroundColor: "red"}}>
                    adaddssad
                </Grid>
            </Grid>
        </div>
    );
}
