import { Component, OnInit } from '@angular/core';
import { AutoService, Auto } from 'src/app/services/auto.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CloudinaryModule } from '@cloudinary/ng'; // ✅ Importa el módulo Cloudinary
import { Cloudinary, CloudinaryImage } from '@cloudinary/url-gen';
import { lazyload, responsive, accessibility, placeholder } from '@cloudinary/ng';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';



interface AutoConImagen extends Auto {
  cldImg?: CloudinaryImage;
}

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule, CloudinaryModule], // ✅ Añade CloudinaryModule aquí
  schemas: [CUSTOM_ELEMENTS_SCHEMA] // ⚠️ Para reconocer <cl-transformation>
})
export class CatalogoComponent implements OnInit {
  
  cars: AutoConImagen[] = [];
  marcas: string[] = [];
  marcaSeleccionada = '';

  // Variables para Cloudinary
  cld = new Cloudinary({ cloud: { cloudName: 'djnycc8um' } });
  plugins = [lazyload(), responsive(), accessibility(), placeholder()];

  constructor(private autoService: AutoService) {}

  ngOnInit(): void {
    this.autoService.obtenerAutos().subscribe(data => {
      this.cars = data.map(auto => ({
        ...auto,
        cldImg: this.cld.image(auto.imagenes[0]) as CloudinaryImage // Crea instancia CloudinaryImage
      }));
      this.marcas = [...new Set(data.map(auto => auto.marca))];
    });
  }

  filtrarPorMarca(): void {
    const fn = this.marcaSeleccionada
      ? () => this.autoService.filtrarPorMarca(this.marcaSeleccionada)
      : () => this.autoService.obtenerAutos();

    fn().subscribe(data => {
      this.cars = data.map(auto => ({
        ...auto,
        cldImg: this.cld.image(auto.imagenes[0]) as CloudinaryImage
      }));
    });
  }
}
