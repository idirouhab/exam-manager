import React, { Fragment, useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useTranslation } from "react-i18next";
import Box from "@material-ui/core/Box";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import { Add } from "@material-ui/icons";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import FolderProvider from "../../providers/folder";
import FolderModel from "../../models/folder";
import CreateFolderModal from "../Folders/CreateFolderModal";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

export default function ExamConfiguration (props) {
  const { t } = useTranslation();

  const [createFolderModal, setCreateFolderModal] = useState(false);
  const [folders, setFolders] = useState([]);
  const [validateForm, setValidateForm] = useState(false);

  useEffect(() => {
    getFolders();
  }, [createFolderModal]);

  const getFolders = () => {
    FolderProvider.fetchFolders().then(response => {
      const responseFolders = response.data;
      let finalFolder = responseFolders.map(folder => {
        return new FolderModel(folder.id, folder.name);
      });
      setFolders(finalFolder);
    });
  };

  const createFolder = (folder) => {
    FolderProvider.saveFolder(folder).then(({ data }) => {
      setCreateFolderModal(false);
      props.updateExamAttr("folderId", data.id);
    });
  };

  const next = () => {
    setValidateForm(true);
    if (isValid()) {
      props.handleClose();
    }
  };

  const isValid = () => {
    const { exam } = props;
    return !(!exam.text || !exam.folderId);
  };

  return (
    <Fragment>
      <CreateFolderModal createFolder={createFolder} open={createFolderModal} handleClose={() => {
        setCreateFolderModal(false);
      }}/>
      <Dialog open={props.open}>
        <DialogTitle>{t("create_exam.exam_configuration")}</DialogTitle>
        <DialogContent>
          <Grid container>
            <Grid item style={{ width: "100vw" }}>
              <Box mt={2}>
                <FormControl
                  style={{ width: "100%" }}
                  error={validateForm && !props.exam.folderId}>
                  <InputLabel>{t("select_your_folder")}</InputLabel>
                  <Box mt={3}>
                    <Select
                      displayEmpty
                      style={{ width: "100%" }}
                      startAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => {
                              setCreateFolderModal(true);
                            }}
                          >
                            <Add/>
                          </IconButton>
                        </InputAdornment>
                      }
                      onChange={e => {props.updateExamAttr("folderId", e.target.value);}}
                      value={props.exam.folderId || ""}
                    >
                      {folders.map((folder, key) => {
                        return <MenuItem key={`menu_${key}`}
                                         value={folder.id}>{folder.name}</MenuItem>;
                      })}
                    </Select>
                    {validateForm && !props.exam.folderId &&
                    <FormHelperText>{t("create_exam.label.empty")}</FormHelperText>}
                  </Box>
                </FormControl>
              </Box>
              <Box mt={2}>
                <TextField
                  required
                  fullWidth
                  onChange={e => {props.updateExamAttr("text", e.target.value);}}
                  label={t("create_exam.label.title")}
                  helperText={validateForm && !props.exam.text ? t("create_exam.label.empty") : ""}
                  error={validateForm && !props.exam.text}
                  value={props.exam.text}
                  inputProps={{
                    style: {
                      fontWeight: "bold",
                      fontSize: "20px"
                    }
                  }}/>
              </Box>
              <Box mt={2}>
                <TextField
                  fullWidth
                  id="exame-subtitle"
                  label={t("create_exam.label.subtitle")}
                  value={props.exam.subtitle}
                  onChange={e => {props.updateExamAttr("subtitle", e.target.value);}}
                />
              </Box>
              <Box mt={2}>
                <FormControlLabel
                  checked={props.exam.notify}
                  onChange={e => {props.updateExamAttr("notify", e.target.checked);}}
                  control={<Checkbox/>}
                  label={t("create_exam.label.notify")}
                />
              </Box>
              <Box mt={2}>
                <FormControlLabel
                  checked={props.exam.random}
                  onChange={e => {props.updateExamAttr("random", e.target.checked);}}
                  control={<Checkbox/>}
                  label={t("create_exam.label.random")}
                />
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={next} color="primary">
            {t("create_exam.label.continue")}
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}
