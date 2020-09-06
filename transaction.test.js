import { getBalanceByCategoryInPeriod, findDuplicateTransactions } from "./transaction.js";

test("getBalanceByCategoryInPeriod()", () => {
  test("returns 0 if there are no transactions", () => {
    expect(getBalanceByCategoryInPeriod([], "groceries", new Date("2018-03-01"), new Date("2018-03-31"))).toEqual(0);
  });

  test("should calculate balance for eating_out between 2018-03-12 & 2018-03-14", () => {
    expect(
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
      )).toEqual(-22.05);
  });
});

test("findDuplicateTransactions()", () => {
  test("returns empty array if there are no transactions", () => {
    expect(findDuplicateTransactions([])).toEqual([]);
  });

  test("should get the correct duplicate transactions", () => {
    expect(
      findDuplicateTransactions([
        {
          id: 3,
          sourceAccount: "A",
          targetAccount: "B",
          amount: -100,
          category: "eating_out",
          time: "2018-03-02T10:34:30.000Z",
        },
        {
          id: 1,
          sourceAccount: "A",
          targetAccount: "B",
          amount: -100,
          category: "eating_out",
          time: "2018-03-02T10:33:00.000Z",
        },
        {
          id: 6,
          sourceAccount: "A",
          targetAccount: "C",
          amount: -250,
          category: "other",
          time: "2018-03-02T10:33:05.000Z",
        },
        {
          id: 4,
          sourceAccount: "A",
          targetAccount: "B",
          amount: -100,
          category: "eating_out",
          time: "2018-03-02T10:36:00.000Z",
        },
        {
          id: 2,
          sourceAccount: "A",
          targetAccount: "B",
          amount: -100,
          category: "eating_out",
          time: "2018-03-02T10:33:50.000Z",
        },
        {
          id: 5,
          sourceAccount: "A",
          targetAccount: "C",
          amount: -250,
          category: "other",
          time: "2018-03-02T10:33:00.000Z",
        },
        {
          id: 51,
          sourceAccount: "A",
          targetAccount: "C",
          amount: -250,
          category: "shopping",
          time: "2018-03-04T10:32:01.001Z",
        },
        {
          id: 50,
          sourceAccount: "A",
          targetAccount: "C",
          amount: -250,
          category: "shopping",
          time: "2018-03-04T10:33:01.001Z",
        },
        {
          id: 100,
          sourceAccount: "D",
          targetAccount: "E",
          amount: -31.5,
          category: "books",
          time: "2017-03-04T10:32:01.001Z",
        },
        {
          id: 100,
          sourceAccount: "D",
          targetAccount: "E",
          amount: -31.5,
          category: "books",
          time: "2017-03-03T10:32:01.001Z",
        },

      ])
    ).toEqual(
      [
        [
          {
            id: 1,
            sourceAccount: "A",
            targetAccount: "B",
            amount: -100,
            category: "eating_out",
            time: "2018-03-02T10:33:00.000Z",
          },
          {
            id: 2,
            sourceAccount: "A",
            targetAccount: "B",
            amount: -100,
            category: "eating_out",
            time: "2018-03-02T10:33:50.000Z",
          },
          {
            id: 3,
            sourceAccount: "A",
            targetAccount: "B",
            amount: -100,
            category: "eating_out",
            time: "2018-03-02T10:34:30.000Z",
          },
        ],
        [
          {
            id: 5,
            sourceAccount: "A",
            targetAccount: "C",
            amount: -250,
            category: "other",
            time: "2018-03-02T10:33:00.000Z",
          },
          {
            id: 6,
            sourceAccount: "A",
            targetAccount: "C",
            amount: -250,
            category: "other",
            time: "2018-03-02T10:33:05.000Z",
          },
        ],
        [
          {
            id: 51,
            sourceAccount: "A",
            targetAccount: "C",
            amount: -250,
            category: "shopping",
            time: "2018-03-04T10:32:01.001Z",
          },
          {
            id: 50,
            sourceAccount: "A",
            targetAccount: "C",
            amount: -250,
            category: "shopping",
            time: "2018-03-04T10:33:01.001Z",
          },
        ],
      ]
    );
  });
});
