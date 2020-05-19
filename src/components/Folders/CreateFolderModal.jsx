import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {useTranslation} from "react-i18next";
import Autocomplete from '@material-ui/lab/Autocomplete';
import {createFilterOptions} from "@material-ui/lab";
import FolderModel from "../../models/folder";
import Tag from "../../models/tag";
import {Box} from "@material-ui/core";


export default function CreateFolderModal(props) {
    const {t} = useTranslation('common');

    const maxWidth = 'xs';

    const filter = createFilterOptions();

    return (
        <Dialog open={props.open} onClose={props.handleClose} maxWidth={maxWidth} fullWidth={true}>
            <DialogTitle> {t('create_folder')}</DialogTitle>
            <DialogContent>
                <Box my={4}>
                    <TextField
                        variant='outlined'
                        autoFocus
                        fullWidth
                        defaultValue={props.folder.name}
                        label={t("folder_name")}
                        onChange={(e) => {
                            props.folder.name = e.target.value;
                        }}
                    />
                </Box>

                <Box my={2}>
                    <Autocomplete
                        multiple
                        options={[]}
                        value={props.folder.tags}
                        defaultValue={props.folder.tags}
                        getOptionLabel={(option) => {
                            if (option.id) {
                                return option.id;
                            }

                            return option.name
                        }}
                        onChange={props.onUpdateTags}
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
                            if (params.inputValue !== '') {

                                filtered.push({
                                    id: params.inputValue,
                                    name: `Add "${params.inputValue}"`,
                                });
                            }

                            return filtered;
                        }}
                    />
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleClose} color="primary">
                    {t('cancel')}
                </Button>
                <Button onClick={e => props.createFolder(props.folder)} color="primary">
                    {t('save')}
                </Button>
            </DialogActions>
        </Dialog>
    );
}
