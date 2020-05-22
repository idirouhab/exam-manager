import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

export default function Loader (props) {
  const useStyles = makeStyles((theme) => ({
    loaderContainer: {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",backgroundColor: props.backgroundColor || "transparent"
    },
    loader: {
      left: "50%",
      top: "30%",
      zIndex: -1,
      position: "absolute",
    },
    spinner: {
      left: "50%",
      marginLeft: "-50px",
      marginTop: "-50px",
      backgroundSize: "100%",
      position: "absolute",
      height: "100px",
      width: "100px",
      color: props.progressColor || theme.palette.primary.main,
    }
  }));

  const classes = useStyles();
  return (
    <div className={classes.loaderContainer}>
      <div className={classes.loader}>
        <CircularProgress
          className={classes.spinner}
          variant="indeterminate"
          size={100}/>
      </div>
    </div>
  );
}
