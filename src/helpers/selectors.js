export function getAppointmentsForDay(state, day) {
  
  const results = [];
  for (const element of state.days) {
    if (element.name === day) {
      for (const value of element.appointments) {
          results.push(state.appointments[value]);
      }
    }
  }
  return results;
  
}
