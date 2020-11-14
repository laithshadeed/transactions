const { getBalanceByCategoryInPeriod, findDuplicateTransactions } = require("./transaction.js");
const { assert } = require("chai");

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
  it("should *not* include transactions at the end edge", () => {
    assert.equal(
      getBalanceByCategoryInPeriod(
        [
          {
            id: 123,
            sourceAccount: "my_account",
            targetAccount: "under_armour",
            amount: -120,
            category: "shopping",
            time: "2018-03-13T08:17:00Z",
          },
          {
            id: 121,
            sourceAccount: "my_account",
            targetAccount: "zara",
            amount: -18,
            category: "shopping",
            time: "2018-03-14T00:00:00.000Z",
          },
        ],
        "shopping",
        new Date("2018-03-13"),
        new Date("2018-03-14")
      ),
      -120
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
        {
          id: 100,
          sourceAccount: "D",
          targetAccount: "E",
          amount: 31.5,
          category: "books",
          time: "2017-03-04T10:32:01.001Z",
        },
        {
          id: 100,
          sourceAccount: "D",
          targetAccount: "E",
          amount: 31.5,
          category: "books",
          time: "2017-03-03T10:32:01.001Z",
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

  it("should consider amount of 10 or 10.0 the same", () => {
    assert.deepEqual(
      findDuplicateTransactions([
        {
          id: 3,
          sourceAccount: "A",
          targetAccount: "B",
          amount: 10.0,
          category: "food",
          time: "2018-03-02T10:33:05.000Z",
        },
        {
          id: 1,
          sourceAccount: "A",
          targetAccount: "B",
          amount: 10,
          category: "food",
          time: "2018-03-02T10:33:00.000Z",
        },
      ]),
      [
        [
          {
            id: 1,
            sourceAccount: "A",
            targetAccount: "B",
            amount: 10,
            category: "food",
            time: "2018-03-02T10:33:00.000Z",
          },

          {
            id: 3,
            sourceAccount: "A",
            targetAccount: "B",
            amount: 10.0,
            category: "food",
            time: "2018-03-02T10:33:05.000Z",
          },
        ],
      ]
    );
  });

  it("should disallow similar transactions if they have *more* than 1-min time difference", () => {
    assert.deepEqual(
      findDuplicateTransactions([
        {
          id: 3,
          sourceAccount: "A",
          targetAccount: "B",
          amount: 100,
          category: "eating_out",
          time: "2018-03-02T10:34:00.001Z",
        },
        {
          id: 1,
          sourceAccount: "A",
          targetAccount: "B",
          amount: 100,
          category: "eating_out",
          time: "2018-03-02T10:33:00.000Z",
        },
      ]),
      []
    );
  });

  it("returns list of list of the duplicated transactions sorted by date", () => {
    assert.deepEqual(
      findDuplicateTransactions([
        {
          id: 13,
          sourceAccount: "my_account",
          targetAccount: "coffee_shop",
          amount: -50,
          category: "eating_out",
          time: "2018-04-01T10:24:00.000Z",
        },
        {
          id: 14,
          sourceAccount: "my_account",
          targetAccount: "coffee_shop",
          amount: -50,
          category: "eating_out",
          time: "2018-04-01T10:24:40.000Z",
        },
        {
          id: 15,
          sourceAccount: "my_account",
          targetAccount: "coffee_shop",
          amount: -50,
          category: "eating_out",
          time: "2018-04-01T10:25:10.000Z",
        },
        {
          id: 6,
          sourceAccount: "my_account",
          targetAccount: "internet_shop",
          amount: -250,
          category: "other",
          time: "2018-03-01T22:16:40.000Z",
        },
        {
          id: 102,
          sourceAccount: "my_account",
          targetAccount: "internet_shop",
          amount: -250,
          category: "other",
          time: "2018-03-01T22:16:50.000Z",
        },
        {
          id: 30,
          sourceAccount: "my_account",
          targetAccount: "coffee_shop",
          amount: -90,
          category: "eating_out",
          time: "2018-05-07T09:54:21.000Z",
        },
        {
          id: 31,
          sourceAccount: "my_account",
          targetAccount: "coffee_shop",
          amount: -90,
          category: "eating_out",
          time: "2018-05-07T09:55:10.000Z",
        },
        {
          id: 32,
          sourceAccount: "my_account",
          targetAccount: "coffee_shop",
          amount: -90,
          category: "eating_out",
          time: "2018-05-07T09:56:09.000Z",
        },
        {
          id: 33,
          sourceAccount: "my_account",
          targetAccount: "coffee_shop",
          amount: -90,
          category: "eating_out",
          time: "2018-05-07T09:57:05.000Z",
        },
      ]),
      [
        [
          {
            id: 6,
            sourceAccount: "my_account",
            targetAccount: "internet_shop",
            amount: -250,
            category: "other",
            time: "2018-03-01T22:16:40.000Z",
          },
          {
            id: 102,
            sourceAccount: "my_account",
            targetAccount: "internet_shop",
            amount: -250,
            category: "other",
            time: "2018-03-01T22:16:50.000Z",
          },
        ],
        [
          {
            id: 13,
            sourceAccount: "my_account",
            targetAccount: "coffee_shop",
            amount: -50,
            category: "eating_out",
            time: "2018-04-01T10:24:00.000Z",
          },
          {
            id: 14,
            sourceAccount: "my_account",
            targetAccount: "coffee_shop",
            amount: -50,
            category: "eating_out",
            time: "2018-04-01T10:24:40.000Z",
          },
          {
            id: 15,
            sourceAccount: "my_account",
            targetAccount: "coffee_shop",
            amount: -50,
            category: "eating_out",
            time: "2018-04-01T10:25:10.000Z",
          },
        ],
        [
          {
            id: 30,
            sourceAccount: "my_account",
            targetAccount: "coffee_shop",
            amount: -90,
            category: "eating_out",
            time: "2018-05-07T09:54:21.000Z",
          },
          {
            id: 31,
            sourceAccount: "my_account",
            targetAccount: "coffee_shop",
            amount: -90,
            category: "eating_out",
            time: "2018-05-07T09:55:10.000Z",
          },
          {
            id: 32,
            sourceAccount: "my_account",
            targetAccount: "coffee_shop",
            amount: -90,
            category: "eating_out",
            time: "2018-05-07T09:56:09.000Z",
          },
          {
            id: 33,
            sourceAccount: "my_account",
            targetAccount: "coffee_shop",
            amount: -90,
            category: "eating_out",
            time: "2018-05-07T09:57:05.000Z",
          },
        ],
      ]
    );
  });
});
