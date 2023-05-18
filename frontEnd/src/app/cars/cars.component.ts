import { Component, Inject } from '@angular/core';
import { NgModel } from '@angular/forms';
import { CarModule } from '../car-dialog/car.module';
import { CarServiceService } from '../car-service.service';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { CarEditDialogComponent } from '../car-edit-dialog/car-edit-dialog.component';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent {

  id_car!:number ;
  model!:string ;

  hp!:number ;

  marque!:string ;
  cars!:CarModule[];


constructor(private myservice:CarServiceService,public dialog: MatDialog){
  this.myservice.getAllcars().subscribe(

      (data)=>{

        this.cars = data;
      }


  );
}
deleteMe(carId: number) {
  console.log("Delete car!");

  this.myservice.deleteCar(carId).subscribe();
}


  openDialog(id:number): void {
    const dialogRef = this.dialog.open(CarEditDialogComponent, {
          width:'27%',
          height:'80%',
          data:{id:id}
    });

    dialogRef.afterClosed().subscribe(result => {
       console.log('The dialog was closed');

    });
  }
}









