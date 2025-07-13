import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarService, Car } from 'src/app/services/car.service';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-car-catalog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  styleUrls: ['./car-catalog.component.scss'],
  templateUrl: './car-catalog.component.html'
})
export class CarCatalogComponent implements OnInit {
  private carService = inject(CarService);

  autos: Car[] = [];

  ngOnInit(): void {
    this.carService.getCars().subscribe(data => {
      this.autos = data;
    });
  }
}
