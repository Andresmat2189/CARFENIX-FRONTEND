import { Injectable } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

export const AdminGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Verifica si el usuario está autenticado y es administrador
  if (authService.estaAutenticado() && authService.esAdmin()) {
    return true;
  } else {
    alert('Acceso restringido solo para administradores');
    router.navigate(['/login']); // Redirige al login en lugar del inicio
    return false;
  }
};
