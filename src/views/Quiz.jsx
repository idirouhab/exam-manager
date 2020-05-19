import React, {useEffect, useState} from "react";
import ExamProvider from "../providers/exam";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import {Box} from "@material-ui/core";
import CardHeader from "@material-ui/core/CardHeader";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import {useTranslation} from "react-i18next";
import Button from "@material-ui/core/Button";
import CardActions from "@material-ui/core/CardActions";
import {LiveHelp} from "@material-ui/icons";
import Divider from "@material-ui/core/Divider";
import {makeStyles} from "@material-ui/core/styles";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import CardContent from "@material-ui/core/CardContent";
import Slide from "@material-ui/core/Slide";
import StartGame from "../components/Quiz/StartGame";
import Submit from "../components/Quiz/Submit";
import newrelic from "../variables/newrelic";
import AnswerProvider from "../providers/answer";
import green from "@material-ui/core/colors/green";

function EmptyExam() {
    this.text = '';
    this.id = null;
    this.questions = []
}

function EmptyQuestion() {
    this.text = '';
    this.id = null;
    this.options = []
}

function EmptyOption() {
    this.text = '';
    this.id = null;
    this.correct = false;
    this.selected = false;

}

const useStyles = makeStyles(() => ({
    button: {
        pointerEvents: "none",
        boxShadow: "none",
        color: "#006be8"
    },
    footerButtonPrevious: {
        backgroundColor: "#006be8",
    },
    footerButtonNext: {
        backgroundColor: green[500],
        "&:hover": {
            backgroundColor: green[700]
        }
    },
}));


