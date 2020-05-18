import React, {Fragment, useEffect, useState} from "react";
import Grid from "@material-ui/core/Grid";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import {withStyles} from "@material-ui/styles";
import {useTranslation} from "react-i18next";
import ExamProvider from "../providers/exam";
import MaxWidthDialog from "../components/StatsExam/StatsAnswer";
import IconButton from "@material-ui/core/IconButton";
import {Delete} from "@material-ui/icons";
import AnswerProvider from "../providers/answer";
import Loader from "../components/Loader/Loader";
import Slide from "@material-ui/core/Slide";

const StyledTableCell = withStyles((theme) => ({
    head: {
        width: "10%",
    },
    body: {
        width: "10%",
    },
}))(TableCell);

const SmallStyledTableCell = withStyles((theme) => ({
    head: {
        width: "2%",
    },
    body: {
        width: "2%",
    },
}))(TableCell);

export default function ExamStats(props) {
    const {t} = useTranslation("common");
    const [answers, setAnswers] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getExam();
    }, []);

    const getExam = () => {
        const {id} = props.match.params;
        ExamProvider.fetchExam(id).then(data => {
            const dataAnswers = data.answers;
            if (dataAnswers) {
                setAnswers(dataAnswers)
            }
            setQuestions(data.questions);
        }).finally(() => {
            setLoading(false)
        })
    };

    const deleteAnswer = (answerId) => {
        console.log(answerId);
        AnswerProvider.deleteAnswer(answerId).then(() => {
                getExam()
            }
        );
    };

    return (
        <>
            <Fragment>
                <Slide direction="up"  mountOnEnter unmountOnExitin in={!loading}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>

                            <TableContainer component={Paper}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell className="capitalize">{t('name')}</TableCell>
                                            <StyledTableCell size="small" align="center">{t('score')}</StyledTableCell>
                                            <StyledTableCell size="small" align="center">{t('time')}</StyledTableCell>
                                            <StyledTableCell size="small"
                                                             align="center">{t('avg_per_question')}</StyledTableCell>
                                            <SmallStyledTableCell size="small" align="center"/>
                                            <SmallStyledTableCell size="small" align="center"/>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {answers.map((answer, key) => (
                                            <TableRow key={key}>
                                                <TableCell
                                                    component="th"
                                                    scope="row"
                                                >
                                                    {answer.playerName}
                                                </TableCell>
                                                <StyledTableCell size="small" align="center">
                                                    {answer.score}/{questions.length}

                                                </StyledTableCell>
                                                <StyledTableCell size="small" align="center">
                                                    {answer.time} {t('seconds')}
                                                </StyledTableCell>
                                                <StyledTableCell size="small" align="center">
                                                    {Math.round((answer.time / questions.length))} {t('seconds')}
                                                </StyledTableCell>
                                                <SmallStyledTableCell size="small" align="center">
                                                    <MaxWidthDialog
                                                        questions={questions}
                                                        answers={answer.answers}
                                                    />
                                                </SmallStyledTableCell>

                                                <SmallStyledTableCell size="small" align="center">
                                                    <IconButton variant="outlined" color="secondary"
                                                                id={`delete_${key}`}
                                                                onClick={(e) => deleteAnswer(answer._id)}>
                                                        <Delete/>
                                                    </IconButton>
                                                    {/*<Button
                                                    id={`delete_${props.index}`}
                                                    variant="contained"
                                                    color="secondary"
                                                    onClick={(e) => {
                                                        props.deleteExam(props.exam.id)
                                                    }}
                                                >
                                                    <Icon>delete</Icon>
                                                </Button>*/}
                                                </SmallStyledTableCell>


                                            </TableRow>


                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                    </Grid>
                </Slide>
                {loading && (<Loader/>)}
            </Fragment>
        </>
    );
}