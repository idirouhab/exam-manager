import React, {useEffect, useRef, useState} from 'react';
import Grid from "@material-ui/core/Grid";
import Fab from "@material-ui/core/Fab";
import CheckIcon from "@material-ui/icons/Check";
import SaveIcon from "@material-ui/icons/Save";
import CircularProgress from "@material-ui/core/CircularProgress";
import {makeStyles} from "@material-ui/core/styles";
import green from "@material-ui/core/colors/green";
import Exam from "../components/CreateExam/Exam";
import Question from "../components/CreateExam/Question";
import ExamProvider from "../providers/exam";


const useStyles = makeStyles(() => ({
    buttonSuccess: {
        backgroundColor: green[500],
        "&:hover": {
            backgroundColor: green[700]
        }
    },
    wrapper: {
        margin: 0,
        position: "relative"
    },
    fabProgress: {
        color: green[500],
        position: "absolute",
        top: -6,
        left: -6,
        zIndex: 1,
        outline: "none",
    },
}));

function EmptyExam() {
    this.text = '';

}

function EmptyQuestion() {
    this.text = '';
    this.options = [new EmptyOption()]
}

function EmptyOption() {
    this.text = '';
    this.correct = false;

}

export default function UpdateExam(props) {
    const classes = useStyles();

    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [exam, setExam] = useState(new EmptyExam());
    const [questions, setQuestions] = useState([new EmptyQuestion()])

    const [submittedForm, setSubmittedForm] = useState(false);
    const [submittedQuestion, setSubmittedQuestion] = useState(false);
    const [checkedOptions, setCheckedOptions] = useState([]);


    const bottomElement = useRef(null);


    useEffect(() => {
        console.log(bottomElement.current.getClientRects());
        bottomElement.current.scrollIntoView({behavior: "smooth"});
    }, [questions.length])

    useEffect(() => {
        getExam();
    }, []);

    const getExam = () => {
        const {id} = props.match.params;
        ExamProvider.fetchExam(id).then(data => {
            console.log(data);
            let emptyExam = new EmptyExam();
            emptyExam.text = data.text;
            setExam(emptyExam);
            let selectedOptions=[];
            data.questions.forEach((question, questionIndex) => {
                question.options.forEach((option, optionIndex)=>{
                    selectedOptions[questionIndex]=optionIndex;
                })
            })
            setQuestions(data.questions);
            setCheckedOptions(selectedOptions);
            /*  emptyExam.text = dataAnswers.text
              if (dataAnswers) {
                  setAnswers(dataAnswers)
              }
              setQuestions(data.questions);*/
        }).finally(() => {
            /* setTransition(true)*/
        })
    };

    const saveExam = (e) => {
        e.preventDefault();
        if (exam.text.length === 0) {
            return false
        }
        setSubmittedForm(true);
        setLoading(true)
        exam.questions = questions;
        ExamProvider.saveExam(exam).then(() => {
            setExam(new EmptyExam());
            setSuccess(true);

            setTimeout(() => {
                props.history.push("/admin/home")
            }, 1000)

        }).finally(() => {
            setSubmittedForm(false);
            setLoading(false);
        })

    };

    const updateExamTitle = (e) => {
        setExam({...exam, text: e.target.value});
    };


    const updateOptionText = (e, questionIndex, optionIndex) => {
        let oldQuestions = [...questions];
        oldQuestions[questionIndex].options[optionIndex].text = e.target.value;

        setQuestions(oldQuestions)
    };

    const updateCurrentQuestionTitle = (e, questionIndex) => {
        let oldQuestion = [...questions]
        oldQuestion[questionIndex].text = e.target.value;
        setQuestions(oldQuestion)
    };

    const saveQuestion = () => {
        setSubmittedQuestion(true);
        let emptyQuestion = questions.filter(question => {
            return question.text.length === 0;
        });

        let atLeastOneEmptyOption = questions.find(question => {
            return hasEmptyText(question.options);
        });
        if (emptyQuestion.length > 0 || atLeastOneEmptyOption !== undefined) {
            return
        }

        setSubmittedQuestion(false);
        const oldQuestions = [...questions];
        oldQuestions.push(new EmptyQuestion());
        setQuestions(oldQuestions)
    };

    const hasEmptyText = (options) => {

        let emptyOption = options.find(option => {
            return option.text.length === 0;
        });

        return !(emptyOption === undefined)
    };
    const addOptionToQuestion = (questionIndex) => {
        const oldQuestions = [...questions];
        oldQuestions[questionIndex].options.push(new EmptyOption());
        setQuestions(oldQuestions);
    };

    const deleteOptionFromQuestion = (questionIndex, optionIndex) => {
        const oldQuestions = [...questions];
        oldQuestions[questionIndex].options.splice(optionIndex, 1);
        setQuestions(oldQuestions);
    };


    const deleteQuestion = (questionIndex) => {
        const oldQuestions = [...questions];
        oldQuestions.splice(questionIndex, 1);
        setQuestions(oldQuestions)

    };

    const updateOptionCheckBox = (e, questionIndex, optionIndex) => {
        const oldCheckedOptions = [...checkedOptions];
        oldCheckedOptions[questionIndex] = optionIndex;
        setCheckedOptions(oldCheckedOptions);

        const oldQuestions = [...questions];

        for (let i in oldQuestions[questionIndex].options) {
            oldQuestions[questionIndex].options[i].correct = parseInt(i) === optionIndex;
        }

        setQuestions(oldQuestions)
    };


    const printJson = (object) => {
        return JSON.stringify(object, null, 2);
    };

    return (
        <>
            <form onSubmit={saveExam}>
                <Grid container spacing={3}>
                    <Exam
                        updateExamTitle={updateExamTitle}
                        text={exam.text}
                        submittedForm={submittedForm}
                    />
                    {questions.map((question, questionIndex) => (
                        <Question
                            key={questionIndex}
                            questionIndex={questionIndex}
                            question={question}
                            updateCurrentQuestionTitle={updateCurrentQuestionTitle}
                            saveQuestion={saveQuestion}
                            numberQuestion={questions.length}
                            submittedQuestion={submittedQuestion}
                            deleteQuestion={deleteQuestion}
                            options={questions[questionIndex].options}
                            updateOptionText={updateOptionText}
                            addOptionToQuestion={addOptionToQuestion}
                            deleteOptionFromQuestion={deleteOptionFromQuestion}
                            checkedOptions={checkedOptions}
                            updateOptionCheckBox={updateOptionCheckBox}


                        />
                    ))}
                    <Grid container className="navbar" spacing={0}>
                        <Grid item xs={12}>
                            <div className={classes.wrapper}>
                                <Fab
                                    type="submit"
                                    aria-label="save"
                                    color="primary"
                                    className={`${success ? classes.buttonSuccess : ""}`}
                                >
                                    {success ? <CheckIcon fontSize="small"/> : <SaveIcon fontSize="small"/>}
                                </Fab>
                                {loading && (
                                    <CircularProgress size={68}
                                                      className={classes.fabProgress}/>
                                )}
                            </div>
                        </Grid>
                    </Grid>
                </Grid>
                <div style={{float: "left", clear: "both"}}
                     ref={bottomElement}>
                </div>
            </form>
        </>
    );
}
