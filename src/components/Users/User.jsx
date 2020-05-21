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

export default function User(props) {

    return (
        <>
            <TableRow>

                <TableCell component="th" scope="row">
                    {props.user.name} {props.user.lastName}
                </TableCell>
                <TableCell component="th" scope="row">
                    {props.user.username}
                </TableCell>

                <StyledTableCell size="small" align="center">
                    <Button
                        id={`delete_${props.index}`}
                        variant="contained"
                        color="secondary"
                        onClick={(e) => {
                            props.deleteUser(props.user.id)
                        }}
                    >
                        <Icon>delete</Icon>
                    </Button>
                </StyledTableCell>
            </TableRow>
        </>
    );
};
