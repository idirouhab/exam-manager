import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import Fab from "@material-ui/core/Fab";
import SendIcon from "@material-ui/icons/Send";
import { CHAT_URL, moment } from "../variables/general";
import Auth from "../providers/auth";
import { useTranslation } from "react-i18next";
import { animateScroll } from "react-scroll";
import deepOrange from "@material-ui/core/colors/deepOrange";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  chatSection: {
    width: "100%",
    height: "80vh"
  },
  headBG: {
    backgroundColor: "#e0e0e0"
  },
  borderRight500: {
    borderRight: "1px solid #e0e0e0"
  },
  messageArea: {
    height: "70vh",
    overflowY: "auto"
  },
  orange: {
    color: "#fff",
    backgroundColor: deepOrange[500],
  },
});

export default function Chat () {
  const classes = useStyles();
  const [ws, setWs] = useState(null);
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [users, setUsers] = useState([]);
  const { t } = useTranslation("common");

  const addMessage = (messagePayload) => {
    if (!messagePayload.text) return false;
    let oldMessages = [...messages];
    oldMessages.push(messagePayload);

    setMessages(oldMessages);
  };
  const sendMessage = () => {
    const message = {
      text: currentMessage,
      userName: Auth.getUserName()
    };

    ws.send(JSON.stringify(message));
    addMessage({ text: currentMessage, userName: t("me") });
    setCurrentMessage("");
  };
  const scrollToBottom = () => {
    animateScroll.scrollToBottom({
      containerId: "chat-box"
    });
  };

  useEffect(() => {
    const wsClient = new WebSocket(CHAT_URL);
    wsClient.onopen = () => {
      console.log("ws opened");
      setWs(wsClient);
    };
    wsClient.onclose = () => console.log("ws closed");

    return () => {
      wsClient.close();
    };
  }, []);

  useEffect(() => {
    if (!ws) return;

    ws.onmessage = e => {
      const messagePayload = JSON.parse(e.data);
      if (messagePayload.userName && !users.includes(messagePayload.userName)) {
        let oldUsers = [...users];
        oldUsers.push(messagePayload.userName);
        setUsers(oldUsers);
      }
      addMessage(messagePayload, users);
    };
    scrollToBottom();
  }, [ws, addMessage]);

  useEffect(() => {
    scrollToBottom();

  }, [messages]);

  return (
    <div>
      <Grid container component={Paper} className={classes.chatSection}>
        <Grid item xs={3} className={classes.borderRight500}>
          <List>
            <ListItem button>
              <ListItemIcon>
                <Avatar className={classes.orange}>{Auth.getUserName().charAt(0)}</Avatar>

              </ListItemIcon>
              <ListItemText primary={t("me")}/>
            </ListItem>
          </List>
          <Divider/>
          <Grid item xs={12} style={{ padding: "10px" }}>
            <TextField id="outlined-basic-email" label="Search" variant="outlined" fullWidth/>
          </Grid>
          <Divider/>
          <List>
            {users.map(user => {
              return (<ListItem button key={user}>
                <ListItemIcon>
                  <Avatar>{user.charAt(0)}</Avatar>
                </ListItemIcon>
                <ListItemText primary={user}>{user}</ListItemText>
              </ListItem>);
            })}
          </List>
        </Grid>
        <Grid item xs={9}>
          <List className={classes.messageArea} id={"chat-box"}>
            {messages.map((message, index) => {
                let isMine = t("me") === message.userName ? "right" : "left";
                return (<ListItem key={index}>
                  <Grid container>
                    <Grid item xs={12}>
                      <ListItemText align={isMine} primary={message.text}/>
                    </Grid>
                    <Grid item xs={12}>
                      <ListItemText align={isMine} secondary={moment().format("hh:mm") + " " + message.userName}/>
                    </Grid>
                  </Grid>
                </ListItem>);
              }
            )}


            {/*  <ListItem key="2">
              <Grid container>
                <Grid item xs={12}>
                  <ListItemText align="left" primary="Hey, Iam Good! What about you ?"/>
                </Grid>
                <Grid item xs={12}>
                  <ListItemText align="left" secondary="09:31"/>
                </Grid>
              </Grid>
            </ListItem>
            <ListItem key="3">
              <Grid container>
                <Grid item xs={12}>
                  <ListItemText align="right" primary="Cool. i am good, let's catch up!"/>
                </Grid>
                <Grid item xs={12}>
                  <ListItemText align="right" secondary="10:30"/>
                </Grid>
              </Grid>
            </ListItem>*/}
          </List>
          <Divider/>
          <Grid container style={{ padding: "20px" }}>
            <Grid item xs={11}>

              <TextField value={currentMessage}
                         onChange={e => {setCurrentMessage(e.target.value);}}
                         id="outlined-basic-email"
                         fullWidth
                         onKeyPress={(ev) => {
                           if (ev.key === "Enter") {
                             ev.preventDefault();
                             sendMessage();
                           }
                         }}
              />
            </Grid>
            <Grid xs={1} item align="right">
              <Fab onClick={sendMessage} color="primary" aria-label="add"><SendIcon/></Fab>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

