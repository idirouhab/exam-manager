import React from "react";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Button from "@material-ui/core/Button";
import {Link as RouterLink} from "react-router-dom";
import Icon from "@material-ui/core/Icon";
import {withStyles} from "@material-ui/styles";
import {makeStyles} from "@material-ui/core/styles";
import green from "@material-ui/core/colors/green";

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
}));

export default function Exam(props) {
    const classes = useStyles();

    return (
        <>
            <TableRow>
                <TableCell component="th" scope="row">
                    {props.exam.text}
                </TableCell>
                <StyledTableCell size="small" align="center">
                    <Button
                        variant="contained"
                        component={RouterLink}
                        to={`/admin/stats/${props.exam.id}`}
                    >
                        <Icon>equalizer</Icon>
                    </Button>

                </StyledTableCell>
                <StyledTableCell size="small" align="center">
                    <Button
                        className={`${classes.buttonSuccess}`}
                        variant="contained"
                        color="primary"
                        component={RouterLink}
                        to={`/public/quiz/${props.exam.id}`}
                    >
                        <Icon>find_in_page</Icon>
                    </Button>
                </StyledTableCell>
                <StyledTableCell size="small" align="center">
                    <Button
                        variant="contained"
                        color="primary"
                    >
                        <Icon>edit</Icon>
                    </Button>
                </StyledTableCell>
                <StyledTableCell size="small" align="center">
                    <Button
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
