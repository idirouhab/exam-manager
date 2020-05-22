import React from "react";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import {withStyles} from "@material-ui/styles";

const StyledTableCell = withStyles((theme) => ({
    head: {
        width: "5%",
    },
    body: {
        width: "5%",
    },
}))(TableCell);

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
