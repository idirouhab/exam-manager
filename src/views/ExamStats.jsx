import React, {useEffect, useState} from "react";
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
import Zoom from "@material-ui/core/Zoom";
import MaxWidthDialog from "../components/StatsExam/StatsAnswer";

const StyledTableCell = withStyles((theme) => ({
    head: {
        width: "10%",
    },
    body: {
        width: "10%",
    },
}))(TableCell);

export default function ExamStats(props) {
    const {t} = useTranslation("common");
    const [answers, setAnswers] = useState([])
    const [questions, setQuestions] = useState([])
    const [transition, setTransition] = useState(false)

    useEffect(() => {
        getExam();
    },[]);

    const getExam = () => {
        const {id} = props.match.params;
        ExamProvider.fetchExam(id).then(data => {
            const dataAnswers = data.answers;
            if (dataAnswers) {
                setAnswers(dataAnswers)
            }
            setQuestions(data.questions);
        }).finally(() => {
            setTransition(true)
        })
    };

    return (
        <>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Zoom in={transition}>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell className="capitalize">{t('name')}</TableCell>
                                        <StyledTableCell size="small" align="center">{t('score')}</StyledTableCell>
                                        <StyledTableCell size="small" align="center">{t('time')}</StyledTableCell>
                                        <StyledTableCell size="small" align="center">{t('avg_per_question')}</StyledTableCell>
                                        <StyledTableCell size="small" align="center"/>
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
                                            <StyledTableCell size="small" align="center">
                                                <td className="">
                                                    <MaxWidthDialog
                                                        questions={questions}
                                                        answers={answer.answers}
                                                    />
                                                </td>
                                            </StyledTableCell>

                                        </TableRow>


                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Zoom>

                </Grid>

            </Grid>
        </>
    );
}