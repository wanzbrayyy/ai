import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { map } from 'rxjs/operators';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // The guard should return true if the user is authenticated,
  // or a UrlTree to redirect to the login page otherwise.
  if (authService.isLoggedIn()) {
    return true;
  } else {
    // Redirect to the login page
    return router.createUrlTree(['/login']);
  }
};