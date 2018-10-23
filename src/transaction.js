function getBalanceByCategoryInPeriod(transactions = [], category, start, end) {
  return transactions
    .filter(t => t.category === category && new Date(t.time) >= start && new Date(t.time) < end)
    .reduce((balance, t) => balance + t.amount, 0);
}

function findDuplicateTransactions(transactions = []) {
  const duplicates = [];
  const groupedTransactions = transactions.reduce((map, t) => {
    const k = t.sourceAccount + t.targetAccount + t.category + t.amount;
    const v = map.get(k) || [];
    const obj = { timestamp: new Date(t.time), transaction: t };
    v.push(obj);
    map.set(k, v);
    return map;
  }, new Map());

  groupedTransactions.forEach((possibleDuplicates) => {
    const actualDuplicates = [];
    const sortedTransactions = possibleDuplicates.sort((o1, o2) => {
      if (o1.timestamp > o2.timestamp) {
        return 1;
      }

      if (o1.timestamp < o2.timestamp) {
        return -1;
      }

      return 0;
    });

    sortedTransactions.forEach((o1, i) => {
      if (i === 0) {
        return;
      }
      const o0 = sortedTransactions[i - 1];

      if (o1.timestamp - o0.timestamp < 60e3) {
        if (actualDuplicates.length === 0) {
          actualDuplicates.push(o0.transaction);
        }

        actualDuplicates.push(o1.transaction);
      }
    });

    duplicates.push(actualDuplicates);
  });

  return duplicates;
}

module.exports = {
  getBalanceByCategoryInPeriod,
  findDuplicateTransactions,
};
