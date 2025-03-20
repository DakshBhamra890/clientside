import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { TransactionService } from '../../services/transaction.service';
import { FormsModule } from '@angular/forms';

export class Transaction {
  _id: string | undefined;
  userId: string | undefined;
  category: string | undefined;
  amount: number | undefined;
  description: string | undefined;
};

@Component({
  selector: 'app-transaction',
  imports: [NgFor, FormsModule, NgIf],
  templateUrl: './transaction.component.html',
  styleUrl: './transaction.component.css'
})
export class TransactionComponent implements OnInit {
  constructor(private transactionService: TransactionService) {}

  TRANSACTIONS: any;
  _id: string | undefined;
  userId: string | undefined;
  category: string | undefined;
  amount: number | undefined;
  description: string | undefined;
  keyword: string | undefined;

  getTransactions(): void {
    this.transactionService.getTransactions(this.keyword).subscribe(response => {
      this.TRANSACTIONS = response;
    });
  }

  addTransaction(): void {
    let newTransaction = {
      userId: this.userId,
      category: this.category,
      amount: this.amount,
      description: this.description
    };

    this.transactionService.addTransaction(newTransaction).subscribe(response => {
      this.getTransactions();
      this.clearForm();
    });
  }

  clearForm(): void {
    this._id = undefined;
    this.userId = undefined;
    this.category = undefined;
    this.amount = undefined;
    this.description = undefined;
    this.keyword = undefined;
    this.getTransactions();
  }

  selectTransaction(transaction: Transaction): void {
    this._id = transaction._id;
    this.userId = transaction.userId;
    this.category = transaction.category;
    this.amount = transaction.amount;
    this.description = transaction.description;
  }

  deleteTransaction(_id: string): void {
    if (confirm('Delete this transaction?')) {
      this.transactionService.deleteTransaction(_id).subscribe(response => {
        this.getTransactions();
        this.clearForm();
      });
    }
  }

  updateTransaction(): void {
    let transaction = {
      _id: this._id,
      userId: this.userId,
      category: this.category,
      amount: this.amount,
      description: this.description
    };

    this.transactionService.updateTransaction(transaction).subscribe(response => {
      this.getTransactions();
      this.clearForm();
    });
  }

  search(): void {
    this.getTransactions();
  }

  ngOnInit(): void {
    this.getTransactions();
  }
}
