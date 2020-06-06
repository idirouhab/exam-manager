import React, { useState } from "react";
import { moment } from "../../variables/general";
import humanizeDuration from "humanize-duration";

import Typography from "@material-ui/core/Typography";

export default function CountDown (props) {
  const [days, setDays] = useState("");
  const [minutes, setMinutes] = useState("");
  const [hours, setHours] = useState("");
  const [seconds, setSeconds] = useState("");

  useState(() => {
    let interval = setInterval(() => {
      const { timeTillDate, timeFormat } = props;
      const then = moment(timeTillDate, timeFormat);
      const now = moment();
      const countdown = moment(then - now);
      const days = countdown.format("D");
      const hours = countdown.format("HH");
      const minutes = countdown.format("mm");
      const seconds = countdown.format("ss");
      setSeconds(seconds);
      setMinutes(minutes);
      setHours(hours);
      setDays(days);

    }, 1000);

    return () => {
      clearInterval(interval);
    };

  }, []);

  return (<Typography variant="h4" component="h2">
      {humanizeDuration(moment(props.timeTillDate, props.timeFormat).millisecond())}
    </Typography>
  );

}
