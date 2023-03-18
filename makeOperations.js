import cashIn from "./cashIn.js";
import handleNaturalUserCashOut from "./handleNaturalUserCashOut.js";
import handleLegalUserCashOut from "./handleLegalUserCashOut.js";
import fs from "fs";

const makeOperations = async (path) => {
  const rawdata = fs.readFileSync(path);
  const transactions = JSON.parse(rawdata);
  const feeArray = [];
  // This is an object to identify if natural person exceeded the weekly limit in one week
  const weekById = [];

  // check if transactions  an array of operations
  if (transactions.length) {
    for (let i = 0; i < transactions.length; i++) {
      feeArray.push(await transactionTypeHelper(transactions[i], weekById));
    }
  }
  // if it's just one transaction
  else {
    feeArray.push(await transactionTypeHelper(transactions, weekById));
  }
  return feeArray;
};

const transactionTypeHelper = async (transaction, weekById) => {
  if (transaction.type === "cash_in") {
    return await cashIn(transaction.operation.amount);
  } else if (transaction.user_type === "natural") {
    return await handleNaturalUserCashOut(transaction, weekById);
  } else {
    return await handleLegalUserCashOut(transaction);
  }
};

export default makeOperations;
