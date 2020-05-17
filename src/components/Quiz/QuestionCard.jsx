import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {LiveHelp} from "@material-ui/icons";
import Divider from "@material-ui/core/Divider";
import {makeStyles} from "@material-ui/core/styles";
import {useTranslation} from "react-i18next";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import CardActions from "@material-ui/core/CardActions";
import CardHeader from "@material-ui/core/CardHeader";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles(() => ({
    button: {
        pointerEvents: "none",
        boxShadow: "none",
        color: "#006be8"
    },
    footerButton: {
        backgroundColor: "#006be8",
    },

}));

export default function QuestionCard(props) {
    const classes = useStyles();
    const {t} = useTranslation("common");


    return (
        <>
            <Card>
                <CardHeader
                    subheaderTypographyProps={{
                        style: {
                            textAlign: 'center',
                        },
                    }}
                    subheader={<span>{t('question')} # {props.currentQuestionIndex + 1}/{props.numberQuestions}</span>}
                    title={
                        <Typography variant="h5" align={"center"} gutterBottom>
                            <Button color="primary" className={classes.button}>
                                <LiveHelp fontSize="large"/>
                            </Button>
                            <span>{props.examText}</span>
                        </Typography>
                    }/>
                <Divider/>

                <CardContent>

                    <Box my={3}>
                        <Typography component="span">
                            {props.question.text}
                        </Typography>
                    </Box>
                    <Divider/>

                    <div style={{marginBottom: "30px"}}/>
                    <RadioGroup onChange={props.optionChange} value={props.currentOptionSelected} >
                        {props.question.options.map((opt, index) => (
                            <FormControlLabel key={index} value={opt._id} control={<Radio/>}
                                              label={<span className={"content_options"}>{opt.text}  </span>}/>
                        ))}
                    </RadioGroup>
                </CardContent>
                <CardActions style={{width: '100%', textAlign: 'center'}}>
                    <div style={{width: '100%'}}>
                        <Button size="large" variant="contained"  className={classes.footerButton} color={"primary"}
                                onClick={()=>props.nextQuestion(props.question._id)}
                        >{props.currentQuestionIndex === props.numberQuestions - 1 ? t('submit') : t('next') }</Button>
                    </div>
                </CardActions>
            </Card>
        </>
    );
}