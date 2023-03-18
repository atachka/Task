// this file contains logic for generating a week based on a specific date
const generateWeek = (date) => {
  // obj to help determine how much days should be added in the week before or after the specific date
  const days = [
    { before: 0, after: 6 },
    { before: 1, after: 5 },
    { before: 2, after: 4 },
    { before: 3, after: 3 },
    { before: 4, after: 2 },
    { before: 5, after: 1 },
    { before: 6, after: 0 },
  ];
  const day = new Date(date);
  const dayOfTheWeek = days[day.getDay() - 1 == -1 ? 0 : day.getDay() - 1];
  const generatedDates = [date];
  let newDay = new Date(date);

  //add dates in the week before the specific date
  for (let i = 1; i <= dayOfTheWeek.before; i++) {
    generatedDates.unshift(
      new Date(newDay.setDate(newDay.getDate() - 1)).toISOString().split("T")[0]
    );
  }

  newDay = day;

  //add dates in the week after the specific date
  for (let i = 1; i <= dayOfTheWeek.after; i++) {
    generatedDates.push(
      new Date(newDay.setDate(newDay.getDate() + 1)).toISOString().split("T")[0]
    );
  }

  return generatedDates;
};

export default generateWeek;
