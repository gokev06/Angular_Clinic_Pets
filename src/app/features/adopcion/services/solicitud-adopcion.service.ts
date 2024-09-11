import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';

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

  private apiurl = 'http://localhost:8000/adopciones';
  private apiUrl_1 = 'http://localhost:10101';
  private apiUrl_2 = 'http://localhost:10101';

  constructor( private http: HttpClient) { }

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


}
