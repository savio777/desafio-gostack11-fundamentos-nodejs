import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute(data: Request): Transaction {
    const { title, value, type } = data;
    const newTransaction = new Transaction({ title, value, type });

    const balance = this.transactionsRepository.getBalance();

    if (type === 'outcome') {
      if (value > balance.total) {
        throw Error('there is no balance');
      }
    }

    const transaction = this.transactionsRepository.create(newTransaction);

    return transaction;
  }
}

export default CreateTransactionService;
