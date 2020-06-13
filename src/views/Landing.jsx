import React, { Fragment, useEffect, useRef, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import { LANGUAGE, LANGUAGES_LABEL } from "../variables/general";
import Button from "@material-ui/core/Button";
import { useTranslation } from "react-i18next";
import TranslateIcon from "@material-ui/icons/Translate";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { Chat, ExitToApp } from "@material-ui/icons";
import Tooltip from "@material-ui/core/Tooltip";
import Link from "@material-ui/core/Link";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Logo from "../assets/images/logo.png";
import Box from "@material-ui/core/Box";
import MenuIcon from "@material-ui/icons/Menu";
import { HideUntilLoaded } from "react-animation";
import Grid from "@material-ui/core/Grid";
import ImageLogo from "../assets/images/landing-first-section.jpg";
import Hidden from "@material-ui/core/Hidden";
import Fab from "@material-ui/core/Fab";
import ChatBar from "../components/Common/ChatBar";
import { OptimizelyFeature } from "@optimizely/react-sdk";

const useStyles = (toolbarHeight) => makeStyles((theme) => (
  {
    root: {
      flexGrow: 1,
      backgroundColor: "#F5F5F5",
      height: "100vh"
    },
    bubble: {
      position: "fixed",
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
    toolbar: {
      backgroundColor: "#fff"
    },
    grow: {
      flex: "1 1 auto",
    },
    sectionDesktop: {
      display: "none",
      [theme.breakpoints.up("md")]: {
        display: "flex",
      },
    },
    sectionMobile: {
      display: "flex",
      [theme.breakpoints.up("md")]: {
        display: "none",
      },
    },
    language: {
      margin: theme.spacing(0, 0.5, 0, 1),
      display: "none",
      [theme.breakpoints.up("md")]: {
        display: "block",
      },
    },
    languageMobile: {
      margin: theme.spacing(0, 0.5, 0, 1),
      display: "none",
      [theme.breakpoints.down("md")]: {
        display: "block",
      },
    },
    appBar: {
      [theme.breakpoints.up("sm")]: {
        width: "100%",
      },
      transition: theme.transitions.create("width"),
    },
    menuLogo: {
      marginLeft: theme.spacing(2),
      marginTop: theme.spacing(1),
      maxWidth: 35,
    },
    firstBlock: {
      height: `calc(100% - ${toolbarHeight}px)`,
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
    chatBarContent: {
      width: "30vw",
      [theme.breakpoints.down("sm")]: {
        width: "100vw",
      },
    }
  }));

const ITEM_HEIGHT = 48;
export default function Landing () {
  const { t } = useTranslation("landing");
  const [anchorElLanguage, setAnchorElLanguage] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const isLanguageMenuOpen = Boolean(anchorElLanguage);
  const toolbarRef = useRef(null);
  const [toolbarHeight, setToolbarHeight] = useState(0);
  const [open, setOpen] = useState(false);
  const classes = useStyles(toolbarHeight)();

  useEffect(() => {
    setToolbarHeight(toolbarRef.current.clientHeight);

  }, []);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleLanguageMenuOpen = (event) => {
    setAnchorElLanguage(event.currentTarget);
  };

  const handleLanguageMenuClose = () => {
    setAnchorElLanguage(null);
  };

  const menuId = "primary-select-language-menu";
  const renderLanguageMenu = (
    <Menu
      anchorEl={anchorElLanguage}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isLanguageMenuOpen}
      onClose={handleLanguageMenuClose}
      PaperProps={{
        style: {
          maxHeight: ITEM_HEIGHT * 4.5,
          width: "20ch",
        },
      }}
    >
      {LANGUAGES_LABEL.map((language) => (
        <MenuItem key={language.code}
                  component={Link}
                  data-no-link="true"
                  href={`?lng=${language.code}`}
                  selected={language.code === LANGUAGE}
                  lang={language.code}
                  hrefLang={language.code}
                  onClick={handleLanguageMenuClose}>
          {language.text}
        </MenuItem>
      ))}
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleLanguageMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="primary"
          variant="contained"
        >
          <TranslateIcon/>
        </IconButton>
        <p>
          {LANGUAGES_LABEL.filter((language) => {
            return language.code === LANGUAGE;
          })[0].text}
        </p>
        <ExpandMoreIcon fontSize="small"/>
      </MenuItem>
      <MenuItem
        component={Link}
        href={"/login"}
      >
        <IconButton
          color="primary"
          variant="contained"
        >
          <ExitToApp/>
        </IconButton>
        <p>{t("login_button")}</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.root}>
      <CssBaseline/>
      <AppBar
        ref={toolbarRef}
        elevation={0}
        position="static"
        className={classes.appBar}
      >
        <HideUntilLoaded
          animationIn="bounceIn"
        >
          <Toolbar className={classes.toolbar}>
            <Typography variant="body2" component={"div"} className={classes.title} gutterBottom>
              <img className={classes.menuLogo} src={Logo} alt={"logo"}/>
            </Typography>
            <div className={classes.grow}/>
            <div className={classes.sectionDesktop}>
              <Box mr={2}>
                <Tooltip title={t("change_language")} enterDelay={300}>
                  <Button
                    edge="end"
                    aria-controls={menuId}
                    aria-haspopup="true"
                    variant="contained"
                    color="primary"
                    onClick={handleLanguageMenuOpen}
                  >
                    <TranslateIcon/>
                    <p className={classes.language}>
                      {LANGUAGES_LABEL.filter((language) => {
                        return language.code === LANGUAGE;
                      })[0].text}
                    </p>
                    <ExpandMoreIcon fontSize="small"/>
                  </Button>
                </Tooltip>
              </Box>
              <Button
                edge="end"
                color="primary"
                variant="contained"
                href={"/login"}
              >
                <ExitToApp/>
                <p className={classes.language}>
                  {t("login_button")}
                </p>

              </Button>
            </div>
            <div className={classes.sectionMobile}>
              <IconButton
                edge="start"
                aria-controls={mobileMenuId}
                onClick={handleMobileMenuOpen}
                color="primary"
                variant="contained"
              >
                <MenuIcon/>
              </IconButton>
            </div>
          </Toolbar>
        </HideUntilLoaded>
      </AppBar>
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
                href={"/register"}
              >{t("create_account")}</Button>
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
            >
            </Grid>
          </Grid>
        </Hidden>
      </Grid>

      <OptimizelyFeature feature="sidebar_chat">
        {(isEnabled) => (
          isEnabled && (
            <Fragment>
              <ChatBar
                open={open}
                setOpen={setOpen}
                toolbarHeight={toolbarHeight}
              />
              <div
                style={{ display: open ? "none" : "" }}
                className={classes.bubble}
              >
                <Fab color="secondary" size="large" aria-label="scroll back to top" onClick={() => setOpen(!open)}>
                  <Chat/>
                </Fab>
              </div>
            </Fragment>)
        )}

      </OptimizelyFeature>
      {renderMobileMenu}
      {renderLanguageMenu}
    </div>
  );
}
