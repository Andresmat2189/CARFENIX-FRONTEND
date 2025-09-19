import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Auto {
  _id: string;
  marca: string;
  modelo: string;
  descripcion: string;
  precio: number;
  imagenes: string[]; // <-- opcional, útil para galería en AutoDetalle
}

@Injectable({
  providedIn: 'root'
})
export class AutoService {
  private apiUrl = 'https://carfenix-backend.onrender.com/api/autos';
  private tokenKey = 'auth_token';

  constructor(private http: HttpClient) {}

  // Obtener token almacenado
  private obtenerToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  // Encabezados con token para rutas protegidas
  private obtenerHeadersAutenticados(): HttpHeaders {
    const token = this.obtenerToken();
    return new HttpHeaders({
      Authorization: token ? `Bearer ${token}` : ''
    });
  }

  // 🔐 Login
  login(email: string, password: string) {
    return this.http.post<{ token: string; rol: string }>(
      `${this.apiUrl}/login`,
      { email, password }
    );
  }

  // ✅ Obtener lista de autos
  obtenerAutos(): Observable<Auto[]> {
    return this.http.get<Auto[]>(this.apiUrl);
  }

  // ✅ Obtener auto por ID (el que faltaba)
  getAutoPorId(id: string): Observable<any> {
  return this.http.get(`${this.apiUrl}/${id}`);
}


  // ✅ Filtrar autos por marca
  filtrarPorMarca(marca: string): Observable<Auto[]> {
    return this.http.get<Auto[]>(`${this.apiUrl}?marca=${encodeURIComponent(marca)}`);
  }

  // ✅ Eliminar auto (requiere token)
  eliminarAuto(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, {
      headers: this.obtenerHeadersAutenticados()
    });
  }

  // ✅ Agregar auto (requiere token)
  // ✅ Versión correcta para enviar imágenes y token
agregarAuto(auto: any, imagenes: File[]): Observable<any> {
  const formData = new FormData();

  formData.append('marca', auto.marca);
  formData.append('modelo', auto.modelo);
  formData.append('descripcion', auto.descripcion || '');
  formData.append('precio', auto.precio.toString());

  imagenes.forEach((imagen, i) => {
    formData.append('imagenes', imagen);
  });

  const headers = this.obtenerHeadersAutenticados();

  return this.http.post(this.apiUrl + '/crear', formData, { headers });
  }
}
