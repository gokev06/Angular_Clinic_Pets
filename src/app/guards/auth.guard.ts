import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map, catchError} from 'rxjs/operators';
import { of } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router)

  return authService.isAuthenticated().pipe(
    map(isAuth => {
      if (isAuth) {
         return true
      } else {
        return router.createUrlTree(['/login']);
      }
    }),
    catchError( () =>{
      console.error('Error in auth guard');
      return of(router.createUrlTree(['/login']));

    })
  );

};
