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

export default function Login (props) {
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
  const { t } = useTranslation("api");
  const { enqueueSnackbar } = useSnackbar();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [redirectToReferrer, setRedirectToReferrer] = useState(false);
  const { from } = { from: { pathname: "/admin/home" } };
  const snackErrorOptions = {
    variant: "error",
    anchorOrigin: {
      vertical: "top",
      horizontal: "center",
    }
  };

  useEffect(() => {
    if (redirectToReferrer) {
      props.history.push(from);
    }

  }, [redirectToReferrer, from, props]);

  const onSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    if (email && password) {
      Auth.login(email, password).then(() => {
        setRedirectToReferrer(true);
      }).catch((err) => {
        newrelic.noticeError(err, { email: email });
        if (err.response && err.response.status) {
          switch (err.response.status) {
            case 401:
              enqueueSnackbar(t("invalid_credentials"), snackErrorOptions);
              break;
            case 403:
              enqueueSnackbar(t("user_not_verified"), snackErrorOptions);
              break;
            case 404:
              enqueueSnackbar(t("email_doesnt_exist"), snackErrorOptions);
              break;
            default:
              enqueueSnackbar(t("ask_admin"), snackErrorOptions);
              break;
          }
        } else {
          enqueueSnackbar(t("ask_admin"), snackErrorOptions);
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
                    type={"email"}
                    label={t("login_user")}
                    variant="outlined"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    value={email}
                    error={email.length === 0 && submitted}
                    helperText={email.length === 0 && submitted ? t("input.error.empty") : ""}
                  />
                </Box>
                <Box mb={2}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    label={t("login_password")}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
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
                          disabled={!email.length || !password.length}
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
