import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import green from "@material-ui/core/colors/green";
import Fab from "@material-ui/core/Fab";
import CheckIcon from "@material-ui/icons/Check";
import SaveIcon from "@material-ui/icons/Save";
import CircularProgress from "@material-ui/core/CircularProgress";
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

function EmptyOption() {
    this.text = '';
    this.correct = false;

}

function EmptyQuestion() {
    this.text = '';
    this.options = [new EmptyOption()];
}

function EmptyExam() {
    this.text = '';
    this.questions = [new EmptyQuestion()];
}

export default function CreateExam(props) {
    const classes = useStyles();
    const [exam, setExam] = useState(new EmptyExam());
    const [examErrors, setExamErrors] = useState(false);
    const [questionErrors, setQuestionErrors] = useState({});
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [checkedOptions, setCheckedOptions] = useState([]);

    const updateExamTitle = (e) => {
        setExam({...exam, text: e.target.value});
    };

    const updateCurrentQuestionTitle = (e, questionIndex) => {
        const oldQuestions = [...exam.questions];
        oldQuestions[questionIndex].text = e.target.value;
        setExam({...exam, questions: oldQuestions})
    };

    const updateOption = (e, questionIndex, optionIndex) => {
        const oldQuestions = [...exam.questions];
        oldQuestions[questionIndex].options[optionIndex].text = e.target.value;
        setExam({...exam, questions: oldQuestions})
    };

    const addOption = (questionIndex) => {
        const oldQuestions = [...exam.questions];
        oldQuestions[questionIndex].options.push(new EmptyOption());
        setExam({...exam, questions: oldQuestions})
    };

    const deleteOption = (questionIndex, optionIndex) => {
        const oldQuestions = [...exam.questions];
        oldQuestions[questionIndex].options.splice(optionIndex, 1);
        setExam({...exam, questions: oldQuestions})
    };

    const saveQuestion = (questionIndex) => {
        if (validQuestions()) {
            const oldQuestions = [...exam.questions];
            oldQuestions.push(new EmptyQuestion());
            setExam({...exam, questions: oldQuestions})
        }
    }

    const deleteQuestion = (questionIndex) => {
        const oldQuestions = [...exam.questions];
        oldQuestions.splice(questionIndex, 1);
        setExam({...exam, questions: oldQuestions})

    };

    const validExam = () => {
        const emptyExam = (exam.text.length === 0);
        setExamErrors((exam.text.length === 0));


        return (!emptyExam && validQuestions())
    }

    const validQuestions = () => {
        let errorsMap = {};
        let error = false;
        const questions = exam.questions;

        questions.map((question, questionIndex) => {
            let options = question.options;
            let empty = (question.text.length === 0);
            let selectedCorrect = isCorrectOptionSelected(question);

            error = empty || !selectedCorrect ? true : error;
            errorsMap[questionIndex] = {
                empty: empty,
                selectedCorrect: selectedCorrect,
                options: {}
            };

            options.map((option, optionIndex) => {
                let empty = (option.text.length === 0);
                error = empty ? true : error;
                errorsMap[questionIndex]['options'][optionIndex] = {
                    empty: empty
                };
            });
        });
        setQuestionErrors(errorsMap);
        return !error;

    }

    const saveExam = (e) => {
        e.preventDefault();
        if (!validExam()) {
            return false;
        }
        setLoading(true)
        ExamProvider.saveExam(exam).then(() => {
            setExam(new EmptyExam());
            setSuccess(true);

            setTimeout(() => {
                props.history.push("/admin/home")
            }, 1000)

        }).finally(() => {
            setLoading(false)
        })
    };

    const updateOptionCheckBox = (e, questionIndex, optionIndex) => {
        const oldCheckedOptions = [...checkedOptions];
        oldCheckedOptions[questionIndex] = optionIndex;
        setCheckedOptions(oldCheckedOptions);

        const oldQuestions = [...exam.questions];

        for (let i in oldQuestions[questionIndex].options) {
            oldQuestions[questionIndex].options[i].correct = parseInt(i) === optionIndex;
        }

        setExam({...exam, questions: oldQuestions})
    };

    const isCorrectOptionSelected = (currentQuestion) => {
        return currentQuestion.options.filter(option => {
            return option.correct === true;
        }).length > 0
    };


    return (
        <form onSubmit={saveExam}>
            <Grid container spacing={3}>
                <Exam
                    updateExamTitle={updateExamTitle}
                    text={exam.text}
                    examErrors={examErrors}
                />
                {exam.questions.map((question, questionIndex) => (
                    <Question
                        key={questionIndex}
                        questionIndex={questionIndex}
                        question={question}
                        updateCurrentQuestionTitle={updateCurrentQuestionTitle}
                        updateOption={updateOption}
                        checkedOptions={checkedOptions}
                        updateOptionCheckBox={updateOptionCheckBox}
                        deleteOption={deleteOption}
                        addOption={addOption}
                        saveQuestion={saveQuestion}
                        deleteQuestion={deleteQuestion}
                        numberQuestion={exam.questions.length}
                        questionErrors={questionIndex in questionErrors ? questionErrors[questionIndex] : {}}
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
        </form>
    );
}
