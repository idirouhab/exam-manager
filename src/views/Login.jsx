import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import { Box } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { useTranslation } from "react-i18next";
import Auth from "../providers/auth";
import { useSnackbar } from "notistack";
import newrelic from "../variables/newrelic";
import imageBackground from "../assets/images/login_background.jpg";
import useWindowDimensions from "../hooks/resize";
import blue from "@material-ui/core/colors/blue";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";

export default function Test (props) {
  const { height, width } = useWindowDimensions();
  const useStyles = makeStyles(() => ({
    form: {
      "& .MuiTextField-root": {
        width: "50%",
      }
    },
    gridContainer: {
      backgroundImage: `url(${imageBackground})`,
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      backgroundAttachment: "fixed",
      backgroundSize: "cover",
      height
    },
    enterButton: {
      backgroundColor: blue[500],
      "&:hover": {
        backgroundColor: blue[700]
      }
    },
    card: {
      backgroundColor: "transparent",
      shadowBox: "none",
    }
  }));

  const classes = useStyles();
  const { t } = useTranslation("common");
  const { enqueueSnackbar } = useSnackbar();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [redirectToReferrer, setRedirectToReferrer] = useState(false);

  const { from } = { from: { pathname: "/admin/home" } };

  useEffect(() => {
    if (redirectToReferrer) {
      props.history.push(from);
    }

  }, [redirectToReferrer, from, props]);

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    if (username && password) {
      Auth.login(username, password).then(() => {
        setRedirectToReferrer(true);
      }).catch((err) => {
        newrelic.noticeError(err, { username: username });
        const options = {
          variant: "error",
          anchorOrigin: {
            vertical: "top",
            horizontal: "center",
          }
        };

        if (err.response) {
          if (err.response.status === 404) {
            enqueueSnackbar(t("login_user_not_found"), options);
          } else {
            enqueueSnackbar(err.response.data.message, options);
          }
          // client never received a response, or request never left
        } else {
          enqueueSnackbar("ask_admin", options);
        }
      });
    }
  };

  return (
    <>
      <Grid container spacing={0} justify={"center"} className={classes.gridContainer}>
        <Box mb={3}>
          <Card square className={classes.card} style={{ maxWidth: 600, width: (width * 0.80) }} elevation={0}>
            <CardHeader
              style={{ textAlign: "center" }}
              title={t("login")}/>
            <CardContent style={{ textAlign: "center" }}>
              <form onSubmit={onSubmit}>
                <Box mb={3}>
                  <TextField
                    fullWidth
                    label={t("login_user")}
                    variant="outlined"
                    onChange={updateUsername}
                    value={username}
                    error={username.length === 0 && submitted}
                    helperText={username.length === 0 && submitted ? t("input.error.empty") : ""}
                  />
                </Box>
                <Box mb={2}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    label={t("login_password")}
                    onChange={updatePassword}
                    value={password}
                    type="password"
                    error={password.length === 0 && submitted}
                    helperText={password.length === 0 && submitted ? t("input.error.empty") : ""}/>
                </Box>
                <Box mb={5}>
                  <Typography variant="subtitle1">
                    <Link
                      href="/register"
                    >
                      {t("create_an_account")}
                    </Link>
                  </Typography>
                </Box>
                <Box>
                  <Button variant="contained" color="primary" type="submit"
                          className={classes.enterButton}
                          id={"login_submit"}>
                    {t("login_accept")}
                  </Button>
                </Box>
              </form>
            </CardContent>
          </Card>
        </Box>
      </Grid>
    </>
  );
}
