import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => (
  {
    container: {
      color: "rgba(0, 0, 0, 0.50)",
      display: "flex",
      alignItems: "center"
    },
    border: {
      borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
      width: "100%"
    },
    content: {
      padding: "0 10px 0 10px",
      textAlign: "center",
      width: "80%"


    }
  }
));

export default function CustomerDivider (props) {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <div className={classes.border}/>
      <span className={classes.content}>
        {props.children}
      </span>
      <div className={classes.border}/>
    </div>
  );
};

