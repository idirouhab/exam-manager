import React, {Fragment, useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import {RadioButtonUnchecked, SkipNext, SkipPrevious} from "@material-ui/icons";
import blue from "@material-ui/core/colors/blue";
import {useTranslation} from "react-i18next";
import ExamProvider from "../providers/exam";
import {imageUrl, QUESTION_TYPES} from "../variables/general";
import Loader from "../components/Loader/Loader";
import TextField from "@material-ui/core/TextField";
import useWindowDimensions from "../hooks/resize";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 600,
    },
    media: {
        height: 0,
        paddingTop: '56.25%',
    },
    gridContainer: {
        backgroundColor: blue[500],
        height: "100%",

    },
    card: {
        marginTop: theme.spacing(5),
    }
}));

class Option {
    constructor(id = null, text = '', correct = false) {
        this.id = id;
        this.text = text;
        this.correct = correct;
    }
}

class Question {
    constructor(id = null, text = '', type = '', image = null, options = [new Option()]) {
        this.id = id;
        this.text = text;
        this.type = type;
        this.image = image;
        this.options = options;
    }
}


class Exam {
    constructor(id = null, text = '', subtitle = '', questions = []) {
        this.id = id;
        this.text = text;
        this.subtitle = subtitle;
        this.questions = questions;
    }
}

class Answer {
    constructor(questionId = null, option = null) {
        this.questionId = questionId;
        this.option = option;
    }
}

export default function Quiz(props) {
    const classes = useStyles();
    const {t} = useTranslation('common');
    const [exam, setExam] = useState(new Exam());
    const [currentIndexQuestion, setCurrentIndexQuestion] = useState(0);
    const [loading, setLoading] = useState(true);
    const [answers, setAnswers] = useState([]);
    const {width} = useWindowDimensions();

    useEffect(() => {
        const {id} = props.match.params;
        ExamProvider.fetchExam(id).then((data) => {
            const newExam = new Exam();
            newExam.id = data.id;
            newExam.text = data.text;
            newExam.subtitle = data.subtitle;
            let answers = [];
            data.questions.forEach(question => {
                let emptyQuestion = new Question();
                emptyQuestion.id = question._id;
                emptyQuestion.text = question.text;
                emptyQuestion.image = question.image;
                emptyQuestion.type = question.type;
                question.options.forEach(option => {
                    let emptyOption = new Option();
                    emptyOption.id = option._id;
                    emptyOption.text = option.text;
                    emptyOption.correct = option.correct;
                    emptyQuestion.options.push(emptyOption)
                });
                newExam.questions.push(emptyQuestion);
                answers.push(new Answer(emptyQuestion.id))
            });
            setAnswers(answers);
            setExam(newExam);

        }).finally(() => {
            setLoading(false);
        })
    }, [props]);

    /*
        useEffect(() => {
            let interval = null;
            if (startGame) {
                interval = setInterval(() => {
                    setSeconds(seconds => seconds + 1);
                }, 1000);
            } else if (submitted) {
                clearInterval(interval);
            }
            return () => clearInterval(interval);
        }, [startGame, submitted]);
    */


    return (

        <Fragment>
            {!loading && (<Grid container justify={"center"} className={classes.gridContainer}>
                <Grid item className={classes.card}>
                    <Card style={{maxWidth: 600, width: (width * 0.90)}}>
                        <CardHeader
                            title={exam.text}
                            subheader={exam.subtitle}
                        />
                        {exam.questions.map((question, currentIndex) => {
                            let display = currentIndex === currentIndexQuestion ? "" : "none";
                            return (<div style={{display: display}}>
                                {question.image &&
                                <CardMedia
                                    className={classes.media}
                                    image={imageUrl + question.image}
                                />}
                                <CardContent>
                                    <Box mb={5}>
                                        <Typography variant="body2" color="textSecondary"
                                                    component="p">{question.text}</Typography>
                                    </Box>
                                    {question.type === QUESTION_TYPES.FREE_TEXT ? (
                                        <TextField
                                            multiline
                                            rows={6}
                                            fullWidth
                                            label={t('write_answer')}
                                            value={question.options[0].text}
                                            variant="outlined"
                                        />) : (
                                        <List component="nav"
                                              aria-labelledby="nested-list-subheader"
                                              className={classes.root}>
                                            {question.options.map((option, optionIndex) => {

                                                return (<ListItem button>
                                                    <ListItemIcon>
                                                        <RadioButtonUnchecked
                                                            edge="start"
                                                            tabIndex={-1}
                                                        />
                                                    </ListItemIcon>
                                                    <ListItemText primary={option.text}/>
                                                </ListItem>)
                                            })}
                                        </List>
                                    )}
                                </CardContent>
                            </div>)
                        })}

                        <CardActions style={{textAlign: "center"}}>
                            <div style={{width: "100%"}}>
                                <IconButton>
                                    <SkipPrevious/>
                                </IconButton>
                                <IconButton>
                                    <SkipNext/>
                                </IconButton>
                            </div>
                        </CardActions>
                    </Card>
                </Grid>

            </Grid>)}
            {loading && (<Loader backgroundColor={"#F4F3F0"}/>)}
        </Fragment>

    );
}
