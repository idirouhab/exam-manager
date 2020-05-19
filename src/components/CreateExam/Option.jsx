import TextField from "@material-ui/core/TextField";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import React from "react";
import {useTranslation} from "react-i18next";
import {withStyles} from "@material-ui/core/styles";

const StyledTableCell = withStyles((theme) => ({
    head: {
        width: "5%",
    },
    body: {
        width: "5%",
    },
}))(TableCell);

export default function Option(props) {
    const {t} = useTranslation("common");

    return (
        <>
            <TableRow>
                <TableCell>
                    <FormControl
                        component="fieldset"
                        fullWidth>
                        <FormControlLabel
                            key={props.optionIndex}
                            value={props.option.text}
                            label={
                                <TextField
                                    id={`option_${props.questionIndex}_${props.optionIndex}`}
                                    fullWidth
                                    label={t('create_exam.label.option')}
                                    value={props.option.text}
                                    onChange={(e) => props.updateOptionText(e, props.questionIndex, props.optionIndex)}
                                    autoFocus={props.numberOptions > 1}
                                    error={props.submittedQuestion && !props.option.text }
                                    helperText={props.submittedQuestion && !props.option.text ? t('create_exam.label.empty') : ''}

                                />
                            }
                            control={<Radio
                                id={`option_radio_${props.questionIndex}_${props.optionIndex}`}
                                checked={props.optionIndex === props.checkedOptions[props.questionIndex]}

                                onChange={(e) => props.updateOptionCheckBox(e, props.questionIndex, props.optionIndex)}
                            />}
                        />
                    </FormControl>
                </TableCell>
                <StyledTableCell>
                    {props.numberOptions > 1 && (
                        <Button
                            id={`question_clear_${props.questionIndex}_${props.optionIndex}`}
                            display="none"
                            variant="contained"
                            color="secondary"
                            onClick={() => props.deleteOptionFromQuestion(props.questionIndex, props.optionIndex)}
                        >
                            <Icon>clear</Icon>
                        </Button>
                    )}
                </StyledTableCell>
            </TableRow>
        </>
    )
}
