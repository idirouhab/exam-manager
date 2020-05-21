import React, {useEffect, useState} from "react";
import Grid from "@material-ui/core/Grid";
import {Box} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import TextField from "@material-ui/core/TextField";
import {makeStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import {useTranslation} from "react-i18next";
import Auth from '../providers/auth';
import {useSnackbar} from "notistack";

const useStyles = makeStyles((theme) => ({
    form: {
        '& .MuiTextField-root': {
            width: '50%',
        }
    },
    root: {
        backgroundColor: '#F4F3F0',
        height: "100%"
    }
}));


export default function Login(props) {

    const classes = useStyles();
    const {t} = useTranslation('common');
    const {enqueueSnackbar} = useSnackbar();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [redirectToReferrer, setRedirectToReferrer] = useState(false);

    const {from} = {from: {pathname: '/admin/home'}}


    useEffect(() => {
        if (redirectToReferrer) {
            props.history.push(from)
        }

    }, [redirectToReferrer, from, props])

    const updateUsername = (e) => {
        setUsername(e.target.value);
    };

    const updatePassword = (e) => {
        setPassword(e.target.value);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);

        if (username && password) {
            Auth.login(username, password).then(() => {
                setRedirectToReferrer(true);
            }).catch((err) => {
                const options = {
                    variant: 'error',
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'center',
                    }
                };

                if (err.response) {
                    if (e.response.status === 404) {
                        enqueueSnackbar(t('login_user_not_found'), options)
                    } else {
                        enqueueSnackbar(e.response.data.message, options)
                    }
                    // client never received a response, or request never left
                } else {
                    enqueueSnackbar('ask_admin', options)
                }
            });
        }
    };

    return (
        <>
            <div className={classes.root}>
                <Grid container spacing={0}>
                    <Grid item xs={3}/>
                    <Grid item xs={6}>
                        <Box mt={8}>
                            <Paper elevation={5}>
                                <Card>
                                    <CardHeader
                                        title={t('login')}/>
                                    <CardContent>
                                        <form className={classes.form} onSubmit={onSubmit}>
                                            <div style={{textAlign: "center"}}>
                                                <TextField
                                                    id={"login_name"}
                                                    variant="outlined"
                                                    label={t('login_user')}
                                                    onChange={updateUsername}
                                                    value={username}
                                                    error={username.length === 0 && submitted}
                                                    helperText={username.length === 0 && submitted ? t('input.error.empty') : ""}
                                                />
                                            </div>
                                            <Box mt={3} style={{textAlign: "center"}}>
                                                <TextField
                                                    id={"login_password"}
                                                    variant="outlined"
                                                    label={t('login_password')}
                                                    onChange={updatePassword}
                                                    value={password}
                                                    type="password"
                                                    error={password.length === 0 && submitted}
                                                    helperText={password.length === 0 && submitted ? t('input.error.empty') : ""}
                                                />
                                            </Box>
                                            <Box mt={3} style={{textAlign: "center"}}>
                                                <Button variant="contained" color="primary" type="submit"
                                                        id={"login_submit"}>
                                                    {t('login_accept')}
                                                </Button>
                                            </Box>
                                        </form>

                                    </CardContent>
                                </Card>
                            </Paper>
                        </Box>
                    </Grid>
                </Grid>
            </div>
        </>
    );
}




