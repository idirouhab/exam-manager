import React, { Fragment, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { RadioButtonChecked, RadioButtonUnchecked } from "@material-ui/icons";
import { useTranslation } from "react-i18next";
import ExamProvider from "../providers/exam";
import { buildImageUrl, LANGUAGE, QUESTION_TYPES } from "../variables/general";
import Loader from "../components/Loader/Loader";
import TextField from "@material-ui/core/TextField";
import useWindowDimensions from "../hooks/resize";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import green from "@material-ui/core/colors/green";
import AnswerProvider from "../providers/answer";
import Confetti from "react-confetti";
import humanizeDuration from "humanize-duration";
import imageBackground from "../assets/images/quiz_background.jpg";
import wellDoneGif from "../assets/images/well_done.gif";
import nextTimeGif from "../assets/images/nex_time.gif";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import _ from "lodash";
import Zoom from "react-reveal/Zoom";
import Grow from "@material-ui/core/Slide";
import FormHelperText from "@material-ui/core/FormHelperText";
import { AnimateOnChange } from "react-animation";

class Option {
  constructor (id = null, text = "", correct = false) {
    this.id = id;
    this.text = text;
    this.correct = correct;
    this.selected = false;
  }
}

class Question {
  constructor (id = null, text = "", type = "", image = null, options = []) {
    this.id = id;
    this.text = text;
    this.type = type;
    this.image = image;
    this.options = options;
  }
}

class Exam {
  constructor (id = null, text = "", subtitle = "", questions = [], random = false) {
    this.id = id;
    this.text = text;
    this.subtitle = subtitle;
    this.questions = questions;
    this.random = random;
  }
}

export default function Quiz (props) {
  const { width, height } = useWindowDimensions();

  const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 600,
    },
    media: {
      height: 0,
      paddingTop: "56.25%",
    },
    gridContainer: {
      backgroundImage: `url(${imageBackground})`,
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      backgroundAttachment: "fixed",
      backgroundSize: "cover",
      height,
      backgroundColor: "#E9E7EA"
    },
    card: {
      marginTop: theme.spacing(5),
    },
    footerButtonPrevious: {
      backgroundColor: "#006be8",
      padding: 12,
      margin: theme.spacing(1)
    },
    footerButtonNext: {
      backgroundColor: green[500],
      "&:hover": {
        backgroundColor: green[700]
      },
      padding: 12,
      margin: theme.spacing(1)
    }
  }));

  const classes = useStyles();
  const { t } = useTranslation();
  const [step, setStep] = useState(0);
  const [exam, setExam] = useState(new Exam());
  const [currentIndexQuestion, setCurrentIndexQuestion] = useState(0);
  const [loading, setLoading] = useState(true);
  const [playerName, setPlayerName] = useState("");
  const [playerLastName, setPlayerLastName] = useState("");
  const [submitExam, setSubmitExam] = useState(false);
  const [score, setScore] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [current, setCurrent] = useState(0);

  const words = [
    t("quiz_countdown.ready"), t("quiz_countdown.steady"), t("quiz_countdown.go"), ""
  ];

  useEffect(() => {
    let interval = null;
    if (step === 1) {
      interval = setInterval(() => {
        if (current === words.length - 1) {
          setCurrent(0);
        } else {
          setCurrent(current + 1);
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }

    if (current === 3 && step === 1) {
      setStep(2);
    }
    return () => clearInterval(interval);
  }, [words, current, step]);

  useEffect(() => {
    const { id } = props.match.params;
    ExamProvider.fetchExam(id).then((data) => {
      const newExam = new Exam();
      newExam.id = data.id;
      newExam.text = data.text;
      newExam.subtitle = data.subtitle;
      newExam.random = data.random;
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
          emptyQuestion.options.push(emptyOption);
        });
        newExam.questions.push(emptyQuestion);
      });
      if (newExam.random) {
        newExam.questions = _.shuffle(newExam.questions);
      }
      setExam(newExam);

    }).finally(() => {
      setLoading(false);
    });
  }, [props]);

  useEffect(() => {
    let interval = null;
    if (step === 2) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds + 1);
      }, 1000);
    } else if (submitExam) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [step, submitExam]);

  const updateCurrentQuestion = (addition) => {
    if (getOptionSelected(currentIndexQuestion)) {
      if ((currentIndexQuestion + addition) < exam.questions.length) {
        setCurrentIndexQuestion(currentIndexQuestion + addition);
      } else {
        setStep(3);
        setSubmitExam(true);
        getScore();
      }
    }
  };

  function getOptionSelected (questionIdIndex) {
    const selectedOption = exam.questions[questionIdIndex].options.find(option => {
      return option.selected;
    });
    return selectedOption;
  }

  const selectOption = (indexQuestion, currentOptionIndex) => {
    let oldQuestions = [...exam.questions];
    for (let optionIndex in oldQuestions[indexQuestion].options) {
      oldQuestions[indexQuestion].options[optionIndex].selected = parseInt(optionIndex) === parseInt(currentOptionIndex);
    }
    setExam({ ...exam, questions: oldQuestions });
  };

  const onStartGame = () => {
    if (playerName && playerLastName) {
      setPlayerName(playerName + " " + playerLastName);
      setStep(1);
    }
  };

  const send = () => {
    let answers = [];
    const { questions } = exam;
    questions.forEach((question, questionIndex) => {
      let selectedOption = getOptionSelected(questionIndex);
      answers.push({
        option_id: selectedOption.id,
        question_id: question.id
      });
    });

    let answer = {
      playerName: playerName,
      time: seconds,
      examId: exam.id,
      answers: answers,
      score: score
    };

    AnswerProvider.saveAnswer(answer).then(res => {
    });
  };

  useEffect(() => {
    if (score !== false) {
      send();
    }
  }, [send, score]);

  const getScore = () => {
    const { questions } = exam;
    let totalPoints = 0;
    questions.forEach(question => {
      totalPoints = question.options.find(option => option.correct && option.selected) ? totalPoints + 1 : totalPoints;
    });
    setScore(totalPoints);
  };

  return (
    <Fragment>
      {!loading && (
        <Grid container justify={"center"} className={classes.gridContainer}>
          {step === 0 &&
          <Zoom top>
            <Grid item className={classes.card}>
              <Card style={{ maxWidth: 600, width: (width * 0.90) }}>
                <CardHeader
                  title={<div>{exam.text}
                    <br/><br/>
                    <Typography variant="subtitle2" align={"center"}>
                      <span>{t("not_rush_on_answer")}</span>
                    </Typography>
                    <Typography variant="subtitle2" align={"center"} gutterBottom>
                      <span>{t("quiz_reminder_read")}</span>
                    </Typography>
                  </div>}
                  subheader={exam.subtitle}
                />
                <CardContent style={{ textAlign: "center" }}>
                  <TextField
                    helperText={!playerName ? t("input.error.empty") : ""}
                    onChange={(e) => setPlayerName(e.target.value)}
                    label={t("quiz_player_name")}
                    fullWidth
                    value={playerName}
                    variant="outlined"/>
                  <Box mt={2}>
                    <TextField
                      helperText={!playerLastName ? t("input.error.empty") : ""}
                      onChange={(e) => setPlayerLastName(e.target.value)}
                      label={t("quiz_player_lastName")}
                      fullWidth
                      value={playerLastName}
                      variant="outlined"/>
                  </Box>
                </CardContent>
                <CardActions style={{ textAlign: "center" }}>
                  <div style={{ width: "100%" }}>
                    <Button
                      onClick={onStartGame}
                      variant="contained"
                      color="primary"
                      className={classes.footerButtonNext}
                    >
                      {t("start")}
                    </Button>
                  </div>
                </CardActions>
              </Card>
            </Grid>
          </Zoom>}
          {step === 1 && <div
            style={{
              background: "rgba(255,255,255,0.5)",
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
              flexDirection: "column",
              width: "100%",
              height: "100%",
              position: "absolute",
              textAlign: "center",
              zIndex: "1000",
              verticalAlign: "middle",
            }}>
            <Typography variant={"h1"}>
              <AnimateOnChange
                animationIn="bounceIn"
                animationOut="bounceOut"
                durationOut="1000">
                {words[current]}
              </AnimateOnChange>
            </Typography>
          </div>}
          {step === 2 &&
          <Grid item className={classes.card}>
            <Card style={{ maxWidth: 600, width: (width * 0.90) }}>
              <CardHeader
                title={exam.text}
                subheader={exam.subtitle}
              />
              {exam.questions.map((question, indexQuestion) => {
                return (
                  <div
                    key={`question_${indexQuestion}`}
                    style={{ display: indexQuestion === currentIndexQuestion ? "" : "none" }}
                  >
                    <Grow in={indexQuestion === currentIndexQuestion}>
                      <CardContent>
                        {question.image &&
                        <div style={{ display: "flex", justifyContent: "center" }}>
                          <Box mb={2}>
                            <GridList
                              cols={1} cellHeight={"auto"} spacing={1}>
                              <GridListTile>
                                <img alt={question.text} style={{ maxWidth: "100%", height: "auto" }}
                                     src={buildImageUrl(question.image)}/>
                              </GridListTile>
                            </GridList>
                          </Box>
                        </div>}
                        <Box mb={5}>
                          <Typography variant="body2" color="textSecondary" component="p">{question.text}</Typography>
                        </Box>
                        {question.type === QUESTION_TYPES.FREE_TEXT ? (
                          <TextField
                            multiline
                            rows={6}
                            fullWidth
                            label={t("write_answer")}
                            value={question.options[0].text}
                            variant="outlined"
                          />) : (
                          <List
                            component="nav"
                            aria-labelledby="nested-list-subheader"
                            className={classes.root}>
                            {question.options.map((option, optionIndex) => {
                              return (
                                <ListItem
                                  key={`options_${indexQuestion}_${optionIndex}`}
                                  button
                                  onClick={() => selectOption(indexQuestion, optionIndex)}>
                                  <ListItemIcon>
                                    {option.selected ? (
                                      <RadioButtonChecked
                                        edge="start"
                                        tabIndex={-1}
                                      />
                                    ) : (
                                      <RadioButtonUnchecked
                                        edge="start"
                                        tabIndex={-1}
                                      />
                                    )}
                                  </ListItemIcon>
                                  <ListItemText primary={option.text}/>
                                </ListItem>);
                            })}
                          </List>
                        )}
                        <div
                          style={{
                            textAlign: "center",
                            display: question.options.find(option => option.selected) ? "none" : ""
                          }}
                          align={"center"}>
                          <FormHelperText
                            style={{ fontSize: "1em" }}
                            component="span"
                            error>{t("create_exam.label.option_not_select")}</FormHelperText>
                        </div>
                      </CardContent>
                    </Grow>
                  </div>);
              })}
              <CardActions style={{ textAlign: "center" }}>
                <div style={{ width: "100%" }}>
                  {currentIndexQuestion > 0 &&
                  <Button
                    onClick={() => {
                      updateCurrentQuestion(-1);
                    }}
                    variant="contained"
                    color="primary"
                    className={classes.footerButtonPrevious}
                  >
                    {t("previous")}
                  </Button>}
                  <Button
                    onClick={() => {
                      updateCurrentQuestion(1);
                    }}
                    variant="contained"
                    color="primary"
                    className={classes.footerButtonNext}
                  >
                    {currentIndexQuestion === exam.questions.length - 1 ? t("submit") : t("next")}
                  </Button>
                </div>
              </CardActions>
            </Card>
          </Grid>}
          {/*end of the game*/}
          {step === 3 &&
          <div>
            <Grid item className={classes.card}>
              <Card style={{ maxWidth: 600, width: (width * 0.90) }}>
                <CardContent style={{ textAlign: "center" }}>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <Box mb={2}>
                      <GridList
                        cols={1} cellHeight={"auto"} spacing={1}>
                        <GridListTile>
                          <img alt={"final"} style={{ maxWidth: "100%", height: "auto" }}
                               src={score > (exam.questions.length / 2) ? wellDoneGif : nextTimeGif}/>
                        </GridListTile>
                      </GridList>
                    </Box>
                  </div>
                  <Typography
                    variant="subtitle1"><strong>{t("your_score")}: </strong>{score}/{exam.questions.length}
                  </Typography>
                  <Typography
                    variant="subtitle1"><strong>{t("time")}: </strong> {humanizeDuration(seconds * 1000, { language: LANGUAGE })}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            {score > (exam.questions.length / 2) && <Confetti
              width={width}
              height={height}
            />}
          </div>}
        </Grid>)}
      {loading && (<Loader backgroundColor={"#F4F3F0"}/>)}
    </Fragment>
  );
}
