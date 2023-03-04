import React from "react";
import "components/Appointment/styles.scss";
import useVisualMode from "hooks/useVisualMode";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETE = "DELETE";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };
    transition(SAVING);
    props.bookInterview(props.id, interview).then(() => transition(SHOW));
  }

  function deleteAppt() {
    transition(DELETE);
    props.cancelInterview(props.id).then(() => transition(EMPTY));
  }

  function confirmCancel() {
    transition(CONFIRM);
  }

  return (
    <article className="appointment">
      <Header time={props.time} />

      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}

      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onEdit={() => transition(EDIT)}
          onDelete={confirmCancel}
        />
      )}

      {mode === CREATE && (
        <Form interviewers={props.interviewers} onSave={save} onCancel={back} />
      )}

      {mode === SAVING && <Status message={"Saving"} />}
      {mode === DELETE && <Status message={"Deleting"} />}

      {mode === CONFIRM && (
        <Confirm
          message={"Are you sure you would like to delete?"}
          onConfirm={deleteAppt}
          onCancel={back}
        />
      )}

      {mode === EDIT && (
        <Form
          interviewer={props.interview.interviewer.id}
          interviewers={props.interviewers}
          student={props.interview.student}
          onCancel={() => transition(SHOW)}
          onSave={save}
        />
      )}
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
