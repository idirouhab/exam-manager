import React, { useEffect, useRef, useState } from "react";
import Drawer from "@material-ui/core/Drawer";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import SendIcon from "@material-ui/icons/Send";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => (
  {
    chatBarContent: {
      width: "30vw",
      [theme.breakpoints.down("sm")]: {
        width: "100vw",
      },
    }
  }));

export default function ChatBar (props) {
  const [messages, setMessages] = useState([
    "asdasd",
    "asdasd",
    "asdasd",

  ]);
  const classes = useStyles();
  const observed = useRef(null);
  const [currentMessage, setCurrentMessage] = useState("");

  useEffect(() => {
    observed.current.scrollIntoView({ behavior: "smooth" });

  }, [observed]);

  return (
    <div ref={observed}>
      <Drawer

        onClose={() => props.setOpen(false)}
        variant={"temporary"}
        elevation={22}
        anchor={"right"}
        open={props.open}
        style={{
          position: "relative",
        }}
      >
        {/*Header*/}
        <Grid
          container
          className={classes.chatBarContent}
        >
          <Grid item md={12}
                style={{
                  height: props.toolbarHeight,
                  padding: 15,
                  backgroundColor: "#2e3353"
                }}
          >
            <Typography
              align={"center"}
              style={{ color: "#fff" }}
              variant={"h5"}
              component={"h2"}
            >
              How can we help you?
            </Typography>
          </Grid>
        </Grid>
        <Grid
          container
          direction="column"
          className={classes.chatBarContent}

          style={{
            bottom: 0,
            overflowY: "auto"
          }}
        >
          <List className={classes.messageArea}
                style={{
                  overflowY: "auto",
                  width: "100%",
                  height: "80%",
                  backgroundColor: "grey",
                }}

          >
            {messages.map((message, key) => {
              return (
                <ListItem key={key}>
                  <Grid container
                  >
                    <Grid item xs={12}>
                      <ListItemText align="right" primary={message}/>
                    </Grid>
                    <Grid item xs={12}>
                      <ListItemText align="right" secondary="09:30"/>
                    </Grid>
                  </Grid>
                </ListItem>);
            })}
            <ListItem
              style={{
                position: "absolute",
                backgroundColor: "blue",
                bottom: 0,
              }}
            >


            </ListItem>

          </List>

          {/* {messages.map((message, key) => {
            return (
              <Grid key={key} item md={12}

              >
                <Paper style={{ paddingTop: 15, paddingBottom: 15 }} className={classes.paper}>xs=12</Paper>
              </Grid>);
          })}*/}

        </Grid>
        <Grid
          container
          style={{
            height: "40px"
          }}
        >
          <Grid
            item
            md={12}
            style={{
              width: "100%",
              display: "flex",
              height: "20%"
            }}
          >
            <TextField
              multiline
              rowsMax={4}
              fullWidth
              value={currentMessage}
              onChange={(e) => {setCurrentMessage(e.target.value);}}
            />
            <IconButton color="primary"
                        onClick={() => {
                          let oldMessages = [...messages];
                          oldMessages.push(currentMessage);
                          setMessages(oldMessages);
                          setCurrentMessage("");
                        }}
            >
              <SendIcon/>
            </IconButton>
          </Grid>
        </Grid>
      </Drawer>
    </div>
  );
}
