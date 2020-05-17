import React, {useState} from "react";
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
import userProvider from "../providers/user";

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


export default function Register(props) {

    const classes = useStyles();
    const {t} = useTranslation('common');

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [submitted, setSubmitted] = useState(false);


    const updateLastName = (e) => {
        setLastName(e.target.value);
    };

    const updateName = (e) => {
        setName(e.target.value);
    };

    const updateUsername = (e) => {
        setUsername(e.target.value);
    };

    const updatePassword = (e) => {
        setPassword(e.target.value);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);

        if (username && password && name && lastName) {
            userProvider.saveUser(
                {
                    username,
                    password,
                    name,
                    lastName,
                }
            ).then(() => {
                props.history.push('/public/login')
            })
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
                                        title={t('register')}/>
                                    <CardContent>
                                        <form className={classes.form} onSubmit={onSubmit}>
                                            <Box mt={3} style={{textAlign: "center"}}>
                                                <TextField
                                                    variant="outlined"
                                                    label={t('register_name')}
                                                    onChange={updateName}
                                                    value={name}
                                                    error={name.length === 0 && submitted}
                                                    helperText={name.length === 0 && submitted ? t('input.error.empty') : ""}
                                                />
                                            </Box>

                                            <Box mt={3} style={{textAlign: "center"}}>
                                                <TextField
                                                    variant="outlined"
                                                    label={t('register_lastname')}
                                                    onChange={updateLastName}
                                                    value={lastName}
                                                    error={lastName.length === 0 && submitted}
                                                    helperText={lastName.length === 0 && submitted ? t('input.error.empty') : ""}
                                                />
                                            </Box>
                                            <Box mt={3} style={{textAlign: "center"}}>
                                                <TextField
                                                    variant="outlined"
                                                    label={t('register_email')}
                                                    onChange={updateUsername}
                                                    type={"email"}
                                                    value={username}
                                                    error={username.length === 0 && submitted}
                                                    helperText={username.length === 0 && submitted ? t('input.error.empty') : ""}
                                                />
                                            </Box>
                                            <Box mt={3} style={{textAlign: "center"}}>
                                                <TextField
                                                    variant="outlined"
                                                    label={t('register_password')}
                                                    onChange={updatePassword}
                                                    value={password}
                                                    type="password"
                                                    error={password.length === 0 && submitted}
                                                    helperText={password.length === 0 && submitted ? t('input.error.empty') : ""}
                                                />
                                            </Box>
                                            <Box mt={3} style={{textAlign: "center"}}>
                                                <Button variant="contained" color="primary" type="submit">
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




