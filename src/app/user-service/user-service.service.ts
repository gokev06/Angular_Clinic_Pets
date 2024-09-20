import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { delay, finalize, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  private userSubject: BehaviorSubject<any>;
  public user: Observable<any>;
  private loadingSubject: BehaviorSubject<boolean>;
  public loading: Observable<boolean>;

  constructor(private http: HttpClient) {
    this.userSubject = new BehaviorSubject<any>(null);
    this.user = this.userSubject.asObservable();
    this.loadingSubject = new BehaviorSubject<boolean>(false);
    this.loading = this.loadingSubject.asObservable();
   }

   loadUserData(): Observable<any> {
    const token = localStorage.getItem('userToken');
    if (!token) {
      console.error('No se encontró el token');
      return new Observable(observer => observer.error('No token found'));
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.loadingSubject.next(true);
    return this.http.get<any>('https://back-end-clinic-pets-production-4373.up.railway.app/callData', { headers }).pipe(
      delay(3000),
      map(response => {
        if (response.status === 'success' && response.data) {
          this.userSubject.next(response.data);
        }
        return response;
      }),
      finalize(() => {
        this.loadingSubject.next(false);
      })
    );
  }

  updateUserProfile(updateData: any): Observable<any> {
    const token = localStorage.getItem('userToken');
    if (!token) {
      console.error('No se encontró el token');
      return new Observable(observer => observer.error('No token found'));
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.loadingSubject.next(true);
    return this.http.put('https://back-end-clinic-pets-production-4373.up.railway.app/editar-perfil', updateData, { headers }).pipe(
      delay(4000),
      map(response => {
        this.loadUserData().subscribe();
        return response;
      }),
      finalize(() => {
        this.loadingSubject.next(false);
      })
    );
  }
}
