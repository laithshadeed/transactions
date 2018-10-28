const MAX_MS_BETWEEN_DUPLICATE_TRANSACTION = 60e3; // In milliseconds

function groupSimilarTransactions(transactions) {
  return transactions.reduce((map, t) => {
    const k = t.sourceAccount + t.targetAccount + t.category + t.amount;
    const v = map.get(k) || [];
    const obj = { timestamp: new Date(t.time), transaction: t };
    v.push(obj);
    map.set(k, v);
    return map;
  }, new Map());
}

function sortTransactionsByTimestamp(a, b) {
  if (a.timestamp > b.timestamp) {
    return 1;
  }

  if (a.timestamp < b.timestamp) {
    return -1;
  }

  return 0;
}

function getDuplicateTransactions(transactions) {
  const duplicates = [];
  const firstTransaction = transactions.shift();
  transactions.reduce((a, b) => {
    if (b.timestamp - a.timestamp <= MAX_MS_BETWEEN_DUPLICATE_TRANSACTION) {
      if (duplicates.length === 0) {
        duplicates.push(a.transaction);
      }

      duplicates.push(b.transaction);
    }

    return b;
  }, firstTransaction);

  return duplicates;
}

function findDuplicateTransactions(transactions = []) {
  const duplicates = [];
  const similarTransactions = groupSimilarTransactions(transactions);
  similarTransactions.forEach((possibleDuplicates) => {
    const sortedTransactions = possibleDuplicates.sort(sortTransactionsByTimestamp);
    duplicates.push(getDuplicateTransactions(sortedTransactions));
  });

  return duplicates;
}

function getBalanceByCategoryInPeriod(transactions = [], category, start, end) {
  return transactions
    .filter(t => t.category === category && new Date(t.time) >= start && new Date(t.time) < end)
    .reduce((balance, t) => balance + t.amount, 0);
}

module.exports = {
  getBalanceByCategoryInPeriod,
  findDuplicateTransactions,
};
