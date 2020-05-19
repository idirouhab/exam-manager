import React, {Fragment, useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {LibraryAdd} from "@material-ui/icons";
import Button from "@material-ui/core/Button";
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
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';
import Chip from "@material-ui/core/Chip";
import {Link as RouterLink} from "react-router-dom";

const useStyles = makeStyles((theme) => ({

    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,

    },
    listItem: {
        cursor: "pointer"
    },
    paperHeader: {
        padding: theme.spacing(2),
        textAlign: 'left',
        color: theme.palette.text.secondary,
    },
    chip: {
        margin: theme.spacing(0.5),
    }
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
                <Grid item xs={6}>
                    <Paper className={classes.paperHeader}>


                        <Button
                            variant="contained"
                            className={classes.iconButton}
                            startIcon={<LibraryAdd/>}
                            onClick={handleClickOpen}
                        >
                            {t('create_folder')}
                        </Button>

                    </Paper>
                </Grid>
            </Grid>
            <Grid container spacing={3}>
                {folders.map((folder, index) => {


                    return <Grid item xs={3} key={index}>
                        <Paper className={classes.paper}>
                            <List dense={false} className={classes.listItem}
                                  component={RouterLink}
                                  to={`/admin/folders/${folder.id}`}
                                  style={{textDecoration: "none", color: "inherit"}}
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
            </Grid>
            <CreateFolderModal createFolder={createFolder} open={open} handleClose={handleClose}/>
        </Fragment>
    );
}