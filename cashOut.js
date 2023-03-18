// This file contains logic for cashing out
import roundUp from "./roundUp.js";

const cashOut = (amount, percent, userType, minAmount) => {
  const fee = (percent * amount) / 100;
  let finalFee;
  if (userType === "natural") {
    finalFee = roundUp(fee);
    console.log(finalFee);
    return finalFee;
  } else {
    finalFee = roundUp(fee < minAmount ? minAmount : fee);
    console.log(finalFee);
    return finalFee;
  }
};

export default cashOut;
