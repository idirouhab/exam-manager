import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import { useTranslation } from "react-i18next";
import green from "@material-ui/core/colors/green";
import red from "@material-ui/core/colors/red";
import { Check, Clear, Visibility } from "@material-ui/icons";
import IconButton from "@material-ui/core/IconButton";

export default function MaxWidthDialog (props) {
  const { t } = useTranslation("common");
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const getCorrectOption = (options) => {
    return options.find((option) => {
      return option.correct;
    }).text;
  };

  const getSelectedOption = (answers, question) => {
    let actualQuestion = answers.find((answer) => {
      return answer.question_id === question._id;
    });

    if (!actualQuestion) return "";
    return question.options.find((option) => {
      return option._id === actualQuestion.option_id;
    }).text;
  };

  const renderIcon = (selectedOption, correctOption) => {

    if (selectedOption === correctOption) {
      return <Check style={{ color: green[500] }}/>;
    }
    return <Clear style={{ color: red[500] }}/>;
  };

  return (
    <React.Fragment>
      <IconButton variant="outlined" color="primary" onClick={handleClickOpen}>
        <Visibility/>
      </IconButton>
      <Dialog
        fullWidth={true}
        maxWidth={"md"}
        open={open}
        onClose={handleClose}
      >
        <DialogContent>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell className="capitalize"/>
                  <TableCell className="capitalize">{t("question")}</TableCell>
                  <TableCell className="capitalize">{t("correct_answer")}</TableCell>
                  <TableCell className="capitalize">{t("selected_answer")}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {props.questions.map((question, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell className="capitalize">
                        {renderIcon(getSelectedOption(props.answers, question), getCorrectOption(question.options))}
                      </TableCell>
                      <TableCell className="capitalize">
                        {question.text}
                      </TableCell>
                      <TableCell
                        className="capitalize">{getCorrectOption(question.options)}</TableCell>
                      <TableCell
                        className="capitalize">{getSelectedOption(props.answers, question)}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

