import React, {Fragment, useState} from "react";
import Grid from "@material-ui/core/Grid";
import Loader from "../components/Loader/Loader";
import Slide from "@material-ui/core/Slide";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from '@material-ui/icons/Search';
import TextField from "@material-ui/core/TextField";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {JSONEditor} from 'react-json-editor-viewer';
import DocumentProvider from "../providers/document";
import {Send} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
        color: theme.palette.text.secondary,
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
}));

export default function Document() {
    const classes = useStyles();
    const [loading, setLoading] = useState(false);
    const [collectionName, setCollectionName] = useState("")
    const [collectionId, setCollectionId] = useState("")
    const [collection, setCollection] = useState({})
    const [data, setData] = useState({});

    const onDocumentUpdate = (key, value, parent, data) => {
        setCollection(data);
    };

    const getDocument = () => {
        setLoading(true);
        if (!collectionId) {
            DocumentProvider.fetchDocuments(collectionName)
                .then(data => setCollection(data))
                .finally(() => setLoading(false));
        } else {
            DocumentProvider.fetchDocument(collectionName, collectionId)
                .then(data => setCollection(data))
                .finally(() => setLoading(false));
        }
    };

    const updateDocument = () => {
        if (collectionId) {
            DocumentProvider.updateDocument(collectionName, collectionId, collection).then(response => console.log(response));
        }
    };

    return (
        <>
            <Fragment>
                <Slide direction="up" mountOnEnter unmountOnExit in={!loading}>
                    <Grid container spacing={3} justify={"center"}>
                        <Grid item xs={12}>
                            <Paper className={classes.paper}>
                                <TextField value={collectionName}
                                           onChange={event => setCollectionName(event.target.value)}
                                           className={classes.input} label="Collection name"/>
                                <TextField value={collectionId} onChange={event => setCollectionId(event.target.value)}
                                           className={classes.input} label="Collection ID"/>
                                <IconButton onClick={getDocument} className={classes.iconButton}>
                                    <SearchIcon/>
                                </IconButton>
                                <IconButton onClick={updateDocument} className={classes.iconButton}>
                                    <Send/>
                                </IconButton>
                            </Paper>
                        </Grid>
                        <Grid item xs={12}>
                            <Paper className={classes.paper}>

                                <JSONEditor
                                    data={collection}
                                    onChange={onDocumentUpdate}
                                    collapsible
                                />

                            </Paper>
                        </Grid>
                    </Grid>
                </Slide>
                {loading && (<Loader/>)}
            </Fragment>
        </>
    );
}
