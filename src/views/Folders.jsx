import React, {Fragment, useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {Add} from "@material-ui/icons";
import {useTranslation} from "react-i18next";
import CreateFolderModal from "../components/Folders/CreateFolderModal";
import FolderProvider from "../providers/folder";
import FolderModel from "../models/folder";
import Tag from "../models/tag";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";

import FolderIcon from '@material-ui/icons/Folder';

import Chip from "@material-ui/core/Chip";
import {Link as RouterLink} from "react-router-dom";
import green from "@material-ui/core/colors/green";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles((theme) => ({

    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,

    },
    listItem: {
        cursor: "pointer",
        textAlign: 'center',
    },
    paperHeader: {
        padding: theme.spacing(2),
        textAlign: 'left',
        color: theme.palette.text.secondary,
    },
    chip: {
        margin: theme.spacing(0.5),
    },
    green: {
        color: '#fff',
        backgroundColor: green[500],
        "&:hover": {
            backgroundColor: green[700]
        }
    },
}));

export default function Folders() {

    const [open, setOpen] = useState(false);
    const [folders, setFolders] = useState([]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        getFolders();
    }, [open]);

    const getFolders = () => {
        FolderProvider.fetchFolders().then(response => {
            const responseFolders = response.data;
            let finalFolder = responseFolders.map(folder => {
                let tags = folder.tags.map(tag => {

                    return new Tag(tag._id, tag.name);
                });

                return new FolderModel(folder.id, folder.name, tags)
            });
            setFolders(finalFolder);
        });
    };

    const createFolder = (folder) => {

        FolderProvider.saveFolder(folder).then(() => {
            setOpen(false);
        })
    };


    const getTagString = (tags) => {
        console.log(tags);
        let arrayTags = tags.map(tag => {
            return <Chip className={classes.chip} size="small" label={tag.name}/>;
        })
        return arrayTags;
    };

    const classes = useStyles();
    const {t} = useTranslation('common');
    return (
        <Fragment>
            <Grid container spacing={3}>
                {folders.map((folder, index) => {


                    return <Grid item xs={3} key={index}>
                        <Paper className={classes.paper}>
                            <List dense={false} className={classes.listItem}
                                  component={RouterLink}
                                  to={`/admin/folders/${folder.id}`}
                                  style={{textDecoration: "none", color: "inherit", textAlign: "center"}}
                            >
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <FolderIcon/>
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={folder.name}
                                        secondary={getTagString(folder.tags)}


                                    />
                                    {/*<ListItemSecondaryAction>
                                        <IconButton edge="end" aria-label="delete">
                                            <DeleteIcon/>
                                        </IconButton>
                                    </ListItemSecondaryAction>*/}
                                </ListItem>
                            </List>
                        </Paper>
                    </Grid>
                })}

                <Grid item xs={3}>
                    <Paper className={classes.paper}>
                        <List dense={false} className={classes.listItem}
                        >
                            <ListItem>

                                <ListItemText
                                    style={{textAlign: "center"}}
                                    primary={<IconButton aria-label="delete" className={classes.green}
                                                         onClick={handleClickOpen}>
                                        <Add fontSize="large"/>
                                    </IconButton>}
                                />

                            </ListItem>
                        </List>


                    </Paper>
                </Grid>
            </Grid>
            <CreateFolderModal createFolder={createFolder} open={open} handleClose={handleClose}/>
        </Fragment>
    );
}