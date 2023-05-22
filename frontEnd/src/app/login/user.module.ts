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
export class UserModule {

  // les attributs

  public  email!: string;
  public password!:string ;




 }
