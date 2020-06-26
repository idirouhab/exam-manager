import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { LANGUAGES_LABEL } from "../variables/general";
import Button from "@material-ui/core/Button";
import { useTranslation } from "react-i18next";
import MenuItem from "@material-ui/core/MenuItem";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import { Box } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import { useSnackbar } from "notistack";
import userProvider from "../providers/user";
import RegisterLogo from "../assets/register/undraw_register.svg";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";

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
    secondSectionImage: {
      backgroundImage: `url(${RegisterLogo})`,
      backgroundSize: "cover"
    },
    enterButton: {
      width: "100%"
    }
  }));

export default function Register () {
  const { t } = useTranslation("landing");
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [language, setLanguage] = useState(LANGUAGES_LABEL.find(language => language.code === "en"));
  const [submitted, setSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [open, setOpen] = useState(false);
  const errorSnackOptions = {
    variant: "error",
    anchorOrigin: {
      vertical: "top",
      horizontal: "center",
    }
  };
  const handleClose = () => {
    setOpen(false);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    if (username && password && name && lastName) {
      userProvider.saveUser(
        {
          username,
          password,
          name,
          lastName,
          language
        }
      ).then((response) => {
        const { data } = response;
        if (data.error) {
          enqueueSnackbar(t(`api:${data.error}`), errorSnackOptions);
        } else {
          setOpen(true);
        }
      }).catch(err => {
        enqueueSnackbar(err.message, errorSnackOptions);
      });
    }
  };

  return (
    <div className={classes.root}>
      <CssBaseline/>
      <Grid
        container
        spacing={0}
        className={classes.firstBlock}>
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
                  src={RegisterLogo}
                />
              </Box>
            </Grid>
          </Grid>
        </Hidden>
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
                <strong>{t("register")}</strong>
              </Typography>
              <form onSubmit={onSubmit}>
                <Box mb={3}>
                  <TextField
                    fullWidth
                    label={t("register_name")}
                    variant="outlined"
                    onChange={(e) => {setName(e.target.value);}}
                    value={name}
                    error={name.length === 0 && submitted}
                    helperText={name.length === 0 && submitted ? t("input.error.empty") : ""}
                  />
                </Box>
                <Box mt={2}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    label={t("register_lastname")}
                    onChange={(e) => {setLastName(e.target.value);}}
                    value={lastName}
                    error={lastName.length === 0 && submitted}
                    helperText={lastName.length === 0 && submitted ? t("input.error.empty") : ""}
                  />
                </Box>
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
                <Box mt={2}>
                  <FormControl
                    fullWidth
                    variant="outlined"
                    style={{ textAlign: "left" }}
                  >
                    <InputLabel htmlFor="select-language">{t("register_language")}</InputLabel>
                    <Select
                      onChange={(e) => {setLanguage(e.target.value);}}
                      className={classes.selectEmpty}
                      label={t("register_language")}
                      defaultValue={language.code}
                    >
                      {LANGUAGES_LABEL.map(language => {
                        return (<MenuItem key={language.code} value={language.code}>{language.text}</MenuItem>);
                      })}
                    </Select>

                  </FormControl>
                </Box>
                <Box my={5}>
                  <Button href="/login" color="primary">
                    {t("sign_in_instead")}
                  </Button>
                </Box>
                <Box>
                  <Button variant="contained" color="primary" type="submit"
                          className={classes.enterButton}
                          id={"register_submit"}>
                    {t("register_submit")}
                  </Button>
                </Box>
              </form>
            </Grid>
          </Grid>
        </Grid>
        <Dialog
          open={open}
          onClose={handleClose}
        >
          <DialogContent>
            <DialogContentText>
              {t("check_inbox", { username: username })}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              {t("close")}
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
    </div>
  );
}
