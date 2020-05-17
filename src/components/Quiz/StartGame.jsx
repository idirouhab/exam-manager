import * as React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Box from "@material-ui/core/Box";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Typography from "@material-ui/core/Typography";
import {useTranslation} from "react-i18next";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
    footerButton: {
        backgroundColor: "#006be8",
    },

}));
export default function StartGame(props) {
    const {t} = useTranslation("common");
    const classes = useStyles();

    return (
        <>
                <Card>
                    <CardHeader
                        subheaderTypographyProps={{
                            style: {
                                textAlign: 'center',
                            },
                        }}
                        title={<div style={{textAlign: "center"}}>
                            <Typography variant="h4" align={"center"} gutterBottom>
                                <strong>{props.examText}</strong>
                            </Typography>
                            <Typography variant="subtitle2" align={"center"}>
                                <span>{t('quiz_reminder_read')}</span>
                            </Typography>
                            <Typography variant="subtitle2" align={"center"}>
                                <span>{t('quiz_reminder_copy')}</span>
                            </Typography>
                            <Typography variant="subtitle2" align={"center"}>
                                <span>{t('quiz_reminder_back')}</span>
                            </Typography>
                        </div>
                        }/>
                    <CardContent style={{textAlign: "center"}}>
                        <FormControl>
                            <TextField label={t('quiz_player_name')}
                                       error={!props.playerName.length}
                                       helperText={!props.playerName.length?t('input.error.empty'):''}
                                       onChange={(e) => props.updatePlayerName(e)}
                            />
                            <Box m={2}/>
                            <Button size="large" variant="contained"  className={classes.footerButton} color={"primary"}
                                    onClick={props.startGame}
                            >{t('start')}</Button>
                        </FormControl>
                    </CardContent>
                </Card>
        </>
    );
}
