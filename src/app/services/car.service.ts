import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service'; // Importa tu servicio de autenticación

export interface Car {
  _id?: string;
  marca: string;
  modelo: string;
  descripcion: string;
  precio: number;
  imagenes: string[];
}

@Injectable({
  providedIn: 'root'
})
export class CarService {
  private baseUrl = 'https://carfenix-backend.onrender.com/api/autos';

  constructor(private http: HttpClient, private authService: AuthService) {}

  // ✅ Obtener autos públicos
  getCars(brand?: string): Observable<Car[]> {
    const url = brand ? `${this.baseUrl}?brand=${brand}` : this.baseUrl;
    return this.http.get<Car[]>(url);
  }

  // ✅ Agregar un auto (ruta protegida con JWT)
  agregarAuto(autoData: FormData): Observable<any> {
    const token = this.authService.obtenerToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}` // Enviar token en header
    });

    return this.http.post(this.baseUrl, autoData, { headers });
  }
}
