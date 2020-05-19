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
import Slide from "@material-ui/core/Slide";
import FolderProvider from "../providers/folder";
import Tag from "../models/tag";
import FolderModel from "../models/folder";

const StyledTableCell = withStyles(() => ({
    head: {
        width: "5%",
    },
    body: {
        width: "5%",
    },
}))(TableCell);

export default function Folder(props) {
    const {t} = useTranslation("common");
    const [exams, setExams] = React.useState([]);
    const [loading, setLoading] = useState(true)
    const [folders, setFolders] = useState([])

    const deleteExam = (id) => {
        ExamProvider.deleteExam(id).then(() => {
            getExams();
        })
    };

    const getExams = () => {
        const {id} = props.match.params;
        ExamProvider.fetchExams().then(data => {
            let exams = [];
            data.forEach(exam => {
                if (id === exam.folderId) {
                    exams.push(
                        {
                            id: exam.id,
                            text: exam.text,
                            questions: exam.questions,
                            folderId: exam.folderId ? exam.folderId : -1,
                            user: (exam.userId ? exam.userId.name : ""),
                            answers: exam.answers
                        }
                    )
                }
            });

            setExams(exams);
        }).finally(() => {
            setLoading(false);
        })
    };

    const getFolders = () => {
        FolderProvider.fetchFolders().then(response => {
            const responseFolders = response.data;
            let finalFolder = responseFolders.map(folder => {
                let tags = folder.tags.map(tag => {
                    return new Tag(tag._id, tag.name);
                });
                return new FolderModel(folder.id, folder.name, tags)
            });
            setFolders(finalFolder);
        });
    };

    useEffect(() => {
        getExams();
        getFolders();
    }, []);


    const updateExamFolder = (e, examId) => {

        let selectedExam = exams.find(exam => {
            return exam.id === examId;
        });

        selectedExam.folderId = e.target.value

        ExamProvider.updateExam(selectedExam).then((data) => {
            let olderExams = [...exams]
            let currentExam = olderExams.map((exam) => {
                return (exam.id === examId) ? selectedExam : exam;
            });
            setExams(currentExam);
        })
    }
    return (
        <>
            <Fragment>
                <Slide direction="up" mountOnEnter unmountOnExit in={!loading}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TableContainer component={Paper}>
                                <Table aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <StyledTableCell size="small"/>
                                            <TableCell className="capitalize">{t('exam')}</TableCell>
                                            <TableCell>{t('folder')}</TableCell>
                                            <StyledTableCell size="small" align="center"/>
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
                                                folders={folders}
                                                updateExamFolder={updateExamFolder}
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
