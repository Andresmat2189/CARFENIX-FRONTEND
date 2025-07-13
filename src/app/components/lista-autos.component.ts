import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutoService, Auto } from 'src/app/services/auto.service';
import { AuthService } from 'src/app/services/auth.service'; // ✅ Asegúrate de importar AuthService
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-lista-autos',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './lista-autos.component.html'
})
export class ListaAutosComponent implements OnInit {
  autos: Auto[] = [];
  esAdmin: boolean = false;

  constructor(
    private autoService: AutoService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.esAdmin = this.auth.esAdmin(); // ✅ Verifica si es administrador

    this.autoService.obtenerAutos().subscribe(data => {
      console.log("🚗 Autos cargados:", data);
      this.autos = data;
    });
  }

  eliminar(id: string | undefined): void {
  if (!id) return;

  if (confirm('¿Estás seguro de que deseas eliminar este auto?')) {
    this.autoService.eliminarAuto(id).subscribe({
      next: () => {
        this.autos = this.autos.filter(a => a._id !== id);
        alert('✅ Auto eliminado correctamente');
      },
      error: err => {
        console.error(err);
        alert('❌ No se pudo eliminar el auto');
      }
    });
    }
  }
}
