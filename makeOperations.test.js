import makeOperations from "./makeOperations.js";

const expectedHelper = async (filePath, expected) => {
  const data = await makeOperations(filePath);
  if (Array.isArray(expected)) {
    for (let i = 0; i < data.length; i++) {
      if (data[i] !== expected[i]) {
        return false;
      }
    }
  } else {
    if (data[0] !== expected) {
      return false;
    }
  }

  return true;
};
test("1.test if the code works for 1 user cash in, not exceeding max fee", async () => {
  const expected = "0.20";

  const result = await expectedHelper("./data/test1.json", expected);
  expect(result).toBe(true);
});

test("2.test if the code works for 1 user cash in, exceeding max fee", async () => {
  const expected = "5.00";
  const result = await expectedHelper("./data/test2.json", expected);
  expect(result).toBe(true);
});

test("3.test if the code works for 1 natural user multiple cash out, not exceeding the weekly limit", async () => {
  const expected = ["0.00", "0.00"];
  const result = await expectedHelper("./data/test3.json", expected);
  expect(result).toBe(true);
});

test("4.test if the code works for 1 natural user multiple cash out, exceeding the weekly limit", async () => {
  const expected = ["13.00", "17.00"];
  const result = await expectedHelper("./data/test4.json", expected);

  expect(result).toBe(true);
});
test("5.test if the code works for 1 legal user multiple cash out, lower than min fee", async () => {
  const expected = ["0.50", "0.50"];
  const result = await expectedHelper("./data/test5.json", expected);
  expect(result).toBe(true);
});
test("6.test if the code works for 1 legal user multiple cash out, greater than min fee", async () => {
  const expected = ["694.00", "170.00"];
  const result = await expectedHelper("./data/test6.json", expected);

  expect(result).toBe(true);
});
test("7.test if the code works for multiple cash in and outs ", async () => {
  const expected = [
    "0.06",
    "0.90",
    "87.00",
    "3.00",
    "0.30",
    "0.30",
    "5.00",
    "0.00",
    "0.00",
  ];
  const result = await expectedHelper("./data/input.json", expected);

  expect(result).toBe(true);
});
