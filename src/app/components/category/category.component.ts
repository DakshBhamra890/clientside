import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

export class Category {
  _id?: string;
  name?: string;
  description?: string;
}

@Component({
  selector: 'app-category',
  imports: [NgFor, FormsModule, NgIf],
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  constructor(private categoryService: CategoryService) { }

  CATEGORIES: Category[] = [];
  _id?: string;
  name?: string;
  description?: string;

  getCategories(): void {
    this.categoryService.getCategories().subscribe(response => {
      this.CATEGORIES = response as Category[];
    });
  }

  addCategory(): void {
    let newCategory = {
      name: this.name,
      description: this.description
    };

    this.categoryService.addCategory(newCategory).subscribe(() => {
      this.getCategories();
      this.clearForm();
    });
  }

  clearForm(): void {
    this._id = undefined;
    this.name = undefined;
    this.description = undefined;
  }

  selectCategory(category: Category): void {
    this._id = category._id;
    this.name = category.name;
    this.description = category.description;
  }

  deleteCategory(_id: string): void {
    if (confirm('Are you sure you want to delete this category?')) {
      this.categoryService.deleteCategory(_id).subscribe(() => {
        this.getCategories();
        this.clearForm();
      });
    }
  }

  updateCategory(): void {
    let category = {
      _id: this._id,
      name: this.name,
      description: this.description
    };

    this.categoryService.updateCategory(category).subscribe(() => {
      this.getCategories();
      this.clearForm();
    });
  }

  ngOnInit(): void {
    this.getCategories();
  }
}
