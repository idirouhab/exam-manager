import {useTranslation} from "react-i18next";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import React from "react";

export default function Exam(props) {
    const {t} = useTranslation("common");
    return (
        <>
            <Grid item xs={12}>
                <Paper square elevation={20}>
                    <Container>
                        <Box py={2}>
                            <TextField
                                label={t('create_exam.label.title')}
                                onChange={props.updateExamTitle}
                                fullWidth
                                value={props.text}
                                id="exam_title"
                                error={props.submittedForm && !props.text }
                                helperText={props.submittedForm && !props.text ? t('create_exam.label.empty') : ''}
                            />
                        </Box>
                    </Container>
                </Paper>
            </Grid>
        </>
    )
}