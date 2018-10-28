/* globals describe, it */
const { assert } = require("chai");
const {
  getBalanceByCategoryInPeriod,
  findDuplicateTransactions,
} = require("../src/transaction.js");

describe("getBalanceByCategoryInPeriod()", () => {
  it("returns 0 if there are no transactions", () => {
    assert.equal(
      getBalanceByCategoryInPeriod([], "groceries", new Date("2018-03-01"), new Date("2018-03-31")),
      0
    );
  });

  it("should calculate balance for eating_out between 2018-03-12 & 2018-03-14", () => {
    assert.equal(
      getBalanceByCategoryInPeriod(
        [
          {
            id: 123,
            sourceAccount: "my_account",
            targetAccount: "starbucks",
            amount: -4.05,
            category: "eating_out",
            time: "2018-03-12T08:17:00Z",
          },
          {
            id: 121,
            sourceAccount: "my_account",
            targetAccount: "anna_cafe",
            amount: -18,
            category: "eating_out",
            time: "2018-03-13T12:47:00Z",
          },
          {
            id: 100,
            sourceAccount: "my_account",
            targetAccount: "albert_heijn",
            amount: -32.01,
            category: "groceries",
            time: "2018-03-10T12:34:00Z",
          },
          {
            id: 205,
            sourceAccount: "my_account",
            targetAccount: "vapiano",
            amount: -14.5,
            category: "eating_out",
            time: "2018-03-14T19:56:00Z",
          },
          {
            id: 205,
            sourceAccount: "my_account",
            targetAccount: "wagamama",
            amount: -21.5,
            category: "eating_out",
            time: "2018-03-17T18:34:00Z",
          },
        ],
        "eating_out",
        new Date("2018-03-12"),
        new Date("2018-03-14")
      ),
      -22.05
    );
  });
});

describe("findDuplicateTransactions()", () => {
  it("returns empty array if there are no transactions", () => {
    assert.deepEqual(findDuplicateTransactions([]), []);
  });

  it("should get the correct duplicate transactions", () => {
    assert.deepEqual(
      findDuplicateTransactions([
        {
          id: 3,
          sourceAccount: "A",
          targetAccount: "B",
          amount: 100,
          category: "eating_out",
          time: "2018-03-02T10:34:30.000Z",
        },
        {
          id: 1,
          sourceAccount: "A",
          targetAccount: "B",
          amount: 100,
          category: "eating_out",
          time: "2018-03-02T10:33:00.000Z",
        },
        {
          id: 6,
          sourceAccount: "A",
          targetAccount: "C",
          amount: 250,
          category: "other",
          time: "2018-03-02T10:33:05.000Z",
        },
        {
          id: 4,
          sourceAccount: "A",
          targetAccount: "B",
          amount: 100,
          category: "eating_out",
          time: "2018-03-02T10:36:00.000Z",
        },
        {
          id: 2,
          sourceAccount: "A",
          targetAccount: "B",
          amount: 100,
          category: "eating_out",
          time: "2018-03-02T10:33:50.000Z",
        },
        {
          id: 5,
          sourceAccount: "A",
          targetAccount: "C",
          amount: 250,
          category: "other",
          time: "2018-03-02T10:33:00.000Z",
        },
        {
          id: 51,
          sourceAccount: "A",
          targetAccount: "C",
          amount: 250,
          category: "shopping",
          time: "2018-03-04T10:32:01.001Z",
        },
        {
          id: 50,
          sourceAccount: "A",
          targetAccount: "C",
          amount: 250,
          category: "shopping",
          time: "2018-03-04T10:33:01.001Z",
        },
      ]),
      [
        [
          {
            id: 1,
            sourceAccount: "A",
            targetAccount: "B",
            amount: 100,
            category: "eating_out",
            time: "2018-03-02T10:33:00.000Z",
          },
          {
            id: 2,
            sourceAccount: "A",
            targetAccount: "B",
            amount: 100,
            category: "eating_out",
            time: "2018-03-02T10:33:50.000Z",
          },
          {
            id: 3,
            sourceAccount: "A",
            targetAccount: "B",
            amount: 100,
            category: "eating_out",
            time: "2018-03-02T10:34:30.000Z",
          },
        ],
        [
          {
            id: 5,
            sourceAccount: "A",
            targetAccount: "C",
            amount: 250,
            category: "other",
            time: "2018-03-02T10:33:00.000Z",
          },
          {
            id: 6,
            sourceAccount: "A",
            targetAccount: "C",
            amount: 250,
            category: "other",
            time: "2018-03-02T10:33:05.000Z",
          },
        ],
        [
          {
            id: 51,
            sourceAccount: "A",
            targetAccount: "C",
            amount: 250,
            category: "shopping",
            time: "2018-03-04T10:32:01.001Z",
          },
          {
            id: 50,
            sourceAccount: "A",
            targetAccount: "C",
            amount: 250,
            category: "shopping",
            time: "2018-03-04T10:33:01.001Z",
          },
        ],
      ]
    );
  });
});
