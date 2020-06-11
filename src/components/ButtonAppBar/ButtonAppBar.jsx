import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { drawerWidth, LANGUAGE, LANGUAGES_LABEL } from "../../variables/general";
import Button from "@material-ui/core/Button";
import { useTranslation } from "react-i18next";
import Auth from "../../providers/auth";
import TranslateIcon from "@material-ui/icons/Translate";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { ExitToApp, NoteAdd } from "@material-ui/icons";
import Tooltip from "@material-ui/core/Tooltip";
import Link from "@material-ui/core/Link";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreIcon from "@material-ui/icons/MoreVert";
import AccountCircle from "@material-ui/icons/AccountCircle";

const useStyles = makeStyles((theme) => (
  {
    root: {
      display: "flex",
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
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
      },
      transition: theme.transitions.create("width"),
    },
    menuButton: {
      color: "#fff",
      marginRight: theme.spacing(2),
      [theme.breakpoints.up("sm")]: {
        display: "none",
      },
    },
    dropDownButton: {
      textTransform: "none",
    }
  }));

const ITEM_HEIGHT = 48;
export default function ButtonAppBar (props) {
  const classes = useStyles();
  const { t } = useTranslation();
  const [anchorElLanguage, setAnchorElLanguage] = React.useState(null);
  const [anchorElProfile, setAnchorElProfile] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const isLanguageMenuOpen = Boolean(anchorElLanguage);
  const isProfileMenuOpen = Boolean(anchorElProfile);

  const logout = () => {
    Auth.logout();
    window.location.reload();
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorElProfile(event.currentTarget);
  };

  const handleLanguageMenuOpen = (event) => {
    setAnchorElLanguage(event.currentTarget);
  };

  const handleLanguageMenuClose = () => {
    setAnchorElLanguage(null);
  };

  const handleProfileMenuClose = () => {
    setAnchorElProfile(null);
  };

  const menuProfileId = "primary-search-account-menu";
  const renderProfileMenu = (
    <Menu
      anchorEl={anchorElProfile}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuProfileId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isProfileMenuOpen}
      onClose={handleProfileMenuClose}
    >
      <MenuItem onClick={handleProfileMenuClose}>
        <Button
          className={classes.dropDownButton}
          color="inherit"
          onClick={logout}
          startIcon={<ExitToApp/>}
        >
          {t("logout")}
        </Button>
      </MenuItem>
    </Menu>
  );

  const menuId = "primary-search-account-menu";
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
          color="inherit"
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
      <MenuItem>
        <IconButton
          color="inherit"
          component={Link}

          href={"create-exam"}
        >
          <NoteAdd/>
        </IconButton>
        <p>{t("sections.create-exam")}</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle/>
        </IconButton>
        <p>{t('profile')}</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.root}>
      <AppBar elevation={1} position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            onClick={props.handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon/>
          </IconButton>
          <div className={classes.grow}/>

          <div className={classes.sectionDesktop}>
            <Tooltip title={t("change_language")} enterDelay={300}>
              <Button
                edge="end"
                aria-controls={menuId}
                aria-haspopup="true"
                color="inherit"
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

            <Tooltip title={t("sections.create-exam")} enterDelay={300}>
              <IconButton
                color="inherit"
                component={Link}

                href={"create-exam"}
              >
                <NoteAdd/>
              </IconButton>
            </Tooltip>
            <Tooltip title={t("profile")} enterDelay={300}>
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle/>
              </IconButton>
            </Tooltip>

          </div>

          <div className={classes.sectionMobile}>
            <IconButton
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon/>
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderLanguageMenu}
      {renderProfileMenu}
    </div>
  );
}
