// This file contains logic for cashing in

import axios from "axios";
import roundUp from "./roundUp.js";

const cashIn = async (amount) => {
  const {
    percents: percent,
    max: { amount: maxAmount },
  } = await axios
    .get("https://developers.paysera.com/tasks/api/cash-in")
    .then((response) => response.data);

  const fee =
    (percent * amount) / 100 > maxAmount ? 5 : (percent * amount) / 100;

  console.log(roundUp(fee));
  return roundUp(fee);
};

export default cashIn;
