import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-agregar-auto',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container mt-4" *ngIf="esAdmin; else accesoDenegado">
      <h2 class="text-center mb-4">Agregar Nuevo Auto</h2>

      <form (ngSubmit)="agregarAuto()" enctype="multipart/form-data" class="row g-3">

        <!-- Marca -->
        <div class="col-md-6">
          <label class="form-label">Marca</label>
          <input type="text" class="form-control" [(ngModel)]="auto.marca" name="marca" required>
        </div>
        
        <!-- Modelo -->
        <div class="col-md-6">
          <label class="form-label">Modelo</label>
          <input type="text" class="form-control" [(ngModel)]="auto.modelo" name="modelo" required>
        </div>

        <!-- Descripción -->
        <div class="col-12">
          <label class="form-label">Descripción</label>
          <input type="text" class="form-control" [(ngModel)]="auto.descripcion" name="descripcion">
        </div>

        <!-- Precio -->
        <div class="col-md-6">
          <label class="form-label">Precio</label>
          <input type="number" class="form-control" [(ngModel)]="auto.precio" name="precio" required>
        </div>

        <!-- Imágenes -->
        <div class="col-md-6">
          <label class="form-label">Imágenes</label>
          <input 
            type="file" 
            class="form-control" 
            name="imagenes" 
            (change)="onFileChange($event)" 
            multiple 
            accept="image/*"
          >
          <div class="mt-2" *ngIf="imagenPreview">
            <img [src]="imagenPreview" class="img-fluid" style="max-height: 200px;">
          </div>
        </div>

        <!-- Botón -->
        <div class="col-12 text-end">
          <button type="submit" class="btn btn-primary">Agregar Auto</button>
        </div>
      </form>
    </div>

    <!-- Acceso denegado -->
    <ng-template #accesoDenegado>
      <div class="container mt-5 text-center">
        <p class="text-danger fs-5">No tienes permisos para acceder a esta sección.</p>
      </div>
    </ng-template>
  `
})
export class AgregarAutoComponent implements OnInit {
  auto = {
    marca: '',
    modelo: '',
    descripcion: '',
    precio: 0
  };

  imagenes: File[] = [];
  imagenPreview: string | null = null;
  esAdmin = false;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.esAdmin = this.authService.esAdmin();
    console.log('🔐 ¿Es admin?:', this.esAdmin);
    console.log('🪪 Token obtenido:', this.authService.obtenerToken());
  
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.imagenes = Array.from(input.files);

      // Vista previa de la primera imagen
      const reader = new FileReader();
      reader.onload = () => {
        this.imagenPreview = reader.result as string;
      };
      reader.readAsDataURL(this.imagenes[0]);
    }
  }

  agregarAuto(): void {
    if (!this.esAdmin) {
      alert('Acceso denegado.');
      return;
    }

    const formData = new FormData();
    formData.append('marca', this.auto.marca);
    formData.append('modelo', this.auto.modelo);
    formData.append('descripcion', this.auto.descripcion);
    formData.append('precio', this.auto.precio.toString());

    this.imagenes.forEach((img, i) => formData.append(`imagenes`, img));


    for (const [key, value] of formData.entries()) {
    console.log('🔍', key, value);
    }

    const token = this.authService.obtenerToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
      // 👈 Importante: NO incluir 'Content-Type' con multipart
    });

    console.log('📤 Enviando token:', token);
    console.log('📤 FormData:', formData);


    this.http.post('http://localhost:3000/api/autos', formData, { headers }).subscribe({
      next: (res) => {
        alert('✅ Auto agregado correctamente');
        // Limpiar formulario
        this.auto = { marca: '', modelo: '', descripcion: '', precio: 0 };
        this.imagenes = [];
        this.imagenPreview = null;
      },
      error: (err) => {
        console.error('❌ Error al agregar auto:', err);
        alert('❌ Error al agregar auto');
      }
    });
  }
}
