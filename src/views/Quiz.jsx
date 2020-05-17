import React, {useEffect, useState} from "react";
import ExamProvider from "../providers/exam";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import {Box} from "@material-ui/core";
import QuestionCard from "../components/Quiz/QuestionCard";
import AnswerProvider from "../providers/answer";
import StartGame from "../components/Quiz/StartGame";
import Submit from "../components/Quiz/Submit";

export default function Quiz(props) {
    const [exam, setExam] = useState({});
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [currentOptionSelected, setCurrentOptionSelect] = useState(null);
    const [selectedOptions, setSelectedOptions] = useState(new Map());
    const [score, setScore] = useState(false)
    const [started, setStarted] = useState(false);
    const [loadingExam, setLoadingExam] = useState(true);
    const [seconds, setSeconds] = useState(0);
    const [playerName, setPlayerName] = useState('');

    useEffect(() => {
        getExam();
    }, []);

    useEffect(() => {
        if (score !== false) {
            send();
        }
    }, [score]);

    useEffect(() => {
        let interval = null;
        if (started) {
            interval = setInterval(() => {
                setSeconds(seconds => seconds + 1);
            }, 1000);
        } else if (!started && seconds !== 0) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [started, seconds]);


    const send = () => {
        let answers = [];
        selectedOptions.forEach((value, key) => {
            answers.push({
                option_id: value,
                question_id: key
            })
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

    const getExam = () => {

        const {id} = props.match.params;
        ExamProvider.fetchExam(id).then(examResponse => {
            let exam = {
                id: examResponse.id,
                text: examResponse.text,
                questions: examResponse.questions,
            };
            setExam(exam);
        }).finally(() => setLoadingExam(false));
    };

    const optionChange = (e) => {
        setCurrentOptionSelect(e.target.value)
    };

    const nextQuestion = (currentQuestionId) => {
        if (!currentOptionSelected) {
            return false
        }

        selectedOptions.set(currentQuestionId, currentOptionSelected)
        setSelectedOptions(selectedOptions);
        setCurrentOptionSelect(null);
        if (currentQuestionIndex < (exam.questions.length - 1)) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            setStarted(false)
            getScore();
        }

    };

    const getScore = () => {
        let score = 0;
        exam.questions.forEach(question => {
            let questionId = question._id;
            let selectOptionId = selectedOptions.get(questionId);
            let option = question.options.find(option => {
                return option._id === selectOptionId
            });
            score = (option.correct) ? score + 1 : score;
        });
        console.log(score)

        setScore(score);
    };

    const startGame = () => {
        if (!playerName) {
            return false;
        }
        setStarted(true);
    };
    const updatePlayerName = (e) => {

        setPlayerName(e.target.value)
    };

    const renderCard = () => {
        if (!started && seconds === 0) {
            return <StartGame
                playerName={playerName}
                updatePlayerName={updatePlayerName}
                startGame={startGame}
                examText={exam.text}
            />
        } else if (started && !score) {
            return <QuestionCard
                question={exam.questions[currentQuestionIndex]}
                currentQuestionIndex={currentQuestionIndex}
                examText={exam.text}
                numberQuestions={exam.questions.length}
                optionChange={optionChange}
                currentOptionSelected={currentOptionSelected}
                nextQuestion={nextQuestion}
            />
        } else {
            return <Submit
                score={score}
                totalQuestion={exam.questions.length}
                seconds={seconds}
            />
        }

    };

    return (
        <>
            <div className="content_quizz" style={{backgroundColor: "#F4F3F0", height: "100%"}}>
                <Grid container spacing={0}>
                    <Grid item xs={3}/>
                    {!loadingExam && (
                        <Grid item xs={6}>
                            <Box mt={8}>
                                <Paper elevation={24}>
                                    {renderCard()}
                                </Paper>
                            </Box>
                        </Grid>
                    )}
                </Grid>
            </div>
        </>
    );
}
