import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {useTranslation} from "react-i18next";
import Autocomplete from '@material-ui/lab/Autocomplete';
import {createFilterOptions} from "@material-ui/lab";


export default function CreateFolderModal(props) {
    const [open, setOpen] = React.useState(false);
    const {t} = useTranslation('common');
    const [value, setValue] = React.useState([]);

    const filter = createFilterOptions();

    return (
        <div>

            <Dialog open={props.open} onClose={props.handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title"> {t('create_folder')}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {t('create_folder.modal.header')}
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Email Address"
                        type="email"
                        fullWidth
                    />

                    <Autocomplete
                        multiple
                        id="tags-outlined"
                        options={[]}
                        getOptionLabel={(option) => {

                            if (option.inputValue) {
                                return option.inputValue;
                            }

                            return option.title
                        }}
                        onChange={(event, newValues) => {
                            let result = newValues.map(({inputValue}) => inputValue)
                            setValue(result);


                        }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                variant="outlined"
                                label="filterSelectedOptions"
                                placeholder="Favorites"
                            />
                        )}
                        filterOptions={(options, params) => {
                            const filtered = filter(options, params);

                            // Suggest the creation of a new value
                            if (params.inputValue !== '') {
                                filtered.push({
                                    inputValue: params.inputValue,
                                    title: `Add "${params.inputValue}"`,
                                });
                            }

                            return filtered;
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={props.handleClose} color="primary">
                        Subscribe
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
