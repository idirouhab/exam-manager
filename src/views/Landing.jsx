import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Logo from "../assets/images/logo.png";
import Typography from "@material-ui/core/Typography";
import { useTranslation } from "react-i18next";
import Grid from "@material-ui/core/Grid";
import CssBaseline from "@material-ui/core/CssBaseline";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Button from "@material-ui/core/Button";
import ImageLogo from "../assets/images/landing-first-section.jpg";
import { ExitToApp } from "@material-ui/icons";
import { HideUntilLoaded } from "react-animation";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles((theme) => ({
  appBar: {
    top: "auto",
    bottom: 0,
  },
  toolbar: {
    padding: 0,
    backgroundColor: "#fff"
  },
  menuLogin: {
    width: "100%",
    padding: theme.spacing(1),
    textAlign: "right",
  },
  menuLogo: {
    padding: theme.spacing(1),
    alignItems: "center",
    textAlign: "center",
    width: "100%",
    position: "fixed"
  },
  root: {
    flexGrow: 1,
    backgroundColor: "#F5F5F5",
    height: "100vh"
  },
  firstBlock: {
    height: "80%",
  },
  firstSection: {
    alignItems: "center",
    textAlign: "center",
    backgroundColor: theme.palette.primary.main,
    color: "#fff",
  },
  secondSection: {
    alignItems: "center",
    textAlign: "center",
    backgroundImage: `url(${ImageLogo})`,
    backgroundSize: "cover",
    color: "#fff",
    maxHeight: "100%",
  },
  createAccountButton: {
    backgroundColor: "#bdc1db",
    color: theme.palette.primary.main,
  },
  sectionDesktop: {
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },
  sectionMobile: {
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

function ElevationScroll (props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

export default function Landing (props) {
  const classes = useStyles();
  const { t } = useTranslation("landing");

  return (
    <div className={classes.root}>
      <CssBaseline/>
      <ElevationScroll {...props}>
        <AppBar elevation={0} position="static" className={classes.appBar}>
          <HideUntilLoaded
            animationIn="bounceIn"
          >
            <Toolbar className={classes.toolbar}>
              <div className={classes.menuLogo}>
              <span>
                <img
                  src={Logo}
                  style={{ maxWidth: "40px" }}
                  alt={"logo"}/>
                </span>
              </div>
              <div className={classes.menuLogin}>
                <Button
                  className={classes.sectionDesktop}
                  href={"/login"}
                  variant="contained"
                  color="primary"
                  endIcon={<ExitToApp/>}
                >
                  {t("login_button")}
                </Button>
                <IconButton
                  className={classes.sectionMobile}
                  href={"/login"}
                  variant="contained"
                  color="primary"
                >
                  <ExitToApp/>
                </IconButton>
              </div>
            </Toolbar>
          </HideUntilLoaded>
        </AppBar>

      </ElevationScroll>
        <Grid
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
                md={5}
                xs={9}
                style={{ textAlign: "left" }}
              >
                <Typography
                  paragraph
                  style={{ color: "#fff", }}
                  variant="h4"
                  color={"primary"}
                  component="h6"
                >
                  <strong>{t("header")}</strong>
                </Typography>
                <Typography
                  paragraph
                  style={{ color: "#fff", }}
                  variant="subtitle1"
                  component="p"
                  color={"primary"}
                  dangerouslySetInnerHTML={{ __html: t("body") }}
                />
                <Button
                  className={classes.createAccountButton}
                  variant="contained"
                  target="_blank" href={"/register"}
                >{t("create_account")}</Button>
              </Grid>
            </Grid>
          </Grid>

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
            >
            </Grid>
          </Grid>
        </Grid>
    </div>
  );
}
