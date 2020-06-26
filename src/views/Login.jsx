import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { useTranslation } from "react-i18next";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import { Box } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import { useSnackbar } from "notistack";
import LoginLogo from "../assets/login/undraw_login.svg";
import Auth from "../providers/auth";
import newrelic from "../variables/newrelic";
import Loader from "../components/Loader/Loader";
import { grey } from "@material-ui/core/colors";
import Divider from "@material-ui/core/Divider";
import CustomerDivider from "../components/Common/CustomerDivider";

const useStyles = makeStyles((theme) => (
  {
    root: {
      flexGrow: 1,
      backgroundColor: "#F5F5F5",
      height: "100vh"
    },
    grow: {
      flex: "1 1 auto",
    },
    firstBlock: {
      height: `100%`,
    },
    firstSection: {
      alignItems: "center",
      textAlign: "center",
      color: "#000",
    },
    secondSection: {
      alignItems: "center",
      textAlign: "center",
      backgroundColor: theme.palette.primary.main,

    },
    enterButton: {
      width: "100%"
    },
    textDivider: {
      display: "flex",
      flexBasis: "100%",
      alignItems: "center",
      color: "rgba(0, 0, 0, 0.35)",
      margin: "8px 0px",
      width: "100%",
      "&::before": {
        content: "",
        flexGrow: "1",
        background: "rgba(0, 0, 0, 0.35)",
        height: "1px",
        fontSize: "0px",
        margin: "0px 8px",
      },
      "&::after": {
        content: "",
        flexGrow: "1",
        background: "rgba(0, 0, 0, 0.35)",
        height: "1px",
        fontSize: "0px",
        margin: "0px 8px",
      },
    },
    span: {
      backgroundColor: "#f5f5f5",
      padding: "1em",
    },
  }));

//.hr-sect {
// 	display: flex;
// 	flex-basis: 100%;
// 	align-items: center;
// 	color: rgba(0, 0, 0, 0.35);
// 	margin: 8px 0px;
// }
// .hr-sect::before,
// .hr-sect::after {
// 	content: "";
// 	flex-grow: 1;
// 	background: rgba(0, 0, 0, 0.35);
// 	height: 1px;
// 	font-size: 0px;
// 	line-height: 0px;
// 	margin: 0px 8px;
// }
export default function Login (props) {
  const classes = useStyles();
  const { t } = useTranslation("api");
  const { enqueueSnackbar } = useSnackbar();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [redirectToReferrer, setRedirectToReferrer] = useState(false);
  const [loading, setLoading] = useState(false);
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
    console.log(username);
    e.preventDefault();
    setSubmitted(true);

    if (username && password) {
      setLoading(true);
      Auth.login(username, password).then(() => {
        setRedirectToReferrer(true);
      }).catch((err) => {
        newrelic.noticeError(err, { username: username });
        if (err.response && err.response.status) {

          switch (err.response.status) {
            case 401:
              enqueueSnackbar(t("invalid_credentials"), snackErrorOptions);
              break;
            case 403:
              enqueueSnackbar(t("user_not_verified"), snackErrorOptions);
              break;
            case 404:
              enqueueSnackbar(t("email_doesnt_exist", { username: username }), snackErrorOptions);
              break;
            default:
              enqueueSnackbar(t("ask_admin"), snackErrorOptions);
              break;
          }
        } else {
          enqueueSnackbar(t("ask_admin"), snackErrorOptions);
        }
      }).finally(() => setLoading(false));
    }
  };
  return (
    <div className={classes.root}>
      <CssBaseline/>
      {!loading ? (<Grid
        container
        spacing={0}
        className={classes.firstBlock}>

        <Grid
          item
          md={7}
          xs={12}
          className={classes.firstSection}>
          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify={"center"}
            style={{ height: "100%" }}
          >
            <Grid
              item
              md={6}
              xs={9}
              style={{ textAlign: "left", width: "100%" }}
            >
              <Typography
                paragraph
                variant="h4"
                color={"primary"}
                component="h6"
              >
                <strong>{t("login")}</strong>
              </Typography>
              <form onSubmit={onSubmit}>
                <Box mt={2}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    label={t("register_email")}
                    onChange={(e) => {setUsername(e.target.value);}}
                    type={"email"}
                    value={username}
                    error={username.length === 0 && submitted}
                    helperText={username.length === 0 && submitted ? t("input.error.empty") : ""}
                  />
                </Box>
                <Box mt={2}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    label={t("register_password")}
                    onChange={(e) => {setPassword(e.target.value);}}
                    value={password}
                    error={password.length === 0 && submitted}
                    helperText={password.length === 0 && submitted ? t("input.error.empty") : ""}
                    type={showPassword ? "text" : "password"}
                    InputProps={{ // <-- This is where the toggle button is added.
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <Visibility/> : <VisibilityOff/>}
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                </Box>
                <Box mt={1}>
                  <Button href="/register" color="primary">
                    {t("forgot_password")}
                  </Button>
                </Box>

                <Box my={4}>
                  <Button variant="contained" color="primary" type="submit"
                          disabled={!username.length || !password.length}
                          className={classes.enterButton}
                          fullWidth
                          id={"login_accept"}>
                    {t("login_accept")}
                  </Button>

                </Box>
                <Box mb={2}>
                  <CustomerDivider>{t('new_here')}</CustomerDivider>
                </Box>
                <Box my={2}>
                  <Divider variant={"fullWidth"}/>
                  <Button variant={"contained"} fullWidth href="/register" color="secondary">
                    {t("create_an_account")}
                  </Button>
                </Box>
              </form>

            </Grid>
          </Grid>
        </Grid>
        <Hidden xsDown>
          <Grid
            item
            md={5}
            xs={12}
            className={classes.secondSection}>
            <Grid
              container
              spacing={0}
              direction="column"
              alignItems="center"
              justify={"center"}
              style={{ height: "100%" }}
            >
              <Box p={4}>
                <img
                  style={{ maxWidth: "100%", verticalAlign: "middle" }}
                  src={LoginLogo}
                />
              </Box>
            </Grid>
          </Grid>
        </Hidden>
      </Grid>) : (<Loader backgroundColor={grey[200]}/>)}
    </div>
  );
}
