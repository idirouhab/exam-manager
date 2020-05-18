import React from "react";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Button from "@material-ui/core/Button";
import {Link as RouterLink} from "react-router-dom";
import Icon from "@material-ui/core/Icon";
import {withStyles} from "@material-ui/styles";
import {makeStyles} from "@material-ui/core/styles";
import green from "@material-ui/core/colors/green";
import blue from "@material-ui/core/colors/blue";
import yellow from "@material-ui/core/colors/yellow";
import brown from "@material-ui/core/colors/brown";

const StyledTableCell = withStyles((theme) => ({
    head: {
        width: "5%",
    },
    body: {
        width: "5%",
    },
}))(TableCell);

const useStyles = makeStyles((theme) => ({
    buttonSuccess: {
        backgroundColor: green[500],
        "&:hover": {
            backgroundColor: green[700]
        }
    },
    buttonPrimary: {
        backgroundColor: blue[500],
        "&:hover": {
            backgroundColor: blue[700]
        }
    },
    buttonBrown: {
        backgroundColor: brown[500],
        "&:hover": {
            backgroundColor: brown[700]
        }
    },
}));

export default function Exam(props) {
    const classes = useStyles();

    return (
        <>
            <TableRow>
                <StyledTableCell size="small" align="center">
                    {props.exam.user}
                </StyledTableCell>
                <TableCell component="th" scope="row">
                    {props.exam.text}
                </TableCell>
                <StyledTableCell size="small" align="center">
                    <Button
                        id={`stats_${props.index}`}
                        variant="contained"
                        color="primary"
                        component={RouterLink}
                        className={`${classes.buttonPrimary}`}
                        to={`/admin/stats/${props.exam.id}`}
                    >
                        <Icon>equalizer</Icon>
                    </Button>
                </StyledTableCell>
                <StyledTableCell size="small" align="center">
                    <Button
                        id={`quiz_${props.index}`}
                        className={`${classes.buttonSuccess}`}
                        variant="contained"
                        color="primary"
                        component={RouterLink}
                        to={`/public/quiz/${props.exam.id}`}
                        target="_blank"
                    >
                        <Icon>share</Icon>
                    </Button>
                </StyledTableCell>

                <StyledTableCell size="small" align="center">
                    <Button
                        id={`copy_${props.index}`}
                        className={`${classes.buttonBrown}`}
                        variant="contained"
                        color="primary"
                        component={RouterLink}
                        to={`/admin/clone-exam/${props.exam.id}`}

                    >
                        <Icon>file_copy</Icon>
                    </Button>
                </StyledTableCell>

                <StyledTableCell size="small" align="center">
                    <Button
                        id={`copy_${props.index}`}
                        variant="contained"
                        color="primary"
                        component={RouterLink}
                        to={`/admin/edit-exam/${props.exam.id}`}
                    >
                        <Icon>edit</Icon>
                    </Button>
                </StyledTableCell>

                <StyledTableCell size="small" align="center">
                    <Button
                        id={`delete_${props.index}`}
                        variant="contained"
                        color="secondary"
                        onClick={(e) => {
                            props.deleteExam(props.exam.id)
                        }}
                    >
                        <Icon>delete</Icon>
                    </Button>
                </StyledTableCell>

            </TableRow>
        </>
    );
};
