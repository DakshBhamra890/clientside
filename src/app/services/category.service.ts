import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor(private http: HttpClient) { }
  serverUrl: string = environment.serveUrl;
  getCategories() {
    return this.http.get(`${this.serverUrl}/categories`);
  }
  getCategory(id: string) {
    return this.http.get(`${this.serverUrl}/categories/${id}`);
  }
  addCategory(category: any) {
    return this.http.post(`${this.serverUrl}/categories`, category);
  }
  updateCategory(category: any) {
    return this.http.put(`${this.serverUrl}/categories/${category._id}`, category);
  }
  deleteCategory(id: string) {
    return this.http.delete(`${this.serverUrl}/categories/${id}`);
  }
}
