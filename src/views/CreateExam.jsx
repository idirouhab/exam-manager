import React, { Fragment, useEffect, useRef, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import { useTranslation } from "react-i18next";
import Box from "@material-ui/core/Box";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import useStyles from "../components/CreateExam/style";
import ShortAnswer from "../components/CreateExam/ShortAnswer";
import MultipleChoice from "../components/CreateExam/MultipleChoice";
import { Add, ExpandMore, PhotoCamera } from "@material-ui/icons";
import DeleteIcon from "@material-ui/icons/Delete";
import ImageProvider from "../providers/image";
import Fab from "@material-ui/core/Fab";
import SaveIcon from "@material-ui/icons/Save";
import CheckIcon from "@material-ui/icons/Check";
import ExamProvider from "../providers/exam";
import { DEFAULT_QUESTION_TYPE, imageUrl, QUESTION_TYPES } from "../variables/general";
import IconButton from "@material-ui/core/IconButton";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import ExamConfiguration from "../components/CreateExam/ExamConfiguration";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import InputAdornment from "@material-ui/core/InputAdornment";

class Exam {
  constructor () {
    this.text = "";
    this.subtitle = "";
    this.folderId = null;
    this.notify = true;
    this.random = false;
  }
}

class Question {
  constructor () {
    this.image = null;
    this.addImage = false;
    this.options = [new Option()];
    this.text = "";
    this.type = QUESTION_TYPES[DEFAULT_QUESTION_TYPE];
  }
}

class Answer {
  constructor () {
    this.id = null;
  }
}

class Option extends Answer {
  constructor () {
    super();
    this.text = "";
    this.correct = false;
  }
}

export default function CreateExam (props) {
  const classes = useStyles();
  const { t } = useTranslation();
  const [exam, setExam] = useState(new Exam());
  const [success, setSuccess] = useState(false);
  const [questions, setQuestions] = useState([new Question()]);
  const bottomElement = useRef(null);
  const [actionName, setActionName] = useState("create");
  const [validateForm, setValidateForm] = useState(false);
  const [openConfiguration, setOpenConfiguration] = useState(true);
  const [expanded, setExpanded] = React.useState(false);

  useEffect(() => {
    bottomElement.current.scrollIntoView({ behavior: "smooth" });
  }, [questions.length]);

  useEffect(() => {
    const { pathname } = props.location;
    if (pathname.includes("edit")) {
      setActionName("edit");
    } else if (pathname.includes("clone")) {
      setActionName("clone");
    } else {
      setActionName("create");
    }
  }, [props.location]);

  const getExam = () => {
    const { id } = props.match.params;
    ExamProvider.fetchExam(id).then(data => {
      let emptyExam = new Exam();
      emptyExam.text = data.text;
      emptyExam.subtitle = data.subtitle;
      emptyExam.folderId = data.folderId;
      emptyExam.notify = data.notify;
      emptyExam.random = data.random;
      if (actionName === "edit") {
        emptyExam.id = data.id;
      }
      setExam(emptyExam);

      let questions = [];
      data.questions.forEach((question, questionIndex) => {
        let currentQuestion = new Question();
        currentQuestion.type = question.type;
        currentQuestion.text = question.text;
        currentQuestion.image = question.image;
        currentQuestion.addImage = !!question.image;
        currentQuestion.options = [];
        question.options.forEach((option, optionIndex) => {
          let currentOption = new Option();
          currentOption.correct = option.correct;
          currentOption.text = option.text;
          currentQuestion.options.push(currentOption);
        });
        questions.push(currentQuestion);
      });

      setQuestions(questions);
    });
  };

  useEffect(() => {

    if (actionName === "edit" || actionName === "clone") {
      getExam();
    }
  }, [actionName]);

  const changeQuestionType = (e, indexQuestion) => {
    let oldQuestion = [...questions];
    oldQuestion[indexQuestion].type = e.target.value;
    oldQuestion[indexQuestion].options = [new Option()];

    setQuestions(oldQuestion);
  };

  const updateQuestion = (e, indexQuestion) => {
    let oldQuestion = [...questions];
    oldQuestion[indexQuestion].text = e.target.value;
    setQuestions(oldQuestion);
  };

  const updateOptionCheckBox = (e, questionIndex, optionIndex) => {
    let oldQuestion = [...questions];

    oldQuestion[questionIndex].options.forEach((option, index) => {
      oldQuestion[questionIndex].options[index].correct = optionIndex === index;
    });

    setQuestions(oldQuestion);
  };

  const renderQuestionBlock = (questionType, indexQuestion) => {
    let component = <ShortAnswer
      indexQuestion={indexQuestion}
      updateAnswerText={updateAnswerText}
    />;
    if (questionType === QUESTION_TYPES.MULTIPLE_CHOICE) {
      component = <MultipleChoice
        validateForm={validateForm}
        indexQuestion={indexQuestion}
        updateAnswerText={updateAnswerText}
        addOptionToQuestion={addOptionToQuestion}
        options={questions[indexQuestion].options}
        updateOptionCheckBox={updateOptionCheckBox}
        deleteOption={deleteOption}
      />;
    }
    return component;
  };
  const updateAnswerText = (e, indexQuestion, indexOption) => {
    let oldQuestion = [...questions];

    oldQuestion[indexQuestion].options[indexOption].text = e.target.value;
    if (oldQuestion[indexQuestion].type === QUESTION_TYPES.FREE_TEXT) {
      oldQuestion[indexQuestion].options[indexOption].correct = true;
    }

    setQuestions(oldQuestion);
  };

  const deleteOption = (indexQuestion, indexOption) => {
    const oldQuestions = [...questions];
    oldQuestions[indexQuestion].options.splice(indexOption, 1);
    setQuestions(oldQuestions);
  };

  const addOptionToQuestion = (indexQuestion) => {
    let oldQuestion = [...questions];
    if (oldQuestion[indexQuestion].type === QUESTION_TYPES.MULTIPLE_CHOICE) {
      oldQuestion[indexQuestion].options.push(new Option());
    }

    setQuestions(oldQuestion);
  };

  const addNewQuestion = () => {
    let oldQuestions = [...questions];
    oldQuestions.push(new Question());
    setQuestions(oldQuestions);
    setExpanded(oldQuestions.length - 1);
  };

  const deleteQuestion = (indexQuestion) => {
    const oldQuestions = [...questions];
    oldQuestions.splice(indexQuestion, 1);
    setQuestions(oldQuestions);
  };

  const addCurrentImage = (e, questionIndex) => {
    let oldQuestion = [...questions];
    ImageProvider.saveImage(e.target.files[0]).then((res) => {
      oldQuestion[questionIndex].image = res.data.uuid;
      setQuestions(oldQuestion);
    });
  };

  const deleteCurrentImage = (questionIndex) => {
    let oldQuestion = [...questions];
    ImageProvider.deleteImage(oldQuestion[questionIndex].image).then((res) => {
      oldQuestion[questionIndex].image = null;
      setQuestions(oldQuestion);
    });
  };

  const saveExam = () => {

    setValidateForm(true);
    if (!validForm()) {
      return false;
    }
    exam.questions = questions;
    let method;
    if (actionName === "edit") {
      method = ExamProvider.updateExam(exam);
    } else {
      method = ExamProvider.saveExam(exam);
    }
    method.then(() => {
      setExam(new Exam());
      setQuestions([new Question()]);
      setSuccess(true);
      setValidateForm(true);
      setTimeout(() => {
        props.history.push("/admin/home");
      }, 1000);

    });
  };

  const validForm = () => {
    if (exam.text.length === 0) {
      return false;
    }

    if (questions.find(question => question.text.length === 0)) {
      return false;
    }

    return !!questions.find(question => {
      return question.options.find(option => option.correct);
    });
  };

  const handleCloseConfiguration = () => {
    setOpenConfiguration(false);
  };

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const questionAdornment = (indexQuestion) => {
    return questions.length > 1 ? <InputAdornment position="start">
      <IconButton onClick={(e) => {
        e.stopPropagation();
        deleteQuestion(indexQuestion);

      }}>
        <DeleteIcon/>
      </IconButton></InputAdornment> : <Fragment/>;
  };

  const updateExamAttr = (attrName, value) => {
    let oldExam = { ...exam };
    oldExam[attrName] = value;
    setExam(oldExam);
  };

  return (
    <Fragment>
      <ExamConfiguration
        handleClose={handleCloseConfiguration}
        open={openConfiguration}
        updateExamAttr={updateExamAttr}
        validateForm={validateForm}
        exam={exam}
      />
      <Grid container spacing={1} direction="column">
          {questions.map((question, indexQuestion) => {
            return (
              <Accordion
                key={`question_${indexQuestion}`}
                TransitionProps={{ unmountOnExit: true }}
                expanded={expanded === indexQuestion}
                onChange={handleChange(indexQuestion)}>
                <AccordionSummary
                  expandIcon={<ExpandMore/>}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                >
                  <TextField
                    InputProps={{
                      startAdornment: questionAdornment(),
                    }}
                    onFocus={(event) => {
                      if (expanded === indexQuestion) {
                        event.stopPropagation();
                      }
                    }}
                    onClick={(event) => {
                      if (expanded === indexQuestion) {
                        event.stopPropagation();
                      }
                    }}
                    multiline
                    label={t(`create_exam.label.${question.type}`)}
                    onChange={e => updateQuestion(e, indexQuestion)}
                    value={question.text}
                    fullWidth
                    helperText={validateForm && !question.text.length > 0 ? t("create_exam.label.empty") : ""}
                    error={validateForm && !question.text.length > 0}
                  />
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container item spacing={0} justify="center"
                        direction="row">
                    <Grid item xs={12}>
                      <Paper elevation={0} className={classes.paper} square>
                        <Grid item xs={12}>
                          <FormControl className={classes.formControl}
                                       fullWidth
                                       value={question.type}>
                            <InputLabel>{t("create_exam.label.question_type")}</InputLabel>
                            <Select
                              onChange={e => changeQuestionType(e, indexQuestion)}
                              value={question.type}
                              defaultValue={DEFAULT_QUESTION_TYPE}
                            >
                              {Object.keys(QUESTION_TYPES).map(typeKey => {
                                  return <MenuItem
                                    key={typeKey}
                                    value={QUESTION_TYPES[typeKey]}>{t(`create_exam.label.${QUESTION_TYPES[typeKey]}`)}</MenuItem>;
                                }
                              )}
                            </Select>
                          </FormControl>
                        </Grid>
                      </Paper>
                    </Grid>
                    <Grid item xs={12}>
                      <Paper elevation={0} className={classes.paper} square>
                        <Grid item xs={12}>
                          <div className={classes.inlineInput}>
                            <div>
                              <input
                                accept="image/x-png,image/jpeg"
                                style={{ display: "none" }}
                                id={`icon-button-file-${indexQuestion}`}
                                onChange={(e) => addCurrentImage(e, indexQuestion)}
                                type="file"
                              />
                              <label htmlFor={`icon-button-file-${indexQuestion}`}>
                                <Fab
                                  variant="extended"
                                  color={"primary"}
                                  component="span"
                                >
                                  <PhotoCamera className={classes.extendedIcon} fontSize="small"/>
                                  {t('upload_image')}
                                </Fab>
                              </label>
                              {question.image &&
                              <div style={{ display: "flex", justifyContent: "center" }}>
                                <Box my={2}>
                                  <GridList
                                    cols={1} cellHeight={"auto"} spacing={1}>
                                    <GridListTile style={{ width: "auto" }}>
                                      <img alt={question.text} src={imageUrl + question.image}/>
                                      <GridListTileBar
                                        style={{ textAlign: "center" }}
                                        actionIcon={
                                          <IconButton
                                            className={classes.buttonDelete}
                                            component="span"
                                            onClick={() => deleteCurrentImage(indexQuestion)}
                                          >
                                            <DeleteIcon/>
                                          </IconButton>
                                        }
                                      />
                                    </GridListTile>
                                  </GridList>
                                </Box>
                              </div>}
                            </div>
                          </div>
                        </Grid>
                      </Paper>
                    </Grid>
                    {renderQuestionBlock(question.type, indexQuestion)}
                  </Grid>
                </AccordionDetails>
              </Accordion>
            );
          })}
        <Box my={2}>
          <Accordion elevation={0} className={classes.hideBorder} square={true} expanded={false}
                     style={{ backgroundColor: "transparent" }}>
            <AccordionSummary
              style={{ backgroundColor: "inherent" }}>
              <Grid style={{ backgroundColor: "inherent" }} item xs={12}>
                <Grid style={{ backgroundColor: "inherent" }} item xs={12}>
                  <div style={{ textAlign: "center" }}>
                    <Fab
                      variant="extended"
                      onClick={addNewQuestion}
                      color={"primary"}
                    >
                     <Add
                       className={classes.extendedIcon}
                       fontSize="small"/>
                      {t('create_exam.label.add_question')}
                    </Fab>
                  </div>
                </Grid>
              </Grid>
            </AccordionSummary>
          </Accordion>
        </Box>
        <Grid container item spacing={0} justify="center" style={{ position: "static" }}>
          <Grid item xs={8}>
            <Paper className={classes.paperBottom} square>
              <Fab
                variant="extended"
                onClick={saveExam}
                color={"secondary"}
                className={`${success ? classes.buttonSuccess : ""}`}
              >
                {success ? <CheckIcon fontSize="small"/> : <SaveIcon className={classes.extendedIcon} fontSize="small"/>}
                {t('save')}
              </Fab>
            </Paper>
          </Grid>
        </Grid>
        <div style={{ float: "left", clear: "both" }}
             ref={bottomElement}>
        </div>
      </Grid>
    </Fragment>
  );
}
