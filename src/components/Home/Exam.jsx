import React from "react";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Button from "@material-ui/core/Button";
import { Link as RouterLink } from "react-router-dom";
import Icon from "@material-ui/core/Icon";
import { withStyles } from "@material-ui/styles";
import { makeStyles } from "@material-ui/core/styles";
import green from "@material-ui/core/colors/green";
import blue from "@material-ui/core/colors/blue";
import brown from "@material-ui/core/colors/brown";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Tooltip from "@material-ui/core/Tooltip";
import { useTranslation } from "react-i18next";

const StyledTableCell = withStyles(() => ({
  head: {
    width: "5%",
  },
  body: {
    width: "5%",
  },
}))(TableCell);

const useStyles = makeStyles(() => ({
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

export default function Exam (props) {
  const classes = useStyles();
  const { t } = useTranslation("common");

  return (
    <>
      <TableRow>
        <StyledTableCell align="center">
          {props.exam.user}
        </StyledTableCell>
        <TableCell>
          {props.exam.text} ({props.exam.answers.length})
        </TableCell>
        <TableCell>
          <Select
            onChange={(e) => props.updateExamFolder(e, props.exam.id)}
            value={props.exam.folderId}
          >
            <MenuItem value={-1}>
              <em>None</em>
            </MenuItem>
            {props.folders.map((folder, key) => {
              return <MenuItem key={`menu_${key}`} value={folder.id}>{folder.name}</MenuItem>;
            })}
          </Select>
        </TableCell>
        <StyledTableCell align="center">
          <Tooltip title={t("stats_exam")}>
            <Button
              id={`stats_${props.index}`}
              variant="contained"
              color="primary"
              size={"small"}
              component={RouterLink}
              className={`${classes.buttonPrimary}`}
              to={`/admin/stats/${props.exam.id}`}
            >
              <Icon>equalizer</Icon>
            </Button>
          </Tooltip>
        </StyledTableCell>
        <StyledTableCell align="center">
          <Tooltip title={t("link_exam")}>
            <Button
              id={`quiz_${props.index}`}
              className={`${classes.buttonSuccess}`}
              variant="contained"
              color="primary"
              size={"small"}
              component={RouterLink}
              to={`/quiz/${props.exam.id}`}
              target="_blank"
            >
              <Icon>share</Icon>
            </Button>
          </Tooltip>
        </StyledTableCell>
        <StyledTableCell align="center">
          <Tooltip title={t("clone_exam")}>
            <Button
              id={`copy_${props.index}`}
              className={`${classes.buttonBrown}`}
              size={"small"}
              variant="contained"
              color="primary"
              component={RouterLink}
              to={`/admin/clone-exam/${props.exam.id}`}
            >
              <Icon>file_copy</Icon>
            </Button>
          </Tooltip>
        </StyledTableCell>
        <StyledTableCell align="center">
          <Tooltip title={t("edit_exam")}>
            <Button
              id={`copy_${props.index}`}
              variant="contained"
              color="primary"
              size={"small"}
              component={RouterLink}
              to={`/admin/edit-exam/${props.exam.id}`}
            >
              <Icon>edit</Icon>
            </Button>
          </Tooltip>
        </StyledTableCell>
        <StyledTableCell align="center">
          <Tooltip title={t("delete_exam")}>
            <Button
              id={`delete_${props.index}`}
              variant="contained"
              color="secondary"
              size={"small"}
              onClick={(e) => {
                props.deleteExam(props.exam.id);
              }}
            >
              <Icon>delete</Icon>
            </Button>
          </Tooltip>
        </StyledTableCell>
      </TableRow>
    </>
  );
};
