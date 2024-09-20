import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageUploadService {

  private apiUrl_2 = 'https://back-end-clinic-pets-production-4373.up.railway.app';

  constructor(private http: HttpClient){

  }

  uploadImage(imageFile: File): Observable<any> {
    const formData = new FormData();
    formData.append('image', imageFile);

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('userToken')}`
    });

    return this.http.post(` ${this.apiUrl_2}/filesUpload`, formData, { headers });
  }
}
