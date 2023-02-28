import React from "react";
import classNames from "classnames";
import "components/InterviewerListItem.scss";

export default function InterviewerListItem(props) {
  const interviewerClass = classNames("interviewers__item", {
    interviewers__item: true,
    "interviewers__item--selected": props.selected,
  });

  return (
    <li
      className={interviewerClass}
      onClick={() => props.setInterviewer(props.id)}
    >
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  );
}

/*
InterviewerListItem props
  - id:number id of the interviewer
  - name:string name of the interviewer
  - avatar:url to an image of the interviewer

  - selected:boolean determines if an interviewer is selected or not and displays the name and applies appropriate styles if selected.

  - setInterviewer:function runs when <InterviewerListItem> is clicked. Receives interviewer's id as an argument. Sets the selected interviewer.
  
*/
