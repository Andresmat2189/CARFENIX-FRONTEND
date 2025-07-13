import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav style="
  background: linear-gradient(to right, rgb(92, 191, 252), #4A90E2);
  color: white;
  padding: 1em;
  font-size: 1.2rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-weight: bold;
  text-transform: uppercase;
">
  <a routerLink="/" style="margin-right: 1em; color: white; text-decoration: none;">Catálogo</a>

  <a *ngIf="auth.esAdmin()" routerLink="/lista" style="margin-right: 1em; color: white; text-decoration: none;">Lista de Autos</a>

  <a *ngIf="auth.esAdmin()" routerLink="/agregar" style="margin-right: 1em; color: white; text-decoration: none;">Agregar Auto</a>

  <a *ngIf="!auth.estaAutenticado()" routerLink="/login" style="margin-right: 1em; color: white; text-decoration: none;">Iniciar Sesión</a>

  <a *ngIf="!auth.estaAutenticado()" routerLink="/registro" style="margin-right: 1em; color: white; text-decoration: none;">Registrarse</a>

  <button *ngIf="auth.estaAutenticado()" (click)="logout()" style="
    color: white;
    background: transparent;
    border: none;
    font-size: 1.1rem;
    font-family: inherit;
    font-weight: bold;
    cursor: pointer;
  ">
    CERRAR SESION
      </button>
    </nav>
  `
})
export class NavbarComponent {
  constructor(public auth: AuthService) {}

  logout() {
    this.auth.cerrarSesion();
    location.href = '/'; // Redirige y recarga
  }
}
