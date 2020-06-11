import React from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { useTranslation } from "react-i18next";
import useStyles from "./style";

export default function ShortAnswer (props) {
  const classes = useStyles();
  const { t } = useTranslation();

  return (<>
    <Grid item xs={8}>
      <Paper className={classes.paper} square>
        <Grid item xs={12}>
          <div className={classes.inlineInput}>
            <TextField
              label={t("create_exam.label.answer")}
              fullWidth
              multiline
              onChange={e => props.updateAnswerText(e, props.indexQuestion, 0)}
            />
          </div>
        </Grid>
      </Paper>
    </Grid>
  </>);
}