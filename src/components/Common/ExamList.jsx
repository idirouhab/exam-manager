import React, { Fragment, useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import { withStyles } from "@material-ui/styles";
import { useTranslation } from "react-i18next";
import Exam from "../Home/Exam";
import Loader from "../Loader/Loader";
import Slide from "@material-ui/core/Slide";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import makeStyles from "@material-ui/core/styles/makeStyles";
import ExamProvider from "../../providers/exam";
import FolderService from "../../services/folderService";

const StyledTableCell = withStyles(() => ({
  head: {
    width: "5%",
  },
  body: {
    width: "5%",
  },
}))(TableCell);

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: 400,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
}));

export default function ExamList (props) {
  const { t } = useTranslation();
  const classes = useStyles();
  const [exams, setExams] = React.useState([]);
  const [loading, setLoading] = useState(true);
  const [folders, setFolders] = useState([]);
  const [filterText, setFilterText] = useState("");

  const deleteExam = (id) => {
    ExamProvider.deleteExam(id).then(() => {
      getExams();
    });
  };

  const getExams = () => {
    const { id } = props;
    ExamProvider.fetchExams().then(data => {
      let exams = [];
      data.forEach(exam => {
        if (id === exam.folderId || !id) {
          exams.push(
            {
              id: exam.id,
              text: exam.text,
              questions: exam.questions,
              folderId: exam.folderId ? exam.folderId : -1,
              user: (exam.userId ? exam.userId.name : ""),
              answers: exam.answers,
              hide: false
            }
          );
        }
      });
      setExams(exams);
    }).finally(() => {
      setLoading(false);
    });
  };

  const getFolders = () => {
    FolderService.getFolders().then(folders => setFolders(folders));
  };

  useEffect(() => {
    getExams();
    getFolders();
  }, [props.id]);

  const updateExamFolder = (e, examId) => {

    let selectedExam = exams.find(exam => {
      return exam.id === examId;
    });

    selectedExam.folderId = e.target.value;

    ExamProvider.updateExam(selectedExam).then((data) => {
      let olderExams = [...exams];
      let currentExam = olderExams.map((exam) => {
        return (exam.id === examId) ? selectedExam : exam;
      });
      setExams(currentExam);
    });
  };

  const filterExams = () => {
    const oldExams = [...exams];

    let constNewExam = oldExams.map(exam => {
      exam.hide = !exam.text.includes(filterText);

      return exam;
    });

    setExams(constNewExam);
  };

  return (
    <>
      <Fragment>
        <Slide direction="up" mountOnEnter unmountOnExit in={!loading}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper className={classes.root} square>
                <InputBase
                  className={classes.input}
                  placeholder={t("search_exam")}
                  value={filterText}
                  onChange={e => setFilterText(e.target.value)}
                />
                <IconButton onClick={filterExams} className={classes.iconButton}>
                  <SearchIcon/>
                </IconButton>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <TableContainer component={Paper}>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell/>
                      <TableCell className="capitalize">{t("exam")}</TableCell>
                      <TableCell>{t("folder")}</TableCell>
                      <StyledTableCell align="center"/>
                      <StyledTableCell align="center"/>
                      <StyledTableCell align="center"/>
                      <StyledTableCell align="center"/>
                      <StyledTableCell align="center"/>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {exams.map((exam, key) => (
                      !exam.hide && <Exam
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
