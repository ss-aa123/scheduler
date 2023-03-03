import React from "react";
import "components/Appointment/styles.scss";
import useVisualMode from "hooks/useVisualMode";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };
    transition(SAVING);
    props
      .bookInterview(props.id, interview)
      .then(() => transition(SHOW))
  }

  return (
    <article className="appointment">
      <Header time={props.time} />

      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}

      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          //onEdit={() => transition()}
          //onDelete={() => transition()}}
        />
      )}

      {mode === CREATE && (
        <Form interviewers={props.interviewers} onSave={() => save()} onCancel={() => back()} />
      )}

      {mode === SAVING && <Status message={"Saving"} />}
    </article>
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
