import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <h2>Iniciar Sesión</h2>
    <form (ngSubmit)="login()">
      <label>Usuario:
        <input [(ngModel)]="username" name="username" required>
      </label><br>
      <label>Contraseña:
        <input [(ngModel)]="password" name="password" type="password" required>
      </label><br>
      <button type="submit">Ingresar</button>
    </form>
    <p *ngIf="error" style="color:red;">{{ error }}</p>
  `
})
export class LoginComponent {
  username = '';
  password = '';
  error = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  login() {
    this.authService.login(this.username, this.password).subscribe({
      next: (res) => {
        const { token, role } = res;
        this.authService.guardarSesion(token, role);

        if (role === 'admin') {
          this.router.navigate(['/agregar']);
        } else {
          this.router.navigate(['/']);
        }
      },
      error: () => {
        this.error = 'Credenciales incorrectas';
      }
    });
  }
}
