import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';  // 📌 Import necesario
import { CommonModule } from '@angular/common';
import { AutoService } from 'src/app/services/auto.service';



@Component({
  selector: 'app-auto-detalle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './auto-detalle.component.html',
  styleUrls: ['./auto-detalle.component.scss']
})
export class AutoDetalleComponent implements OnInit {
  auto: any = null;
  imagenPrincipal: string = '';

  constructor(
    private route: ActivatedRoute,
    private autoService: AutoService,
     private location: Location  // 📌 Inyección
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.autoService.getAutoPorId(id).subscribe({
        next: (data) => {
          this.auto = data;
          this.imagenPrincipal = data.imagenes?.length > 0
            ? data.imagenes[0]
            : 'https://via.placeholder.com/600x400?text=Sin+imagen';
        },
        error: (err) => {
          console.error('Error al obtener detalles del auto:', err);
        }
      });
    }
  }

  cambiarImagenPrincipal(nuevaImagen: string): void {
    this.imagenPrincipal = nuevaImagen;
  }

  goBack(): void {
    this.location.back();  // 📌 Regresa a la página anterior
  }
}
