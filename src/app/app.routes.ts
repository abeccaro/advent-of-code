import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'problems',
        loadComponent: () => import('./problem-list/problem-list.component').then(mod => mod.ProblemListComponent),
    },
    {
        path: 'problem/:problemYear/:problemDay',
        loadComponent: () => import('./problem/problem.component').then(mod => mod.ProblemComponent),
    },
    {
        path: '**',
        redirectTo: 'problems',
    },
];
