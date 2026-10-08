const startOfDay = (date) => new Date(date).setHours(0, 0, 0, 0);

export function isOnLeaveToday(employee) {
  const today = startOfDay(new Date());

  return (employee.leaveDates ?? []).some(
    (leave) => startOfDay(leave.from) <= today && today <= startOfDay(leave.to)
  );
}
