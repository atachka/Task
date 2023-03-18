// This file contains logic for natural user cashing out
import cashOut from "./cashOut.js";
import generateWeek from "./generateWeek.js";
import axios from "axios";

const handleNaturalUserCashOut = async (transaction, weekById) => {
  const {
    date,
    user_id,
    operation: { amount, currency: operationCurrency },
  } = transaction;
  const {
    percents: percent,
    week_limit: { amount: limitAmount, currency },
  } = await axios
    .get("https://developers.paysera.com/tasks/api/cash-out-natural")
    .then((response) => response.data);

  if (operationCurrency !== currency) {
    return "Can only work on euros";
  }

  // find index of the user by id in weekById array
  let foundIndex;
  weekById.forEach((el, index) => {
    if (el.user_id === user_id) {
      foundIndex = index;
    }
  });

  // if there is no user of this id in weekById create one and then last index in weekById is the index of that user
  if (foundIndex === undefined) {
    const dates = generateWeek(date);
    weekById.push({
      user_id: user_id,
      weeks: [{ amountLeft: limitAmount, dates }],
    });
    foundIndex = weekById.length - 1;
  }

  const weeksArr = weekById[foundIndex].weeks;

  // use savedLength in order to not iterate again, if the user doesn't have transactions in this specific week
  const savedLength = weeksArr.length;

  for (let i = 0; i < savedLength; i++) {
    const found = weeksArr[i].dates.find((el) => el === date);
    if (found) {
      const foundWeek = weeksArr[i];
      return cashOutHelper(foundWeek, amount, percent);
    } else {
      // if the user doesn't have transactions, which date is in this week, generate week and then push it to weeksArr, last index will be the index of that week
      const dates = generateWeek(date);
      weeksArr.push({ amountLeft: amount, dates });
      const foundWeek = weeksArr[weeksArr.length - 1];
      return cashOutHelper(foundWeek, amount, percent);
    }
  }
};

// helper function for cashing out and reducing the weekly limit
const cashOutHelper = (foundWeek, amount, percent) => {
  const fee = cashOut(
    amount - foundWeek.amountLeft < 0 ? 0 : amount - foundWeek.amountLeft,
    percent,
    "natural"
  );
  foundWeek.amountLeft =
    foundWeek.amountLeft - amount < 0 ? 0 : foundWeek.amountLeft - amount;
  return fee;
};

export default handleNaturalUserCashOut;
