import React, {Fragment, useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {LibraryAdd} from "@material-ui/icons";
import Button from "@material-ui/core/Button";
import {useTranslation} from "react-i18next";
import CreateFolderModal from "../components/Folders/CreateFolderModal";
import FolderProvider from "../providers/folder";
import Folder from "../models/folder";
import Tag from "../models/tag";

const useStyles = makeStyles((theme) => ({

    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        cursor: "pointer"
    },
    paperHeader: {
        padding: theme.spacing(2),
        textAlign: 'left',
        color: theme.palette.text.secondary,
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
        getFolder();
    }, [open]);

    const getFolder = () => {
        FolderProvider.fetchFolders().then(response => {
            const responseFolders = response.data;
            let finalFolder = responseFolders.map(folder =>{
                let tags = folder.tags.map(tag=>{
                    return new Tag(tag._id, tag.name);
                });
                return new Folder(folder.id, folder.name, tags)
            });
            setFolders(finalFolder);
        });
    };

    const createFolder = (folder) => {

        FolderProvider.saveFolder(folder).then(() => {
            setOpen(false);
        })
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
                        <CreateFolderModal createFolder={createFolder} open={open} handleClose={handleClose}/>
                    </Paper>
                </Grid>
            </Grid>
            <Grid container spacing={3}>
                {folders.map(folder => {
                    return <Grid item xs={4}>
                        <Paper className={classes.paper}>{folder.name}</Paper>
                    </Grid>
                })}
            </Grid>
        </Fragment>

    );
}