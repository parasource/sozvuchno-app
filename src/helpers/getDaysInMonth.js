export function getDaysInMonth(month, year) {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysArray = [];

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    const dayOfWeek = date.toLocaleString('en-EU', { weekday: 'long' });

    daysArray.push({ date: day, day: dayOfWeek.toLowerCase() });
  }

  return daysArray;
}