import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  //Sets default states for the following variables
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = (day) => setState({ ...state, day });

  const updateSpots = (day, days, appointments) => {
    const currentDay = days.find((dayy) => dayy.name === day);
    const currentSpots = currentDay.appointments;
    let spots = 0;
    for (const currentSpot of currentSpots) {
      if (!appointments[currentSpot].interview) {
        spots++;
      }
    }
    currentDay.spots = spots;
  };

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    return axios.put(`/api/appointments/${id}`, { interview }).then(() => {
      updateSpots(state.day, state.days, appointments);
      setState({ ...state, appointments });
    });
  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    return axios.delete(`/api/appointments/${id}`).then(() => {
      state.appointments[id].interview = null;
      updateSpots(state.day, state.days, state.appointments);
      setState({ ...state, appointments, days: state.days });
    });
  }

  return { state, setDay, bookInterview, cancelInterview, updateSpots };
}
