import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import React, {Fragment} from "react";
import Grid from "@material-ui/core/Grid";
import {useTranslation} from "react-i18next";
import {makeStyles} from "@material-ui/core/styles";
import green from "@material-ui/core/colors/green";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import Divider from "@material-ui/core/Divider";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TableFooter from "@material-ui/core/TableFooter";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Input from "@material-ui/core/Input";
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


    return (
        <>
            <Grid item xs={12}>
                <Paper square elevation={20}>
                    <Container>
                        <Box my={4} pt={2}>
                            <TextField
                                id={`question_${props.questionIndex}`}
                                label={t('create_exam.label.question')}
                                onChange={(e) => props.updateCurrentQuestionTitle(e, props.questionIndex)}
                                fullWidth
                                value={props.question.text}
                                error={props.submittedQuestion && !props.question.text}
                                helperText={props.submittedQuestion && !props.question.text ? t('create_exam.label.empty') : ''}
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
                                                {props.questionIndex+1}) {t('option_header')}
                                                {(props.checkedOptions.length === 0 && props.submittedQuestion) && (
                                                    <span
                                                        className="radioButtonError"><br/>{t('create_exam.label.option_not_select')}</span>
                                                )}
                                            </TableCell>
                                            <TableCell/>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {props.options.map((option, optionIndex) => (
                                            <Option
                                                key={`option_${props.questionIndex}_${optionIndex}`}
                                                questionIndex={props.questionIndex}
                                                optionIndex={optionIndex}
                                                option={option}
                                                updateOptionText={props.updateOptionText}
                                                numberOptions={props.options.length}
                                                submittedQuestion={props.submittedQuestion}
                                                deleteOptionFromQuestion={props.deleteOptionFromQuestion}
                                                updateOptionCheckBox={props.updateOptionCheckBox}
                                                checkedOptions={props.checkedOptions}
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
                                                                onClick={(e) => props.addOptionToQuestion(props.questionIndex)}
                                                                readOnly
                                                                id={`question_input_add`}

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
                                    id={`question_save_${props.questionIndex}`}
                                    onClick={() => props.saveQuestion(props.questionIndex)}
                                    variant="contained"
                                    color="primary"
                                    size="large"
                                    className={classes.button}
                                >
                                    <Icon>add</Icon>
                                </Button>
                                {props.numberQuestion > 1 && (<Button
                                    id={`question_delete_${props.questionIndex}`}
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
                </Paper>
            </Grid>
        </>
    )
}