export default function Test(props) {
    const classes = useStyles();

    const [exam, setExam] = useState(new EmptyExam());
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [questionSubmitted, setQuestionSubmitted] = useState(false);
    const [startGame, setStartGame] = useState(false)
    const [playerName, setPlayerName] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [score, setScore] = useState(false);
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        if (score !== false) {
            send();
        }
    }, [score]);

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

    const {t} = useTranslation('common');
    useEffect(() => {
        const {id} = props.match.params;
        ExamProvider.fetchExam(id).then((data) => {
            const newExam = new EmptyExam();
            newExam.id = data.id;
            newExam.text = data.text;

            data.questions.forEach(question => {
                let emptyQuestion = new EmptyQuestion();
                emptyQuestion.id = question._id;
                emptyQuestion.text = question.text;
                question.options.forEach(option => {
                    let emptyOption = new EmptyOption();
                    emptyOption.id = option._id;
                    emptyOption.text = option.text;
                    emptyOption.correct = option.correct;
                    emptyQuestion.options.push(emptyOption)
                });
                newExam.questions.push(emptyQuestion);
            });

            setExam(newExam);
        })
    }, []);

    const send = () => {
        let answers = [];
        const {questions} = exam;
        questions.forEach((question, questionIndex) => {
            let selectedOption = getOptionSelected(questionIndex);
            answers.push({
                option_id: selectedOption.id,
                question_id: question.id
            })
        });

        let answer = {
            playerName: playerName,
            time: seconds,
            examId: exam.id,
            answers: answers,
            score: score
        };
        newrelic.interaction().setAttribute("player", answer)

        AnswerProvider.saveAnswer(answer).then(res => {
        });
    };

    const previousQuestion = (questionIdIndex) => {
        if (questionIdIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }

    };

    function getOptionSelected(questionIdIndex) {
        const selectedOption = exam.questions[questionIdIndex].options.find(option => {
            return option.selected;
        });

        return selectedOption;
    }

    const nextQuestion = (questionIdIndex) => {
        setQuestionSubmitted(true);
        const selectedOption = getOptionSelected(questionIdIndex);
        if (!selectedOption) return false;
        setQuestionSubmitted(true);
        if (currentQuestionIndex < (exam.questions.length - 1)) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            setStartGame(false)
            setSubmitted(true)
            getScore();
        }


    };

    const updatePlayerName = (e) => {
        setPlayerName(e.target.value)
    }
    const optionChange = (e, questionId) => {
        let oldQuestions = [...exam.questions];
        for (let optionIndex in oldQuestions[questionId].options) {
            oldQuestions[questionId].options[optionIndex].selected = oldQuestions[questionId].options[optionIndex].id === e.target.value;
        }
        setExam({...exam, questions: oldQuestions});
    };

    const startingGame = () => {
        if (!playerName) {
            return false;
        }
        setStartGame(true);

    };

    const getScore = () => {
        const {questions} = exam;
        let totalPoints = 0;
        questions.forEach(question => {
            totalPoints = question.options.find(option => option.correct && option.selected) ? totalPoints + 1 : totalPoints;
        });
        setScore(totalPoints);
    }
    return (
        <>
            <div className="content_quizz" style={{backgroundColor: "#F4F3F0", height: "100%"}}>
                <Grid container spacing={0}>
                    <Grid item xs={3}/>
                    <Grid item xs={6}>
                        <Box mt={8}>
                            <Paper elevation={24}>
                                {!startGame && !submitted && (<StartGame
                                    playerName={playerName}
                                    updatePlayerName={updatePlayerName}
                                    startingGame={startingGame}
                                    examText={exam.text}
                                />)}
                                {submitted && (<Submit
                                    score={score}
                                    totalQuestion={exam.questions.length}
                                    seconds={seconds}
                                />)}

                                {startGame && (exam.questions.map((question, questionIndex) => {
                                    let hidden = (currentQuestionIndex === questionIndex) ? {} : {display: "none"};
                                    return <Slide in={(currentQuestionIndex === questionIndex)}
                                                  mountOnEnter unmountOnExit
                                                  direction="right"
                                                  key={`question_${questionIndex}`}
                                    >
                                        <Card style={hidden}>
                                            <CardHeader
                                                subheaderTypographyProps={{
                                                    style: {
                                                        textAlign: 'center',
                                                    },
                                                }}
                                                subheader={
                                                    <span>{t('question')} # {currentQuestionIndex + 1}/{exam.questions.length}</span>}
                                                title={
                                                    <Typography variant="h5" align={"center"} gutterBottom>
                                                        <Button color="primary" className={classes.button}>
                                                            <LiveHelp fontSize="large"/>
                                                        </Button>
                                                        <span>{exam.text}</span>
                                                    </Typography>
                                                }/>
                                            <Divider/>
                                            <CardContent>
                                                <Box my={3}>
                                                    <Typography component="span">
                                                        {question.text}
                                                    </Typography>
                                                </Box>
                                                <Divider/>
                                                <div style={{marginBottom: "30px"}}/>
                                                <RadioGroup onChange={e => optionChange(e, questionIndex)}
                                                >

                                                    {question.options.map((opt, index) => (
                                                        <FormControlLabel key={`option_${index}`} value={opt.id}
                                                                          control={<Radio checked={opt.selected}/>}
                                                                          label={<span
                                                                              className={"content_options"}>{opt.text}  </span>}/>
                                                    ))}
                                                </RadioGroup>
                                            </CardContent>
                                            <CardActions style={{width: '100%', textAlign: 'center'}}>
                                                <div style={{width: '100%'}}>
                                                    {questionIndex > 0 && (
                                                        <Button size="large" className={classes.footerButton}
                                                                variant="contained"
                                                                color="primary"
                                                                style={{marginRight: "4%"}}
                                                                onClick={() => previousQuestion(questionIndex)}
                                                        >{t('previous')}</Button>)}

                                                    <Button size="large" className={classes.footerButtonNext}
                                                            variant="contained" color="primary"
                                                            onClick={() => nextQuestion(questionIndex)}
                                                            style={{marginLeft: "4%"}}
                                                    >{questionIndex === exam.questions.length - 1 ? t('submit') : t('next')}</Button>

                                                </div>
                                            </CardActions>
                                        </Card>
                                    </Slide>

                                }))}
                            </Paper>

                        </Box>
                    </Grid>

                </Grid>
            </div>
        </>
    );
}