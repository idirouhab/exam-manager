import React, { Fragment } from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { useTranslation } from "react-i18next";
import useStyles from "./style";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { Clear } from "@material-ui/icons";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import Input from "@material-ui/core/Input";
import Typography from "@material-ui/core/Typography";

export default function MultipleChoice (props) {
  const classes = useStyles();
  const { t } = useTranslation();

  return (<>
    <Grid container justify="center">
      {props.options.map((option, indexOption) => {
        return <Grid item xs={12} key={`option_${props.indexQuestion}_${indexOption}`}>
          <Paper elevation={0} className={classes.paper} square>
            <Grid item xs={12}>
              {(props.validateForm && !props.options.find(option => option.correct)) &&
              <Typography style={{ color: "#f44336" }}>{t("create_exam.label.option_not_select")}</Typography>}
              <div className={classes.inlineInput}>
                <FormControlLabel
                  label={
                    <Input
                      value={option.text}
                      style={{ width: "100%" }}
                      label={t("create_exam.label.option")}
                      autoFocus={props.options.length > 1}
                      onChange={e => props.updateAnswerText(e, props.indexQuestion, indexOption)}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            edge="end"
                          >
                            {props.options.length > 1 && <Clear
                              onClick={(e) => props.deleteOption(props.indexQuestion, indexOption)}/>}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  }
                  control={<Radio
                    checked={option.correct}
                    onChange={(e) => props.updateOptionCheckBox(e, props.indexQuestion, indexOption)}
                  />}
                />
              </div>
            </Grid>
          </Paper>
        </Grid>;
      })}
      <Grid item xs={12}>
        <Paper elevation={0} className={classes.paper} square>
          <Grid item xs={12}>
            <div className={classes.inlineInput}>
              <FormControlLabel
                label={
                  <TextField
                    fullWidth
                    label={t("create_exam.label.option")}
                    readOnly
                    onClick={(e) => props.addOptionToQuestion(props.indexQuestion)}
                  />
                }
                control={<Fragment/>}
              />
            </div>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  </>);
}
