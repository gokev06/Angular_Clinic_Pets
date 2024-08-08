import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map, catchError, switchMap} from 'rxjs/operators';
import { of } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router)

  return authService.isAuthenticated().pipe(
    switchMap(isAuth => {
      if (isAuth) {
        return authService.verifyRole().pipe(
          map(role => {
            if (role === 'usuario'){
              return true;
            }else{
              console.log('User does not have the required role');
              return router.createUrlTree(['/unauthorized']);

            }
          }),
          catchError(() => {
            console.error('Error verifying role');
            return of(router.createUrlTree(['/login']));

          })
        );
      }else{
        return of(router.createUrlTree(['/login']));
      }
    }),
    catchError(() => {
      console.error('Error in the auth guard');
      return of(router.createUrlTree(['/login']));

    })
  );

};
