import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    let income = 0;
    let outcome = 0;

    this.transactions.map(item => {
      if (item.type === 'income') {
        income += item.value;
      } else if (item.type === 'outcome') {
        outcome += item.value;
      }
    });

    const total = income - outcome;

    const balance: Balance = { income, outcome, total };

    return balance;
  }

  public create(data: Transaction): Transaction {
    this.transactions.push(data);

    return data;
  }
}

export default TransactionsRepository;
