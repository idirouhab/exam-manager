import React from "react";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import { withStyles } from "@material-ui/styles";
import Checkbox from "@material-ui/core/Checkbox";

const StyledTableCell = withStyles((theme) => ({
  head: {
    width: "5%",
  },
  body: {
    width: "5%",
  },
}))(TableCell);

export default function User (props) {
  return (
    <>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            checked={props.user.isBlocked}
            onChange={(e) => props.update(props.user.id, e,"isBlocked")}
          />
        </TableCell>
        <TableCell padding="checkbox">
          <Checkbox
            checked={props.user.isVerified}
            onChange={(e) => props.update(props.user.id, e,"isVerified")}
          />
        </TableCell>
        <TableCell component="th" scope="row">
          {props.user.role}
        </TableCell>
        <TableCell component="th" scope="row">
          {props.user.username}
        </TableCell>

        <StyledTableCell size="small" align="center">
          <Button
            size={"small"}
            id={`delete_${props.index}`}
            variant="contained"
            color="secondary"
            onClick={(e) => {
              props.deleteUser(props.user.id);
            }}
          >
            <Icon>delete</Icon>
          </Button>
        </StyledTableCell>
      </TableRow>
    </>
  );
};
