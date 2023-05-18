import { Component } from '@angular/core';
import { CarModule } from './car.module';
import { CarServiceService } from '../car-service.service';

@Component({
  selector: 'app-car-dialog',
  templateUrl: './car-dialog.component.html',
  styleUrls: ['./car-dialog.component.css']
})
export class CarDialogComponent {

  id_car!:number ;
  model!:string ;
  hp!:number ;
  marque!:string ;
  constructor(private carservice:CarServiceService){


  }


  //event bindding


  saveMe(){

    console.log("click!!!!1");

    let mycar = new CarModule() ;

    mycar.id_car = this.id_car ;
    mycar.hp = this.hp ;
    mycar.model = this.model ;
    mycar.marque = this.marque ;

    console.log(mycar);

    this.carservice.saveCare(mycar).subscribe();

  }
}
