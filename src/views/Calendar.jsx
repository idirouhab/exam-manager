import React, { Fragment, useEffect, useState } from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import { withStyles } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import IconButton from "@material-ui/core/IconButton";
import grey from "@material-ui/core/colors/grey";
import Button from "@material-ui/core/Button";
import { useTranslation } from "react-i18next";
import { moment } from "../variables/general";
import AssignTask from "../components/Calendar/AssignTask";
import ExamProvider from "../providers/exam";
import EventProvider from "../providers/event";
import Chip from "@material-ui/core/Chip";
import Tooltip from "@material-ui/core/Tooltip";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(1),
    color: theme.palette.text.secondary,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  currentDay:
    {
      backgroundColor: grey[200],
    },
}));

const StyledTableCell = withStyles(() => ({
  body: {
    height: "50px",
    "&:hover": {
      backgroundColor: grey[500],
    },
    cursor: "pointer",
    border: "1px solid",
    borderColor: grey[100],
    whiteSpace: "normal",
    wordWrap: "break-word"
  },
}))(TableCell);

export default function Calendar () {
  const classes = useStyles();
  const { t } = useTranslation();
  const [dateObject, setDateObject] = useState(moment());
  const [open, setOpen] = React.useState(false);
  const [selectedDay, setSelectedDay] = React.useState(null);
  const [exams, setExams] = React.useState([]);
  const [events, setEvents] = React.useState([]);

  const firstDayOfMonth = () => {
    return moment(dateObject)
      .startOf("month")
      .format("d");
  };

  const fetchEvents = () => {
    EventProvider.fetchAll().then(data => {
      setEvents(data.data);
    });
  };

  useEffect(() => {

    if (!open) {
      fetchEvents();
    }
  }, [open]);

  const onDayClick = (e, d) => {
    const oldDateObject = dateObject.clone();
    oldDateObject.set("date", d);
    setDateObject(oldDateObject);
    setOpen(true);
  };

  const getExams = () => {
    ExamProvider.fetchExams().then(data => {
      let exams = [];
      data.forEach(exam => {
        exams.push(
          {
            id: exam.id,
            text: exam.text,
            questions: exam.questions,
            folderId: exam.folderId ? exam.folderId : -1,
            user: (exam.userId ? exam.userId.name : ""),
            answers: exam.answers,
            hide: false
          }
        );
      });
      setExams(exams);
    });
  };

  useEffect(getExams, []);

  const handleClose = () => {
    setOpen(false);
  };

  const currentDay = () => {
    return dateObject.format("D");
  };

  const month = () => {
    return dateObject.format("MMMM");
  };

  const year = () => {

    return dateObject.format("Y");
  };

  const getDaysInMonth = () => {
    return dateObject.daysInMonth();
  };

  const getEventDays = (day) => {
    const oldDateObject = dateObject.clone();
    oldDateObject.set("date", day);

    let selectedEvents = events.filter(event => {
      return moment(event.date).format("DD-MM-YYYY") === oldDateObject.format("DD-MM-YYYY");
    });

    return selectedEvents.map((selectedEvent) => {
      return <Fragment key={selectedEvent.examId._id}><br/><Tooltip title={selectedEvent.examId.text}><Chip
        className={classes.chip}
        color="primary" size="small"
        label={selectedEvent.examId.text.replace(/(.{8})..+/, "$1…")}/></Tooltip><br/></Fragment>;
    });
  };

  let blanks = [];
  for (let i = 0; i < firstDayOfMonth(); i++) {
    blanks.push(<StyledTableCell key={`blank_${i}`}/>);
  }

  let daysInMonth = [];
  for (let d = 1; d <= getDaysInMonth(); d++) {
    let currentDay = (d == dateObject.format("D")) ? classes.currentDay : "";
    daysInMonth.push(
      <StyledTableCell onClick={e => {
        onDayClick(e, d);
      }} align={"center"} className={currentDay}
                       key={`month_${d}`}>{d} {getEventDays(d)}</StyledTableCell>
    );
  }

  let totalSlots = [...blanks, ...daysInMonth];
  let rows = [];
  let cells = [];
  totalSlots.forEach((row, i) => {
    if (i % 7 !== 0) {
      cells.push(row); // if index not equal 7 that means not go to next week
    } else {
      rows.push(cells); // when reach next week we contain all td in last week to rows
      cells = []; // empty container
      cells.push(row); // in current loop we still push current row to new container
    }
    if (i === totalSlots.length - 1) { // when end loop we add remain date
      rows.push(cells);
    }
  });
  let daysinmonth = rows.map((d, i) => {
    return <TableRow key={`day_month_${i}`}>{d}</TableRow>;
  });

  const onPrev = () => {
    const oldDateObject = dateObject.clone();
    oldDateObject.subtract(1, "month");
    setDateObject(oldDateObject);

  };
  const onNext = () => {
    const oldDateObject = dateObject.clone();
    oldDateObject.add(1, "month");
    setDateObject(oldDateObject);
  };

  const resetDay = () => {
    setDateObject(moment());
  };

  return (
    <>
      <Fragment>
        <Grid container spacing={3} justify={"center"}>
          <Grid item xs={12} md={12}>
            <TableContainer className={classes.paper} component={Paper}>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <TableCell align="center" colSpan={moment.weekdaysShort().length}>
                      <Typography variant="h5" gutterBottom>
                        <strong>{month().toUpperCase()}-{year()}</strong>
                      </Typography>
                      <IconButton component="span" onClick={onPrev}>
                        <ArrowBackIosIcon/>
                      </IconButton>
                      <Button onClick={resetDay}>{t("today")}</Button>
                      <IconButton component="span" onClick={onNext}>
                        <ArrowForwardIosIcon/>
                      </IconButton>
                    </TableCell>

                  </TableRow>

                  <TableRow>
                    {moment.weekdaysShort(true).map(day => {
                      return <StyledTableCell align={"center"} key={day}>{day}</StyledTableCell>;
                    })}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {daysinmonth}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <AssignTask
            classes={{
              paper: classes.paperBox,
            }}
            keepMounted
            open={open}
            onClose={handleClose}
            value={"test"}
            date={dateObject}
            exams={exams}
          />
        </Grid>

      </Fragment>
    </>
  );
}
