import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';

 export interface adopcion{
  id?: number;
  nombre: string;
  edad: string;
  especie: string;
  raza: string;
  sexo: string;
  estirilizacion: string;
  vacunacion: string;
  telefono: string;
  municipio: string;
  ciudad: string;
  image:string;
}

export interface ApiResponse {
  status: string;
  message: string;
  Result: Adopciones[];
}

export interface Adopciones{
  IdAdopcionMascota: number;
  IdUsuario: string;
  ImagenMascota: string;
  nombreMascota: string;
  edadMascota: number;
  especieMascota: string;
  razaMascota: string;
  sexo: string;
  esterilizacionMascota: string;
  estadoVacunacionMascota: string;
  numeroTelefono: string;
  ubicacion: string;
  historia: string;
}

export interface AdopcionesVerify{
  IdAdopcionMascota: number;
  IdUsuario: string;
  imagenMascota: string;
  nombreMascota: string;
  edadMascota: number;
  especieMascota: string;
  razaMascota: string;
  sexo: string;
  esterilizacionMascota: string;
  estadoVacunacionMascota: string;
  numeroTelefono: string;
  ubicacion: string;
  historia: string;
}

export interface AdopcionesInfo{
  IdAdopcionMascota: number;
  IdUsuario: string;
  imagenMascota: string;
  nombreMascota: string;
  edadMascota: number;
  especieMascota: string;
  razaMascota: string;
  sexo: string;
  esterilizacionMascota: string;
  estadoVacunacionMascota: string;
  numeroTelefono: string;
  ubicacion: string;
  historia: string;
}

@Injectable({
  providedIn: 'root'
})
export class SolicitudAdopcionService {

  private apiurl = 'https://back-end-clinic-pets-production-4373.up.railway.app/adopciones';
  private apiUrl_1 = 'https://back-end-clinic-pets-production-4373.up.railway.app';
  private apiUrl_2 = 'https://back-end-clinic-pets-production-4373.up.railway.app';

  constructor( private http: HttpClient) { }

  deletePet(IdAdopcionMascota: string): Observable <any>{
    const token: string | null = localStorage.getItem(`userToken`);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.delete<any>(`${this.apiUrl_2}/deletePet/${IdAdopcionMascota}`, {headers}).pipe(
      catchError((error) => {
        console.error('Error en la eliminacion de la mascota', error);
        return throwError(() => new Error(error.message || 'Error desconocido'));
      })
    )
  }

  deletePetVerify(IdAdopcionMascota: string): Observable <any>{
    const token: string | null = localStorage.getItem(`userToken`);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.delete<any>(`${this.apiUrl_2}/deletePetVerify/${IdAdopcionMascota}`, {headers}).pipe(
      catchError((error) => {
        console.error('Error en la eliminacion de la mascota', error);
        return throwError(() => new Error(error.message || 'Error desconocido'));
      })
    )
  }

  updatePetVerify(IdAdopcionMascota: string): Observable <any>{
    const token: string | null = localStorage.getItem(`userToken`);
    console.log('token', token);

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.put<any>(`${this.apiUrl_2}/updatePetVerify/${IdAdopcionMascota}`, {headers}).pipe(
      catchError((error) => {
        console.error('Error en la actualizacion de la mascota', error);
        return throwError(() => new Error(error.message || 'Error desconocido'));
      })
    )
  }

  getPetIdInfo(IdAdopcionMascota: string): Observable <AdopcionesInfo[]>{
    const token: string | null = localStorage.getItem(`userToken`);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<any>(`${this.apiUrl_2}/uploadPetId/${IdAdopcionMascota}`, {headers}).pipe(
      map((Response) => Response.Result.map((item: any) => ({
        IdAdopcionMascota: item.IdAdopcionMascota,
        IdUsuario: item.IdUsuario,
        imagenMascota: item.imagenMascota,
        nombreMascota: item.nombreMascota,
        edadMascota: item.edadMascota,
        especieMascota: item.especieMascota,
        razaMascota: item.razaMascota,
        sexo: item.sexo,
        esterilizacionMascota: item.esterilizacionMascota,
        estadoVacunacionMascota: item.estadoVacunacionMascota,
        numeroTelefono: item.numeroTelefono,
        ubicacion: item.ubicacion,
        historia: item.historia
      })))
    )
  }

  getAdopciones(): Observable<adopcion[]> {
    return this.http.get<adopcion[]>(this.apiurl);
  }

  createPets(petsData: any, token?: string | null): Observable<any>{
    let headers = new HttpHeaders();
    if (token) {
       headers = headers.set('Authorization', `Bearer ${token}`);
    }
    headers = headers.set('Content-Type', 'application/json');

    return this.http.post(`${this.apiUrl_1}/addPetsUser`, petsData, {headers});
  }

  uploadImage(imageFile: File): Observable<any> {
    const formData = new FormData();
    formData.append('image', imageFile);

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('userToken')}`
    });

    return this.http.post(` ${this.apiUrl_2}/filesUpload`, formData, { headers });
  }

  getPetsData(): Observable <Adopciones[]> {
    const token: string | null = localStorage.getItem('userToken');
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return this.http.get <any>(`${this.apiUrl_1}/askPetsData`, {headers})
  }

  callPetsVerify(): Observable<AdopcionesVerify[]> {
    const token: string | null = localStorage.getItem('userToken');
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return this.http.get<any>(`${this.apiUrl_2}/callPetVerify`, { headers }).pipe(
      map(response => {
        // Asegúrate de que la respuesta sea un array
        if (Array.isArray(response)) {
          return response as AdopcionesVerify[];
        } else if (response && response.Result && Array.isArray(response.Result)) {
          return response.Result as AdopcionesVerify[];
        } else {
          console.error('La respuesta de la API no es un array:', response);
          return [];
        }
      })
    );
  }


}
