export default function getAppointmentsForDay(state, day) {
  const results = [];
  for (const element of state.days) {
    if (element.name === day) {
      for (const value of element.appointments) {
        if (state.appointments[value]) {
          results.push(state.appointments[value]);
        }
      }
    }
  }
  return results;
}

export function getInterview(state, interview) {
  const results = {};
  if (interview) {
    results.student = interview.student;
    results.interviewer = state.interviewers[interview.interviewer];
  } else {
    return null;
  }
  return results;
}

export function getInterviewersForDay(state, day) {
  const results = [];
  for (const element of state.days) {
    if (element.name === day) {
      for (const value of element.interviewers) {
        if (state.interviewers[value]) {
          results.push(state.interviewers[value]);
        }
      }
    }
  }
  return results;
}
