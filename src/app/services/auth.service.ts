import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly TOKEN_KEY = 'userToken';

  constructor() { }

  isAuthenticated(): Observable<boolean> {
    return this.getToken().pipe(
      map((token : string ) => !!token && token.length > 0),
      catchError(error => {
        console.error('Error checking authentication status:', error);
        return of(false);
      })
    );
  }

  getToken(): Observable < string | null | any > {
    try {
      const token = localStorage.getItem(this.TOKEN_KEY)
      return of(token)
    } catch (error) {
      console.error('Error retrieving token from localStorage:', error);
      return throwError(() => new Error('Failed to retrieve token'))
    }
  }

  setToken(token: string): Observable <void>{
    return new Observable(observer => {
      try {
        localStorage.setItem(this.TOKEN_KEY, token)
        observer.next();
        observer.complete();
      } catch (error) {
         console.error('Error setting token in localStorage', error);
         observer.error(new Error('Failed to set token'));
      }
    });
  }

  clearToken(): Observable <void>{
     return new Observable(observer => {
      try {
        localStorage.removeItem(this.TOKEN_KEY);
        observer.next();
        observer.complete();

      } catch (error) {
        console.error('Error clearing token from localStorage', error);
        observer.error(new Error('Failed to clear token'));
      }
     });
  }

}
