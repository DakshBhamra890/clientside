import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  serverUrl: string = environment.serveUrl;
  constructor(private http: HttpClient) { }

  getTransactions(category: string | undefined) {
    if (category) {
      return this.http.get(`${this.serverUrl}/transactions?category=${category}`);
    } else {
      return this.http.get(`${this.serverUrl}/transactions`);
    }
  }
  getTransaction(_id: string) {
    return this.http.get(`${this.serverUrl}/transactions/${_id}`);
  }
  addTransaction(transaction: any) {
    return this.http.post(`${this.serverUrl}/transactions`, transaction);
  }
  updateTransaction(transaction: any) {
    return this.http.put(`${this.serverUrl}/transactions/${transaction._id}`, transaction);
  }
  deleteTransaction(_id: string) {
    return this.http.delete(`${this.serverUrl}/transactions/${_id}`);
  }

}
