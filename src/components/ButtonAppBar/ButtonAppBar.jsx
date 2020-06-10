import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { drawerWidth, LANGUAGE, LANGUAGES_LABEL } from "../../variables/general";
import routes from "../../routes";
import Button from "@material-ui/core/Button";
import { useTranslation } from "react-i18next";
import Auth from "../../providers/auth";
import TranslateIcon from "@material-ui/icons/Translate";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { ExitToApp, NoteAdd } from "@material-ui/icons";
import green from "@material-ui/core/colors/green";
import Tooltip from "@material-ui/core/Tooltip";
import Link from "@material-ui/core/Link";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles((theme) => (
  {
    root: {
      display: "flex",
    },
    grow: {
      flex: "1 1 auto",
    },
    language: {
      margin: theme.spacing(0, 0.5, 0, 1),
      display: "none",
      [theme.breakpoints.up("md")]: {
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
  }));

const ITEM_HEIGHT = 48;
export default function ButtonAppBar (props) {
  const classes = useStyles();
  const { t } = useTranslation("common");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const logout = () => {
    Auth.logout();
    window.location.reload();
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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

          <Tooltip title={t("change_language")} enterDelay={300}>
            <Button
              color="inherit"
              onClick={handleClick}
            >
              <TranslateIcon/>
              <span className={classes.language}>
              {LANGUAGES_LABEL.filter((language) => {
                return language.code === LANGUAGE;
              })[0].text}
              </span>
              <ExpandMoreIcon fontSize="small"/>
            </Button>
          </Tooltip>
          <Menu
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
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
                        onClick={handleClose}>
                {language.text}
              </MenuItem>
            ))}
          </Menu>
          <Tooltip title={t("sections.create-exam")} enterDelay={300}>
            <IconButton
              color="inherit"
              component={Link}

              href={"create-exam"}
            >
              <NoteAdd/>
            </IconButton>
          </Tooltip>
          <Tooltip title={t("logout")} enterDelay={300}>
            <IconButton
              color="inherit"
              onClick={logout}
            >
              <ExitToApp/>
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
    </div>
  );
}
