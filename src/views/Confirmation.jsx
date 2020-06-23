import React, { useEffect, useState } from "react";
import ConfirmationProvider from "../providers/confirmation";

export default function Confirmation (props) {
  const [showError, setShowError] = useState(false);
  useEffect(() => {
    const verificationToken = props.match.params.token;
    ConfirmationProvider.get(verificationToken)
      .then(() => {
        props.history.push("/login");
      }).catch(() => {
      setShowError(true);
    });
  }, []);

  return (
    <div>
      {showError && <p>Couldn't get confirmation</p>}
    </div>
  );
}
