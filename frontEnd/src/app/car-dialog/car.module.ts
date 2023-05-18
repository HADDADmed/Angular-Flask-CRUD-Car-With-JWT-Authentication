import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatDialogModule} from '@angular/material/dialog';




@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatDialogModule
  ]

})
export class CarModule {

  // les attributs

  public id_car!:number ;
  public model!:string ;
  public  hp!: number;
  public marque!:string ;




 }
