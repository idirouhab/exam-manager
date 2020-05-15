import React, {useEffect} from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import {makeStyles} from "@material-ui/core/styles";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import axios from 'axios';
import {backendUrl} from '../variables/general'
import Button from "@material-ui/core/Button";
import {Link as RouterLink} from 'react-router-dom';
import {MemoryRouter as Router} from 'react-router';
import green from "@material-ui/core/colors/green";
import Icon from "@material-ui/core/Icon";
import {withStyles} from "@material-ui/styles";
import {useTranslation} from "react-i18next";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    buttonSuccess: {
        backgroundColor: green[500],
        "&:hover": {
            backgroundColor: green[700]
        }
    },
}));

const StyledTableCell = withStyles((theme) => ({
    head: {
        width: "5%",
    },
    body: {
        width: "5%",
    },
}))(TableCell);

export default function CreateExam() {
    const classes = useStyles();
    const {t} = useTranslation("common");
    const [exams, setExams] = React.useState([]);

    useEffect(() => {
        const fetchExams = async () => {
            const result = await axios.get(`${backendUrl}/api/questionnaire`)
                .then(res => {
                    let exams = []
                    res.data.forEach(exams => {
                        exams.push(
                            {
                                id: exam.id,
                                title: exam.title,
                                questions: exam.questions
                            }
                        )
                    });
                    return exams;
                })
            setExams(result);
        };
        fetchExams()
    }, []);

    return (
        <>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell className="capitalize">{t('exams')}</TableCell>
                                    <StyledTableCell size="small" align="center"/>
                                    <StyledTableCell size="small" align="center"/>
                                    <StyledTableCell size="small" align="center"/>
                                    <StyledTableCell size="small" align="center"/>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {exams.map((exam, key) => (
                                    <TableRow key={key}>
                                        <TableCell component="th" scope="row">
                                            {exam.title}
                                        </TableCell>
                                        <StyledTableCell size="small" align="center">

                                            <Button variant="contained" component={RouterLink} to="/admin/test">
                                                <Icon>equalizer</Icon>
                                            </Button>

                                        </StyledTableCell>
                                        <StyledTableCell size="small" align="center">
                                            <Router>
                                                <div>
                                                    <Button className={`${classes.buttonSuccess}`}
                                                            variant="contained"
                                                            color="primary"
                                                            component={RouterLink} to="/public/login">
                                                        <Icon>find_in_page</Icon>
                                                    </Button>
                                                </div>
                                            </Router>
                                        </StyledTableCell>
                                        <StyledTableCell size="small" align="center">
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                className={classes.button}
                                            >
                                                <Icon>edit</Icon>
                                            </Button>
                                        </StyledTableCell>
                                        <StyledTableCell size="small" align="center">
                                            <Button
                                                variant="contained"
                                                color="secondary"
                                                className={classes.button}
                                            >
                                                <Icon>delete</Icon>
                                            </Button>
                                        </StyledTableCell>

                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>xs=12</Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>xs=12</Paper>
                </Grid>
            </Grid>
        </>
    );

}
