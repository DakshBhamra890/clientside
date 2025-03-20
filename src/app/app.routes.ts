import { Routes } from '@angular/router';
import { Transaction } from './components/transaction/transaction.component';
import { Category } from './components/category/category.component';

export const routes: Routes = [
    {path:"transactions", component: Transaction},
    {path:"categories", component: Category}
];
