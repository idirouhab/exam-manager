import React, {Fragment, useEffect, useRef, useState} from 'react';
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import {useTranslation} from "react-i18next";
import Box from "@material-ui/core/Box";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import useStyles from "../components/CreateExam/style";
import ShortAnswer from "../components/CreateExam/ShortAnswer";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import MultipleChoice from "../components/CreateExam/MultipleChoice";
import Button from "@material-ui/core/Button";
import {Add, Remove} from "@material-ui/icons";
import {DropzoneArea} from "material-ui-dropzone";
import ImageProvider from "../providers/image";
import Fab from "@material-ui/core/Fab";
import SaveIcon from "@material-ui/icons/Save";
import CheckIcon from "@material-ui/icons/Check";
import ExamProvider from "../providers/exam";
import {DEFAULT_QUESTION_TYPE, QUESTION_TYPES} from "../variables/general";


class Exam {
    constructor() {
        this.text = '';
        this.subtitle = '';
    }
}

class Question {
    constructor() {
        this.image = null;
        this.addImage = false;
        this.options = [new Option()];
        this.text = '';
        this.type = QUESTION_TYPES[DEFAULT_QUESTION_TYPE]
    }
}

class Answer {
    constructor() {
        this.id = null;
    }
}

class Option extends Answer {
    constructor() {
        super();
        this.text = '';
        this.correct = false;
    }
}

export default function CreateExam(props) {
    const classes = useStyles();
    const {t} = useTranslation('common');
    const [exam, setExam] = useState(new Exam());
    const [success, setSuccess] = useState(false);
    const [questions, setQuestions] = useState([new Question()]);
    const bottomElement = useRef(null);
    const [actionName, setActionName] = useState('create');


    useEffect(() => {
        bottomElement.current.scrollIntoView({behavior: "smooth"});
    }, [questions.length]);

    useEffect(() => {

        if (actionName === 'edit' || actionName === 'clone') {
            getExam();
        }
    }, [actionName]);

    useEffect(() => {
        const {pathname} = props.location;
        if (pathname.includes("edit")) {
            setActionName('edit');
        } else if (pathname.includes("clone")) {
            setActionName('clone');
        } else {
            setActionName('create');
        }
    }, [props.location]);


    const getExam = () => {
        const {id} = props.match.params;
        ExamProvider.fetchExam(id).then(data => {
            let emptyExam = new Exam();
            emptyExam.text = data.text;
            emptyExam.subtitle = data.subtitle;
            if (actionName === 'edit') {
                emptyExam.id = data.id;
            }
            setExam(emptyExam);

            let questions = [];
            data.questions.forEach((question, questionIndex) => {
                let currentQuestion = new Question();
                console.log(question)
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
            //setCheckedOptions(selectedOptions);

        }).finally(() => {
            /* setTransition(true)*/
        })
    };


    const changeQuestionType = (e, indexQuestion) => {
        let oldQuestion = [...questions];
        oldQuestion[indexQuestion].type = e.target.value
        oldQuestion[indexQuestion].options = [new Option()];

        setQuestions(oldQuestion);
    };

    const addImageSwitch = (e, indexQuestion) => {
        let oldQuestion = [...questions];
        oldQuestion[indexQuestion].addImage = e.target.checked
        if (!e.target.checked) {
            oldQuestion[indexQuestion].image = false;
        }
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

        setQuestions(oldQuestion)
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
            />
        }
        return component
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
        oldQuestions[indexQuestion].options.splice(indexOption, 1)
        setQuestions(oldQuestions)
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
        setQuestions(oldQuestions)
    };

    const updateTitle = (e) => {
        let oldExam = {...exam};
        oldExam.text = e.target.value;
        setExam(oldExam);
    };

    const updateSubtitle = (e) => {
        let oldExam = {...exam};
        oldExam.subtitle = e.target.value;
        setExam(oldExam);
    };

    const addCurrentImage = (images, questionIndex) => {
        let oldQuestion = [...questions];
        ImageProvider.saveImage(images[0]).then((res) => {
            oldQuestion[questionIndex].image = res.data.uuid;
            setQuestions(oldQuestion)
        });
    };

    const deleteCurrentImage = (images, questionIndex) => {
        let oldQuestion = [...questions];
        ImageProvider.deleteImage(oldQuestion[questionIndex].image).then((res) => {
            oldQuestion[questionIndex].image = null;
            setQuestions(oldQuestion)
        });
    };

    const saveExam = () => {
        exam.questions = questions;
        let method;
        if (actionName === 'edit') {
            method = ExamProvider.updateExam(exam)
        } else {
            method = ExamProvider.saveExam(exam)
        }
        method.then(() => {
            setExam(new Exam());
            setQuestions([new Question()]);
            setSuccess(true);

            setTimeout(() => {
                props.history.push("/admin/home")
            }, 1000)

        });
    };

    return (
        <Fragment>
            <Grid container spacing={1} direction="column">
                <Grid container item spacing={0} justify="center">
                    <Grid item xs={8}>
                        <Paper className={classes.paper} square>
                            <TextField
                                required
                                fullWidth
                                onChange={updateTitle}
                                id="exame-title"
                                label={t('create_exam.label.title')}
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
                                    onChange={updateSubtitle}
                                    id="exame-subtitle"
                                    label={t('create_exam.label.subtitle')}
                                    value={exam.subtitle}
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
                                                label={t('create_exam.label.question')}
                                                style={{width: "55%"}}
                                                onChange={e => updateQuestion(e, indexQuestion)}
                                                value={question.text}
                                            />

                                            <FormControl className={classes.formControl} style={{width: "40%"}} value={question.type}>
                                                <InputLabel>{t('create_exam.label.question_type')}</InputLabel>
                                                <Select
                                                    onChange={e => changeQuestionType(e, indexQuestion)}
                                                    value={question.type}
                                                    defaultValue={DEFAULT_QUESTION_TYPE}
                                                >
                                                    {Object.keys(QUESTION_TYPES).map(typeKey => {
                                                            return <MenuItem
                                                                key={typeKey}
                                                                value={QUESTION_TYPES[typeKey]}>{t(`create_exam.label.${QUESTION_TYPES[typeKey]}`)}</MenuItem>
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
                                            <FormControlLabel
                                                onChange={e => addImageSwitch(e, indexQuestion)}
                                                value={question.addImage}
                                                control={<Switch checked={question.addImage} color="primary"/>}
                                                label={t('create_exam.label.add_image')}
                                            />
                                            {question.addImage && <DropzoneArea
                                                acceptedFiles={['image/*']}
                                                filesLimit={1}
                                                dropzoneText={t('drag_and_drop')}
                                                initialFiles={question.image ? [question.image] : []}
                                                onDrop={(e) => addCurrentImage(e, indexQuestion)}
                                                onDelete={(e) => deleteCurrentImage(e, indexQuestion)}
                                            />}
                                        </div>
                                    </Grid>
                                </Paper>
                            </Grid>
                            {renderQuestionBlock(question.type, indexQuestion)}
                            <Grid item xs={8}>
                                <Paper className={classes.paper} square>
                                    <Grid item xs={12}>
                                        <div className={classes.inlineInput} style={{textAlign: "center"}}>
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
                        </Grid>)
                })}
                <Grid container item spacing={0} justify="center" style={{position: "static",}}>
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
                <div style={{float: "left", clear: "both"}}
                     ref={bottomElement}>
                </div>
            </Grid>

        </Fragment>
    );
}
