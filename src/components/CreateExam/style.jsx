import {makeStyles} from "@material-ui/core/styles";
import blue from "@material-ui/core/colors/blue";
import {red} from "@material-ui/core/colors";
import green from "@material-ui/core/colors/green";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    paperBottom:{
        textAlign: 'center',
        color: theme.palette.text.secondary,
        backgroundColor: "transparent",
        boxShadow: "none"
    },
    titleInput: {
        fontWeight: "bold",
        fontSize: "30px"
    },
    inlineInput: {
        '& > *': {
            margin: theme.spacing(1),
        },
        textAlign: "left"
    },
    buttonAddQuestion: {
        backgroundColor: blue[500],
        "&:hover": {
            backgroundColor: blue[700]
        }
    },
    buttonDeleteQuestion: {
        backgroundColor: red[500],
        "&:hover": {
            backgroundColor: red[700]
        }
    },
    margin: {
        margin: theme.spacing(1),
    },
    withoutLabel: {
        marginTop: theme.spacing(3),
    },
    textField: {
        width: '25ch',
    },
    navBar:{
        textAlign: "center",
        overflow: "hidden",
        position: "fixed",
        bottom: 0,

        left: 0
    },
    buttonSuccess: {
        backgroundColor: green[500],
        "&:hover": {
            backgroundColor: green[700]
        },
    },
    buttonSaveExam:{
        backgroundColor: blue[500],
        "&:hover": {
            backgroundColor: blue[700]
        },
        color: "white"
    },
    wrapper: {
        textAlign: "center",
        margin: theme.spacing(1),
        position: 'relative',
    },
}));


export default useStyles;