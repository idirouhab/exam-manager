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
import Button from "@material-ui/core/Button";
import { Add, PhotoCamera, Remove } from "@material-ui/icons";
import DeleteIcon from "@material-ui/icons/Delete";
import ImageProvider from "../providers/image";
import Fab from "@material-ui/core/Fab";
import SaveIcon from "@material-ui/icons/Save";
import CheckIcon from "@material-ui/icons/Check";
import ExamProvider from "../providers/exam";
import { DEFAULT_QUESTION_TYPE, imageUrl, QUESTION_TYPES } from "../variables/general";
import FolderProvider from "../providers/folder";
import FolderModel from "../models/folder";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import CreateFolderModal from "../components/Folders/CreateFolderModal";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";

class Exam {
  constructor () {
    this.text = "";
    this.subtitle = "";
    this.folderId = null;
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
  const { t } = useTranslation("common");
  const [exam, setExam] = useState(new Exam());
  const [success, setSuccess] = useState(false);
  const [questions, setQuestions] = useState([new Question()]);
  const bottomElement = useRef(null);
  const [actionName, setActionName] = useState("create");
  const [folders, setFolders] = useState([]);
  const [createFolderModal, setCreateFolderModal] = useState(false);

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
    let oldQuestion = [...questions];
    oldQuestion.push(new Question());
    setQuestions(oldQuestion);
  };

  const deleteQuestion = (indexQuestion) => {
    const oldQuestions = [...questions];
    oldQuestions.splice(indexQuestion, 1);
    setQuestions(oldQuestions);
  };

  const updateTitle = (e) => {
    let oldExam = { ...exam };
    oldExam.text = e.target.value;
    setExam(oldExam);
  };

  const updateSubtitle = (e) => {
    let oldExam = { ...exam };
    oldExam.subtitle = e.target.value;
    setExam(oldExam);
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

      setTimeout(() => {
        props.history.push("/admin/home");
      }, 1000);

    });
  };

  const updateExamFolder = (e) => {
    let oldExam = { ...exam };
    oldExam.folderId = e.target.value;
    setExam(oldExam);
  };

  useEffect(() => {
    getFolders();
  }, [createFolderModal]);

  const getFolders = () => {
    FolderProvider.fetchFolders().then(response => {
      const responseFolders = response.data;
      let finalFolder = responseFolders.map(folder => {
        return new FolderModel(folder.id, folder.name);
      });
      setFolders(finalFolder);
    });
  };

  const createFolder = (folder) => {
    FolderProvider.saveFolder(folder).then(() => {
      setCreateFolderModal(false);
    });
  };

  return (
    <Fragment>
      <CreateFolderModal createFolder={createFolder} open={createFolderModal} handleClose={() => {
        setCreateFolderModal(false);
      }}/>
      <Grid container spacing={1} direction="column">
        {folders.length > 0 && <Grid container item spacing={0} justify="center">
          <Grid item xs={8}>
            <Paper className={classes.paper} square>
              <div className={classes.formControl} style={{ width: "100%" }}>
                <InputLabel>{t("select_your_folder")}</InputLabel>
                <Box mt={2}>
                  <Select
                    style={{ width: "50%" }}
                    startAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => {
                            setCreateFolderModal(true);
                          }}
                        >
                          <Add/>
                        </IconButton>
                      </InputAdornment>
                    }
                    onChange={(e) => updateExamFolder(e)}
                    value={exam.folderId || ""}
                  >
                    {folders.map((folder, key) => {
                      return <MenuItem key={`menu_${key}`}
                                       value={folder.id}>{folder.name}</MenuItem>;
                    })}
                    <MenuItem value="">{t("none")}</MenuItem>
                  </Select>
                </Box>
              </div>
            </Paper>
          </Grid>
        </Grid>}
        <Grid container item spacing={0} justify="center">
          <Grid item xs={8}>
            <Paper className={classes.paper} square>
              <TextField
                required
                fullWidth
                onChange={updateTitle}
                id="exame-title"
                label={t("create_exam.label.title")}
                value={exam.text}
                inputProps={{
                  style: {
                    fontWeight: "bold",
                    fontSize: "20px"
                  }
                }}/>
              <Box mt={2}>
                <TextField
                  fullWidth

                  id="exame-subtitle"
                  label={t("create_exam.label.subtitle")}
                  value={exam.subtitle}
                  onChange={updateSubtitle}
                />
              </Box>
            </Paper>
          </Grid>
        </Grid>
        {questions.map((question, indexQuestion) => {
          return (
            <Grid container key={`question_${indexQuestion}`} item spacing={0} justify="center"
                  direction="row">
              <Grid item xs={8}>
                <Paper className={classes.paper} square>
                  <Grid item xs={12}>
                    <div className={classes.inlineInput}>
                      <TextField
                        multiline
                        label={(indexQuestion + 1) + ") " + t("create_exam.label.question")}
                        style={{ width: "55%" }}
                        onChange={e => updateQuestion(e, indexQuestion)}
                        value={question.text}
                      />

                      <FormControl className={classes.formControl} style={{ width: "40%" }}
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
                    </div>
                  </Grid>
                </Paper>
              </Grid>
              <Grid item xs={8}>
                <Paper className={classes.paper} square>
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
                          <Button
                            className={classes.buttonSaveExam}
                            variant="contained"
                            color="primary"
                            component="span"
                            startIcon={<PhotoCamera/>}
                          >
                            {t("upload_image")}
                          </Button>
                        </label>
                        {question.image &&
                        <div style={{ display: "flex", justifyContent: "center" }}>
                          <Box my={2}>
                            <GridList
                              cols={1} cellHeight={"auto"} spacing={1}>
                              <GridListTile style={{ width: "auto" }}>
                                <img src={imageUrl + question.image}/>
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
              <Grid item xs={8}>
                <Paper className={classes.paper} square>
                  <Grid item xs={12}>
                    <div className={classes.inlineInput} style={{ textAlign: "center" }}>
                      {questions.length > 1 && <Button
                        variant="contained"
                        color="secondary"
                        size="large"
                        className={classes.buttonDeleteQuestion}
                        onClick={() => deleteQuestion(indexQuestion)}

                      >
                        <Remove/>
                      </Button>}
                      <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        className={classes.buttonAddQuestion}
                        onClick={addNewQuestion}
                      >
                        <Add/>
                      </Button>
                    </div>
                  </Grid>
                </Paper>
              </Grid>
            </Grid>);
        })}
        <Grid container item spacing={0} justify="center" style={{ position: "static" }}>
          <Grid item xs={8}>
            <Paper className={classes.paperBottom} square>
              <Fab
                onClick={saveExam}
                className={`${success ? classes.buttonSuccess : classes.buttonSaveExam}`}
              >
                {success ? <CheckIcon fontSize="small"/> : <SaveIcon fontSize="small"/>}
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
