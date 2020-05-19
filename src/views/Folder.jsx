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

export default function Folder(props) {
    const classes = useStyles();
    const [folder, setFolder] = useState(new FolderModel());

    useEffect(() => {
        getFolder();
    }, []);

    const getFolder = () => {

        const {id} = props.match.params;
        FolderProvider.fetchFolder(id).then(response => {
            const responseFolder = response.data;
            let tags = responseFolder.tags.map(tag => {
                return new Tag(tag._id, tag.name);
            });
            setFolder(new FolderModel(responseFolder.id, responseFolder.name, tags));
        });
    };


    const {t} = useTranslation('common');
    return (
        <Fragment>
            <Grid container spacing={3}>
                <Paper className={classes.paper}>{folder.name}</Paper>
            </Grid>
        </Fragment>

    );
}