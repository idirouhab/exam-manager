import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import { Box } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { useTranslation } from "react-i18next";
import imageBackground from "../assets/images/login_background.jpg";
import useWindowDimensions from "../hooks/resize";
import blue from "@material-ui/core/colors/blue";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import userProvider from "../providers/user";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import { LANGUAGES_LABEL } from "../variables/general";

export default function Register (props) {
  const { height, width } = useWindowDimensions();
  const useStyles = makeStyles((theme) => ({
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

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [language, setLanguage] = useState(LANGUAGES_LABEL.find(language => language.code === "en"));
  const [submitted, setSubmitted] = useState(false);
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    if (email && password && name && lastName) {
      userProvider.saveUser(
        {
          email,
          password,
          name,
          lastName,
          language
        }
      ).then(() => {
        setOpen(true);
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
              title={t("register")}/>
            <CardContent style={{ textAlign: "center" }}>
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
                    onChange={(e) => {setEmail(e.target.value);}}
                    type={"email"}
                    value={email}
                    error={email.length === 0 && submitted}
                    helperText={email.length === 0 && submitted ? t("input.error.empty") : ""}
                  />
                </Box>

                <Box mt={2}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    label={t("register_password")}
                    onChange={(e) => {setPassword(e.target.value);}}
                    value={password}
                    type="password"
                    error={password.length === 0 && submitted}
                    helperText={password.length === 0 && submitted ? t("input.error.empty") : ""}
                  />
                </Box>
                <Box mt={2}>
                  <FormControl variant="outlined" style={{ width: "100%" }}>
                    <InputLabel htmlFor="select-language">{t("register_language")}</InputLabel>
                    <Select
                      value={language}
                      onChange={(e) => {setLanguage(e.target.value);}}
                      variant="outlined"
                      native
                      label={t("register_language")}
                      inputProps={{
                        name: "language",
                        id: "select-language",
                      }}
                    >
                      {LANGUAGES_LABEL.map(language => {
                        return (<option key={language.code} value={language.code}>{language.text}</option>);
                      })}

                    </Select>
                  </FormControl>
                </Box>
                <Box my={5}>
                  <Typography variant="subtitle1">
                    <Link
                      href="/login"
                    >
                      {t("sign_in_instead")}
                    </Link>
                  </Typography>
                </Box>

                <Box>
                  <Button variant="contained" color="primary" type="submit"
                          className={classes.enterButton}
                          id={"register_submit"}>
                    {t("register_submit")}
                  </Button>
                </Box>
              </form>
            </CardContent>
          </Card>
        </Box>
        <Dialog
          open={open}
          onClose={handleClose}
        >
          <DialogContent>
            <DialogContentText>
              {t("check_inbox", { email: email })}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              {t("close")}
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
    </>
  );
}

