import React from "react";
import Button from "@material-ui/core/Button";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import withStyles from "@material-ui/core/styles/withStyles";
import blue from "@material-ui/core/colors/blue";
import EventProvider from "../../providers/event";

const BlueCheckbox = withStyles({
  root: {
    color: blue[400],
    "&$checked": {
      color: blue[600],
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

export default function AssignTask (props) {
  const { onClose, value: valueProp, open, ...other } = props;
  const [value, setValue] = React.useState(valueProp);
  const radioGroupRef = React.useRef(null);

  React.useEffect(() => {
    if (!open) {
      setValue(valueProp);
    }
  }, [valueProp, open]);

  const handleEntering = () => {
    if (radioGroupRef.current != null) {
      radioGroupRef.current.focus();
    }
  };

  const handleCancel = () => {
    onClose();
  };

  const handleOk = () => {
    onClose(value);
  };

  const handleChange = (event) => {
    const data = {
      examId: event.target.value,
      date: props.date.toISOString()
    };

    if (event.target.checked) {
      EventProvider.save(data);
    } else {
      EventProvider.delete(data);
    }
  };

  return (
    <Dialog
      disableBackdropClick
      disableEscapeKeyDown
      onEntering={handleEntering}
      aria-labelledby="confirmation-dialog-title"
      open={open}
      {...other}
    >
      <DialogTitle id="confirmation-dialog-title">{props.date.format("DD-MMMM-YYYY").toUpperCase()}</DialogTitle>
      <DialogContent dividers>
        {props.exams.map((exam) => (
          <FormControlLabel value={exam.id} key={exam.id} control={<BlueCheckbox onChange={handleChange}/>}
                            label={exam.text}/>
        ))}

      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleCancel} color="primary">
          Cancel
        </Button>
        <Button onClick={handleOk} color="primary">
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
}