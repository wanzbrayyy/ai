import { Routes } from '@angular/router';
import { authGuard } from './auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home-page/home-page.component').then(m => m.HomePageComponent),
    title: 'AI Wanzofc - Home'
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login-page/login-page.component').then(m => m.LoginPageComponent),
    title: 'AI Wanzofc - Login'
  },
  {
    path: 'signup',
    loadComponent: () => import('./pages/signup-page/signup-page.component').then(m => m.SignupPageComponent),
    title: 'AI Wanzofc - Sign Up'
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./pages/dashboard-page/dashboard-page.component').then(m => m.DashboardPageComponent),
    title: 'AI Wanzofc - Dashboard',
    canActivate: [authGuard]
  },
  {
    path: 'docs',
    loadComponent: () => import('./pages/docs-page/docs-page.component').then(m => m.DocsPageComponent),
    title: 'AI Wanzofc - API Docs'
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];