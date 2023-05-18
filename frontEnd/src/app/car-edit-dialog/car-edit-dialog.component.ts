import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarServiceService } from '../car-service.service';
import { CarModule } from '../car-dialog/car.module';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-car-edit-dialog',
  templateUrl: './car-edit-dialog.component.html',
  styleUrls: ['./car-edit-dialog.component.css']
})
export class CarEditDialogComponent implements OnInit{
  cars!: CarModule[];
  id_car!: number;
  model!: string;
  hp!: number;
  marque!: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private route: ActivatedRoute, private theservice: CarServiceService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id_car =+params['id_car'];
    });

    this.theservice.getAllcars().subscribe(data => {
      this.cars = data;
    });
  }

  editCar() {

    let car = new CarModule();
    car.id_car = this.data.id;
    car.model = this.model;
    car.hp = this.hp;
    car.marque = this.marque;
    this.theservice.editCar(car).subscribe();
  }
}
