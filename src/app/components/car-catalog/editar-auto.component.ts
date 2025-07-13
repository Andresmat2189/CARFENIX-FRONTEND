import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-editar-auto',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container mt-5" *ngIf="auto">
      <h2>Editar Auto</h2>
      <form (ngSubmit)="guardarCambios()">
        <input [(ngModel)]="auto.marca" name="marca" required class="form-control mb-2" placeholder="Marca">
        <input [(ngModel)]="auto.modelo" name="modelo" required class="form-control mb-2" placeholder="Modelo">
        <textarea [(ngModel)]="auto.descripcion" name="descripcion" required class="form-control mb-2" placeholder="Descripción"></textarea>
        <input [(ngModel)]="auto.precio" name="precio" required type="number" class="form-control mb-2" placeholder="Precio">
        <button class="btn btn-success w-100">Guardar Cambios</button>
      </form>
    </div>
  `
})
export class EditarAutoComponent implements OnInit {
  auto: any;
  id: string = '';

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const idFromRoute = this.route.snapshot.paramMap.get('id');
    if (idFromRoute) {
      this.id = idFromRoute;
      this.http.get(`http://localhost:3000/api/autos/${this.id}`).subscribe((data) => {
        this.auto = data;
      });
    } else {
      alert('❌ ID no encontrado en la URL');
      this.router.navigate(['/lista']);
    }
  }

  guardarCambios() {
    if (!this.id) return;

    this.http.put(`http://localhost:3000/api/autos/${this.id}`, this.auto).subscribe(() => {
      alert('✅ Auto actualizado');
      this.router.navigate(['/lista']);
    });
  }
}
