import React, {Fragment} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {LibraryAdd} from "@material-ui/icons";
import Button from "@material-ui/core/Button";
import {useTranslation} from "react-i18next";
import CreateFolderModal from "../components/Folders/CreateFolderModal";

const useStyles = makeStyles((theme) => ({

    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    paperHeader: {
        padding: theme.spacing(2),
        textAlign: 'left',
        color: theme.palette.text.secondary,
    }


}));


export default function Folders() {

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
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
                        <CreateFolderModal open={open} handleClose={handleClose}/>
                    </Paper>
                </Grid>
            </Grid>
            <Grid container spacing={3}>

                <Grid item xs={4}>
                    <Paper className={classes.paper}>xs=6</Paper>
                </Grid>
                <Grid item xs={4}>
                    <Paper className={classes.paper}>xs=6</Paper>
                </Grid>
                <Grid item xs={4}>
                    <Paper className={classes.paper}>xs=6</Paper>
                </Grid>
                <Grid item xs={4}>
                    <Paper className={classes.paper}>xs=6</Paper>
                </Grid>

            </Grid>
        </Fragment>

    );
}