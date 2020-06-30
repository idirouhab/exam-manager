import React, { useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import {useTranslation} from "react-i18next";
import {Visibility, VisibilityOff} from "@material-ui/icons";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import {Box} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import {useSnackbar} from "notistack";
import userProvider from "../providers/user";
import RegisterLogo from "../assets/register/undraw_register.svg";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";
import Divider from "@material-ui/core/Divider";
import queryString from 'query-string'

const useStyles = makeStyles((theme) => (
    {
        root: {
            flexGrow: 1,
            backgroundColor: "#F5F5F5",
            height: "100vh"
        },

        grow: {
            flex: "1 1 auto",
        },
        firstBlock: {
            height: `100%`,
        },
        firstSection: {
            alignItems: "center",
            textAlign: "center",
            color: "#000",
        },
        secondSection: {
            alignItems: "center",
            textAlign: "center",
            backgroundColor: theme.palette.primary.main,

        },
        enterButton: {
            width: "100%"
        }
    }));

export default function ResetPassword(props) {
    const {t} = useTranslation("api");
    const queryParams = queryString.parse(props.location.search);
    const classes = useStyles();
    const {enqueueSnackbar} = useSnackbar();

    const username = queryParams.username;
    const [password, setPassword] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const errorSnackOptions = {
        variant: "error",
        anchorOrigin: {
            vertical: "top",
            horizontal: "center",
        }
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const {token} = props.match.params;
        setSubmitted(true);
        if (password) {
            userProvider.resetPassword(username, password, token).then((response) => {
                const {data} = response;
                if (data.error) {
                    enqueueSnackbar(t(`api:${data.error}`), errorSnackOptions);
                } else {
                    props.history.push(`/login`);
                }
            }).catch(err => {
                enqueueSnackbar(err.message, errorSnackOptions);
            });
        }
    };

    return (
        <div className={classes.root}>
            <CssBaseline/>
            <Grid
                container
                spacing={0}
                className={classes.firstBlock}>
                <Hidden xsDown>
                    <Grid
                        item
                        md={5}
                        xs={12}
                        className={classes.secondSection}>
                        <Grid
                            container
                            spacing={0}
                            direction="column"
                            alignItems="center"
                            justify={"center"}
                            style={{height: "100%"}}
                        >
                            <Box p={4}>
                                <img
                                    style={{maxWidth: "100%", verticalAlign: "middle"}}
                                    src={RegisterLogo}
                                />
                            </Box>
                        </Grid>
                    </Grid>
                </Hidden>
                <Grid
                    item
                    md={7}
                    xs={12}
                    className={classes.firstSection}>
                    <Grid
                        container
                        spacing={0}
                        direction="column"
                        alignItems="center"
                        justify={"center"}
                        style={{height: "100%"}}
                    >
                        <Grid
                            item
                            md={6}
                            xs={9}

                            style={{textAlign: "left", width: "100%"}}
                        >
                            <Typography
                                paragraph
                                variant="h4"
                                color={"primary"}
                                component="h6"
                            >
                                <strong>{t("reset_password")}</strong>
                            </Typography>
                            <form onSubmit={onSubmit}>
                                <Box mb={3}>
                                    <TextField
                                        fullWidth
                                        label={t("register_email")}
                                        variant="outlined"
                                        value={username}
                                        disabled={true}
                                    />
                                </Box>
                                <Box mt={2}>
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        label={t("reset_new_password")}
                                        onChange={(e) => {
                                            setPassword(e.target.value);
                                        }}
                                        value={password}
                                        error={password.length === 0 && submitted}
                                        helperText={password.length === 0 && submitted ? t("input.error.empty") : ""}
                                        type={showPassword ? "text" : "password"}
                                        InputProps={{ // <-- This is where the toggle button is added.
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        onClick={() => setShowPassword(!showPassword)}
                                                    >
                                                        {showPassword ? <Visibility/> : <VisibilityOff/>}
                                                    </IconButton>
                                                </InputAdornment>
                                            )
                                        }}
                                    />
                                </Box>

                                <Box my={5}>
                                    <Button variant="contained" color="primary" type="submit"
                                            className={classes.enterButton}
                                            id={"register_submit"}>
                                        {t("recover_password")}
                                    </Button>
                                </Box>
                                <Box mb={2}>
                                    <Divider variant={"fullWidth"}/>
                                </Box>
                                <Box my={2}>
                                    <Divider variant={"fullWidth"}/>
                                    <Button variant={"contained"} fullWidth href="/login" color="secondary">
                                        {t("sign_in_instead")}
                                    </Button>
                                </Box>
                            </form>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}
