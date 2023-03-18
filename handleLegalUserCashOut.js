import cashOut from "./cashOut.js";
import axios from "axios";

// This file contains logic for legal user cashing out
const handleLegalUserCashOut = async (transaction) => {
  const {
    userType,
    operation: { amount },
  } = transaction;
  const {
    percents: percent,
    min: { amount: minAmount, currency },
  } = await axios
    .get("https://developers.paysera.com/tasks/api/cash-out-juridical")
    .then((response) => response.data);
  if (currency !== "EUR") {
    return "Can only work on euros";
  }
  return cashOut(amount, percent, userType, minAmount);
};

export default handleLegalUserCashOut;
