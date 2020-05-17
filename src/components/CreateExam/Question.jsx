import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Divider from "@material-ui/core/Divider";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import TableFooter from "@material-ui/core/TableFooter";
import Input from "@material-ui/core/Input";
import React, {Fragment} from "react";
import Grid from "@material-ui/core/Grid";
import {useTranslation} from "react-i18next";
import {makeStyles} from "@material-ui/core/styles";
import green from "@material-ui/core/colors/green";
import Option from "./Option";

const useStyles = makeStyles((theme) => ({
    buttonSuccess: {
        backgroundColor: green[500],
        "&:hover": {
            backgroundColor: green[700]
        }
    },
    buttonBottomGroup: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));

export default function Question(props) {
    const {t} = useTranslation("common");
    const classes = useStyles();

    const emptyText = () => {
        return ("empty" in props.questionErrors > 0 ? props.questionErrors.empty : false)
    };

    const emptySelectedCorrect = () => {
        return ("selectedCorrect" in props.questionErrors > 0 ? !props.questionErrors.selectedCorrect : false)
    };

    return (
        <>
            <Grid item xs={12}>
                <Paper square elevation={20}>
                    <Container>
                        <Box my={4} pt={2}>
                            <TextField
                                id={`question_${props.questionIndex}` }
                                label={t('create_exam.label.question')}
                                onChange={(e) => props.updateCurrentQuestionTitle(e, props.questionIndex)}
                                fullWidth
                                value={props.question.text}
                                error={emptyText()}
                                helperText={emptyText() ? t('create_exam.label.empty') : ''}
                            />
                        </Box>
                    </Container>
                    <Divider/>
                    <Container>
                        <Box mt={4}>
                            <TableContainer>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>
                                                {t('option_header')}
                                                {emptySelectedCorrect() && (
                                                    <span
                                                        className="radioButtonError"><br/>{t('create_exam.label.option_not_select')}</span>
                                                )}
                                            </TableCell>
                                            <TableCell/>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {props.question.options.map((option, optionIndex) => (
                                            <Option
                                                key={`option_${optionIndex}`}
                                                questionIndex={props.questionIndex}
                                                optionIndex={optionIndex}
                                                option={option}
                                                updateOption={props.updateOption}
                                                numberOptions={props.question.options.length}
                                                checkedOptions={props.checkedOptions}
                                                updateOptionCheckBox={props.updateOptionCheckBox}
                                                optionErrors={("options" in props.questionErrors) ? props.questionErrors.options[optionIndex] : {}}
                                                questionErrors={props.questionErrors}
                                                deleteOption={props.deleteOption}

                                            />
                                        ))}
                                    </TableBody>
                                    <TableFooter>
                                        <TableRow>
                                            <TableCell>
                                                <FormControl component="fieldset" fullWidth>
                                                    <FormControlLabel
                                                        placeholder={t('create_exam.add_option')}
                                                        label={
                                                            <Input
                                                                fullWidth
                                                                style={{width: "100%!important"}}
                                                                placeholder={t('create_exam.label.option')}
                                                                onClick={(e) => props.addOption(props.questionIndex)}
                                                                readOnly
                                                                id={`question_input_add` }

                                                            />
                                                        }
                                                        control={<Fragment/>}
                                                    />
                                                </FormControl>

                                            </TableCell>
                                        </TableRow>
                                    </TableFooter>
                                </Table>
                            </TableContainer>
                        </Box>
                    </Container>
                    <Container>
                        <Box my={4}>
                            <div className={classes.buttonBottomGroup}>
                                <Button
                                    id={`question_save_${props.questionIndex}` }
                                    onClick={() => props.saveQuestion(props.questionIndex)}
                                    variant="contained"
                                    color="primary"
                                    size="large"
                                    className={classes.button}
                                >
                                    <Icon>add</Icon>
                                </Button>
                                {props.numberQuestion > 1 && (<Button
                                    id={`question_delete_${props.questionIndex}` }
                                    onClick={() => props.deleteQuestion(props.questionIndex)}
                                    variant="contained"
                                    color="secondary"
                                    size="large"
                                    className={classes.button}
                                >
                                    <Icon>delete</Icon>
                                </Button>)}
                            </div>
                        </Box>
                    </Container>
                    <Divider/>
                </Paper>
            </Grid>
        </>
    )
}