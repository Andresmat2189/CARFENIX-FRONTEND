import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container mt-5">
      <h2 class="text-center mb-4">Registro de Usuario</h2>
      <form (ngSubmit)="registrar()" class="col-md-6 offset-md-3">
        <div class="mb-3">
          <label class="form-label">Nombre de usuario</label>
          <input type="text" class="form-control" [(ngModel)]="username" name="username" required>
        </div>
        <div class="mb-3">
          <label class="form-label">Contraseña</label>
          <input type="password" class="form-control" [(ngModel)]="password" name="password" required>
        </div>
        <button type="submit" class="btn btn-primary w-100">Registrarse</button>
      </form>
    </div>
  `
})
export class RegistroComponent {
  username = '';
  password = '';

  constructor(private http: HttpClient, private router: Router) {}

  registrar() {
    this.http.post('http://localhost:3000/api/registro', {
      username: this.username,
      password: this.password
    }).subscribe({
      next: () => {
        alert('✅ Usuario registrado con éxito');
        this.router.navigate(['/login']);
      },
      error: err => {
        console.error(err);
        alert('❌ Error al registrar: ' + (err.error?.mensaje || ''));
      }
    });
  }
}
