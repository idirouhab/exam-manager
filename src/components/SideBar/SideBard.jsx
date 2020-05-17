import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import {Link as RouterLink} from 'react-router-dom';
import Icon from "@material-ui/core/Icon";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import {drawerWidth} from "../../variables/general";
import {useTranslation} from "react-i18next";

const useStyles = makeStyles((theme) => ({
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },

    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
    },

}));

function ListItemLink(props) {
    const {icon, primary, to, selected, style, id} = props;
    const renderLink = React.useMemo(
        () => React.forwardRef((itemProps, ref) => <RouterLink id={id} style={style} to={to} ref={ref} {...itemProps} />),
        [to],
    );

    return (
        <ListItem button component={renderLink} selected={selected}>
            {icon ? <ListItemIcon><Icon>{icon}</Icon></ListItemIcon> : null}
            <ListItemText primary={primary}/>
        </ListItem>
    );
}


export default function SideBar(props) {
    const classes = useStyles();
    const {routes} = props;
    const {t} = useTranslation("common");


    const activeRoute = (routeName) => {
        return props.location.pathname.indexOf(routeName) > -1;
    };


    const drawer = (<div>
            <div className={classes.toolbar}/>
            <Divider/>
            <List>
                {routes.map((prop, index) => {
                    let hidden = (prop.hide) ? {display: "none"} : {};
                    return (<ListItemLink
                        key={index}
                        to={prop.section + prop.path}
                        primary={t(`sections.${prop.name}`)}
                        icon={prop.icon}
                        selected={activeRoute(prop.path)}

                        id={index}
                        style={hidden}
                    />)
                })}
            </List>
        </div>
    );

    return (
        <nav className={classes.drawer} aria-label="mailbox folders">
            <Hidden smUp implementation="css">
                <Drawer

                    container={props.container}
                    variant="temporary"
                    anchor={props.theme.direction === 'rtl' ? 'right' : 'left'}
                    open={props.mobileOpen}
                    onClose={props.handleDrawerToggle}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    ModalProps={{
                        keepMounted: true,
                    }}
                >
                    {drawer}
                </Drawer>
            </Hidden>
            <Hidden xsDown implementation="css">
                <Drawer
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    variant="permanent"
                    open
                >
                    {drawer}
                </Drawer>
            </Hidden>
        </nav>
    );
}
