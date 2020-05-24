import React, {Fragment, useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Icon from "@material-ui/core/Icon";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import {drawerWidth} from "../../variables/general";
import {useTranslation} from "react-i18next";
import Collapse from "@material-ui/core/Collapse";
import {ExpandLess, ExpandMore, Folder} from "@material-ui/icons";
import FolderProvider from "../../providers/folder";
import FolderModel from "../../models/folder";

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
    nested: {
        paddingLeft: theme.spacing(4),
    },

}));


export default function SideBar(props) {
    const classes = useStyles();
    const {routes} = props;
    const {t} = useTranslation("common");
    const [open, setOpen] = useState(false);
    const [folders, setFolders] = useState([]);

    const activeRoute = (routeName) => {
        return props.location.pathname.indexOf(routeName) > -1;
    };

    const activeFolder = (folderId) => {
        return props.location.pathname.indexOf(folderId) > -1;
    };

    const handleClick = () => {
        setOpen(!open)
    };

    useEffect(() => {
        FolderProvider.fetchFolders().then(response => {
            const responseFolders = response.data;
            let finalFolder = responseFolders.map(folder => {
                return new FolderModel(folder.id, folder.name, [])
            });
            setFolders(finalFolder);
        });
    }, []);

    const renderDropdown = () => {
        return open ? <ExpandLess onClick={handleClick}/> : <ExpandMore onClick={handleClick}/>;
    };

    const drawer = (<div>
            <div className={classes.toolbar}/>
            <Divider/>
            <List>
                {routes.map((prop, index) => {
                    let hidden = (prop.hide) ? {display: "none"} : {};
                    return (
                        <Fragment key={`list_item_${index}`}>
                            <ListItem

                                id={index}
                                button
                                selected={activeRoute(prop.path)}
                                style={hidden}
                            >
                                {prop.icon ? <ListItemIcon><Icon>{prop.icon}</Icon></ListItemIcon> : null}
                                <ListItemText primary={t(`sections.${prop.name}`)}
                                              onClick={() => {
                                                  props.history.push(prop.section + prop.path)
                                              }}
                                />
                                {prop.nestedList && renderDropdown()}

                            </ListItem>
                            {prop.nestedList &&
                            <Collapse in={open} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    {folders.map((folder, index) => {
                                        return <ListItem button
                                                         key={index}
                                                         selected={activeRoute(folder.id)}
                                                         className={classes.nested}
                                                         onClick={() => {
                                                             props.history.push(`/admin/folders/${folder.id}`)
                                                         }}
                                        >
                                            <ListItemIcon>
                                                <Folder/>
                                            </ListItemIcon>
                                            <ListItemText primary={folder.name}/>
                                        </ListItem>

                                    })}
                                </List>
                            </Collapse>}
                        </Fragment>
                    )

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
