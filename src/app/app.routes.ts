import { Routes } from '@angular/router';
import { OopsiesComponent } from './oopsies/oopsies.component';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        loadComponent: () => import('./dash/dash.component').then(m => m.DashComponent)
    },
    {
        path: 'login',
        pathMatch: 'full',
        loadComponent: () => import('./login/login.component').then(m => m.LoginComponent)
    },
    {
        path: 'todo',
        pathMatch: 'full',
        loadComponent: () => import('./tools/todo/todo.component').then(m => m.TodoComponent)
    },
    {
        path: 'recipes',
        pathMatch: 'full',
        loadComponent: () => import('./tools/recipes/recipes.component').then(m => m.RecipesComponent)
    },
    {
        path: '*',
        component: OopsiesComponent,
        pathMatch: 'full'
    },
    {
        path: '**',
        component: OopsiesComponent,
        pathMatch: 'full'
    }
];
