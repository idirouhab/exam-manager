import React, {Fragment, useEffect, useState} from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import {withStyles} from "@material-ui/styles";
import {useTranslation} from "react-i18next";
import ExamProvider from "../providers/exam";
import Exam from "../components/Home/Exam";
import Loader from "../components/Loader/Loader";
import Fade from "@material-ui/core/Fade";
import Slide from "@material-ui/core/Slide";

const StyledTableCell = withStyles(() => ({
    head: {
        width: "5%",
    },
    body: {
        width: "5%",
    },
}))(TableCell);

export default function Home() {
    const {t} = useTranslation("common");
    const [exams, setExams] = React.useState([]);
    const [loading, setLoading] = useState(true)

    const deleteExam = (id) => {
        ExamProvider.deleteExam(id).then(() => {
            getExams();
        })
    };

    const getExams = () => {
        ExamProvider.fetchExams().then(data => {
            let exams = [];
            data.forEach(exam => {
                exams.push(
                    {
                        id: exam.id,
                        text: exam.text,
                        questions: exam.questions,
                        user: (exam.userId ? exam.userId.name : "")
                    }
                )
            });
            setExams(exams);
        }).finally(() => {
            setLoading(false);
        })
    };

    useEffect(() => {
        getExams();
    }, []);

    return (
        <>
            <Fragment>
                <Slide direction="up"   mountOnEnter unmountOnExit in={!loading}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TableContainer component={Paper}>
                                <Table aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <StyledTableCell size="small"/>
                                            <TableCell className="capitalize">{t('exam')}</TableCell>
                                            <StyledTableCell size="small" align="center"/>
                                            <StyledTableCell size="small" align="center"/>
                                            <StyledTableCell size="small" align="center"/>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {exams.map((exam, key) => (
                                            <Exam
                                                key={key}
                                                exam={exam}
                                                deleteExam={deleteExam}
                                                index={key}
                                            />
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
