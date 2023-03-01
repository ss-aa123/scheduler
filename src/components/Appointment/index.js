import React from "react";
import "components/Appointment/styles.scss";

export default function Appointment(props) {

  return(
    <article className="appointment"></article>

  );
}


/*
Appointment component's children:
  - Header displays the time for the appointment
  - Empty allows a user to choose which time slot to book
  - Show allows a user to see an existing appointment
  - Confirm allows a user to confirm a destructive action
  - Status informs the user that an operation is in progress
  - Error informs the user when an error occurs
*/