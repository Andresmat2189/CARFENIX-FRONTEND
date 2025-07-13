// src/app/services/auth.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly TOKEN_KEY = 'auth_token';
  private readonly ROLE_KEY = 'user_role';
  private readonly API_URL = 'http://localhost:3000/api'; // ✅ Ruta del backend

  constructor(private http: HttpClient) {}

  // 👉 Realiza la solicitud de login al backend
  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.API_URL}/login`, { username, password });
  }

  // 👉 Guarda el token y el rol en localStorage
  guardarSesion(token: string, rol: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
    localStorage.setItem(this.ROLE_KEY, rol);
  }

  // 👉 Obtiene el token almacenado
  obtenerToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  // 👉 Obtiene el rol almacenado
  obtenerRol(): string | null {
    return localStorage.getItem(this.ROLE_KEY);
  }

  // 👉 Verifica si hay sesión iniciada
  estaAutenticado(): boolean {
    return !!this.obtenerToken();
  }

  // 👉 Verifica si el usuario es administrador
  esAdmin(): boolean {
    return this.obtenerRol() === 'admin';
  }

  // 👉 Cierra la sesión eliminando los datos del localStorage
  cerrarSesion(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.ROLE_KEY);
  }
}
