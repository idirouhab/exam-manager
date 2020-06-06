import React from "react";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import { withStyles } from "@material-ui/styles";
import { humanFileSize } from "../../variables/general";

const StyledTableCell = withStyles(() => ({
    head: {
        width: "5%",
    },
    body: {
        width: "5%",
    },
}))(TableCell);

export default function Image(props) {

    return (
        <>
            <TableRow>
                <TableCell component="th" scope="row">
                    {props.image.id}
                </TableCell>
                <TableCell component="th" scope="row">
                    {props.image.examTitle}
                </TableCell>
                <TableCell component="th" scope="row">
                    {humanFileSize(props.image.contentLength)}
                </TableCell>
                <StyledTableCell size="small" align="center">
                    <Button
                        size={"small"}
                        id={`delete_${props.index}`}
                        variant="contained"
                        color="secondary"
                        onClick={(e) => {
                            props.deleteImage(props.image.id)
                        }}
                    >
                        <Icon>delete</Icon>
                    </Button>
                </StyledTableCell>
            </TableRow>
        </>
    );
};
