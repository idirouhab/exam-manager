import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
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
import { ExpandMore } from "@material-ui/icons";
import green from "@material-ui/core/colors/green";

const useStyles = makeStyles((theme) => (
  {
    root: {
      "& > *": {
        margin: theme.spacing(1),
      },
    },
    appBar: {
      [theme.breakpoints.up("sm")]: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
      },
      backgroundColor: "#fff",
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up("sm")]: {
        display: "none",
      },
    },
    title: {
      flexGrow: 1,
    },
    sectionDesktop: {
      display: "none",
      [theme.breakpoints.up("md")]: {
        display: "flex",
      },
    },
    sectionSmall: {
      [theme.breakpoints.up("sm")]: {
        display: "none",
      },
    },
    green: {
      color: "#fff",
      backgroundColor: green[500],
      "&:hover": {
        backgroundColor: green[700]
      }
    },
  }));

const ITEM_HEIGHT = 48;
export default function ButtonAppBar (props) {
  const classes = useStyles();
  const { t } = useTranslation("common");

  const [anchorEl, setAnchorEl] = React.useState(null);

  const getBrand = () => {
    let brandName = "Default Brand";
    routes.map((prop, key) => {
      if (window.location.href.indexOf(prop.section + "/" + prop.name) !== -1) {
        brandName = prop.name;
      }
      return null;
    });
    return t(`sections.${brandName}`);
  };

  const logout = () => {
    Auth.logout();
    window.location.reload(false);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Fragment>
      <AppBar elevation={1} position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            aria-label="open drawer"
            edge="start"
            onClick={props.handleDrawerToggle}
            className={classes.menuButton}
          >
            <Typography/>
            <MenuIcon/>
          </IconButton>
          <Typography variant="h6" noWrap className={classes.title}>
            {getBrand()}
          </Typography>
          <div className={classes.root}>
            <Button href={"create-exam"} variant="contained"
                    className={classes.green}>{t(`sections.create-exam`)}</Button>
            <Button
              color={"primary"}
              onClick={handleClick}
              variant="contained"
            >
              <TranslateIcon/>
              <Typography className={classes.sectionDesktop} variant={"button"}>&nbsp;
                {LANGUAGES_LABEL.filter((language) => {
                  return language.code === LANGUAGE;
                })[0].text}
              </Typography>
              <ExpandMore fontSize="small"/>
            </Button>
            <Menu
              id="long-menu"
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
                          component="a"
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
           <Button variant="contained" color={"primary"} onClick={logout}>{t(`logout`)}</Button>
          </div>
        </Toolbar>
      </AppBar>
    </Fragment>
  );
}
