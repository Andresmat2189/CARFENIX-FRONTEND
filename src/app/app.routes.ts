import { Routes } from '@angular/router';
import { CarCatalogComponent } from './components/car-catalog/car-catalog.component';
import { AgregarAutoComponent } from './components/agregar-auto.component';
import { ListaAutosComponent } from './components/lista-autos.component';
import { LoginComponent } from './components/car-catalog/login.component';
import { RegistroComponent } from './components/car-catalog/registro.component';
import { AdminGuard } from './guards/admin.guard';
import { AutoDetalleComponent } from './components/auto-detalle/auto-detalle.component';

export const routes: Routes = [
  { path: '', redirectTo: 'catalogo', pathMatch: 'full' },
  { path: 'catalogo', component: CarCatalogComponent },
  { path: 'lista', component: ListaAutosComponent },
  { path: 'agregar', component: AgregarAutoComponent, canActivate: [AdminGuard] },
  // Editar auto con Lazy Loading
  {
    path: 'editar/:id',
    loadComponent: () =>
      import('./components/car-catalog/editar-auto.component').then(m => m.EditarAutoComponent),
    canActivate: [AdminGuard],
  },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  // Ruta para detalle de auto con Lazy Loading
  {
    path: 'detalle/:id',
    loadComponent: () =>
      import('./components/auto-detalle/auto-detalle.component').then(m => m.AutoDetalleComponent)
  },
  { path: 'autos/:id', component: AutoDetalleComponent },

  { path: '**', redirectTo: 'catalogo' }
];
