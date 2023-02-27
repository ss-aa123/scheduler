import React from "react";
import classNames from "classnames";
import "components/Button.scss";

export default function Button(props) {
  const buttonClass = classNames("button", {
    " button--confirm": props.confirm,
    " button--danger": props.danger,
  });

  return (
    <button
      className={buttonClass}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
}

/*
DayListItem props
   - name:String the name of the day
   - spots:Number the number of spots remaining
   - selected:Boolean true or false declaring that this day is selected
   - setDay:Function accepts the name of the day eg. "Monday", "Tuesday"

DayList props
   - days:Array a list of day objects (each object includes an id, name, and spots)
   - day:String the currently selected day
   - setDay:Function accepts the name of the day eg. "Monday", "Tuesday"

*/