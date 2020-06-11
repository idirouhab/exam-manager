import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useTranslation } from "react-i18next";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { createFilterOptions } from "@material-ui/lab";
import FolderModel from "../../models/folder";
import Tag from "../../models/tag";
import { Box } from "@material-ui/core";

export default function CreateFolderModal (props) {
  const { t } = useTranslation();
  const [folder, setFolder] = useState(new FolderModel());
  const maxWidth = "xs";

  const filter = createFilterOptions();

  return (
    <Dialog open={props.open} onClose={props.handleClose} maxWidth={maxWidth} fullWidth={true}>
      <DialogTitle> {t("create_folder")}</DialogTitle>
      <DialogContent>
        <Box my={4}>
          <TextField
            variant='outlined'
            autoFocus
            fullWidth
            label={t("folder_name")}
            onChange={(e) => {
              folder.name = e.target.value;
              setFolder(folder);
            }}
          />
        </Box>
        <Box my={2}>
          <Autocomplete
            multiple
            options={[]}
            defaultValue={[]}
            getOptionLabel={(option) => {
              if (option.inputValue) {
                return option.inputValue;
              }
              return option.tagName;
            }}
            onChange={(event, newValues) => {
              folder.tags = newValues.map(({ inputValue }) => {
                return new Tag(null, inputValue);
              });
              setFolder(folder);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                label={t("tags")}
              />
            )}
            filterOptions={(options, params) => {
              const filtered = filter(options, params);
              // Suggest the creation of a new value
              if (params.inputValue !== "") {
                filtered.push({
                  inputValue: params.inputValue,
                  tagName: `Add "${params.inputValue}"`,
                });
              }
              return filtered;
            }}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose} color="primary">
          {t("cancel")}
        </Button>
        <Button onClick={e => props.createFolder(folder)} color="primary">
          {t("save")}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
