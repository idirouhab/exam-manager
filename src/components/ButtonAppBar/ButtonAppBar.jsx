import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {drawerWidth} from "../../variables/general";
import routes from '../../routes';
import Button from "@material-ui/core/Button";
import {useTranslation} from "react-i18next";
import Auth from "../../providers/auth";

const useStyles = makeStyles((theme) => (
    {

        appBar: {
            [theme.breakpoints.up('sm')]: {
                width: `calc(100% - ${drawerWidth}px)`,
                marginLeft: drawerWidth,
            },
            color: '#fff',
            backgroundColor: "#1976d2",
        },
        menuButton: {
            marginRight: theme.spacing(2),
            [theme.breakpoints.up('sm')]: {
                display: 'none',
            },
        },
        title: {
            flexGrow: 1,
        },
    }));


export default function ButtonAppBar(props) {
    const classes = useStyles();
    const {t} = useTranslation("common");

    const getBrand = () => {
        let brandName = "Default Brand";
        routes.map((prop, key) => {
            if (window.location.href.indexOf(prop.section + prop.path) !== -1) {
                brandName = prop.name;
            }
            return null;
        });
        return t(`sections.${brandName}`);
    };

    const logout = () => {
        Auth.logout()
        window.location.reload(false);

    };

    return (
        <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={props.handleDrawerToggle}
                    className={classes.menuButton}
                >
                    <MenuIcon/>
                </IconButton>
                <Typography variant="h6" noWrap className={classes.title}>
                    {getBrand()}
                </Typography>
                <Button color="inherit" onClick={logout}>{t(`logout`)}</Button>
            </Toolbar>
        </AppBar>
    );
}
