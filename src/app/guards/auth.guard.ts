import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map, catchError, switchMap, retry} from 'rxjs/operators';
import { of } from 'rxjs';

const roleRoutes: string | any = {
  'usuario': ['/home', '/historial', '/citas', '/adopcion'],
  'administrador': ['/home-admin'],
  'veterinario': ['/home-vet', '/crear-historial']
}

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router)

  return authService.isAuthenticated().pipe(
    switchMap(isAuth => {
      if (isAuth) {
        return authService.verifyRole().pipe(
          map(role => {
            console.log('Current role:', role); // Para depuración
            console.log('Current URL:', state.url); // Para depuración
             // Verificar la ruta y el rol
            if (roleRoutes[role] && roleRoutes[role].some((allowedRoute: any) => state.url.startsWith(allowedRoute))) {
              return true;
            }

            console.log('User does not have the required role for this route');
            return router.createUrlTree(['/unauthorized']);


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
