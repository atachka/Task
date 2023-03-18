// This file contains logic for rounding numbers
const roundUp = (num) => {
  if (num === 0) {
    return (0).toFixed(2);
  }
  const exponent = calcPrecision(num);
  const precision = Math.pow(10, exponent);

  return (Math.ceil(num * precision) / precision).toFixed(2);
};

const calcPrecision = (num) => {
  const string = num.toString().replace(".", "");

  if (string[0] !== "0") {
    return 0;
  }
  for (let i = 1; i < string.length; i++) {
    if (string[i] !== "0") {
      if (i + 1 === string.length) {
        return i + 1;
      } else {
        return i;
      }
    }
  }
};

export default roundUp;
