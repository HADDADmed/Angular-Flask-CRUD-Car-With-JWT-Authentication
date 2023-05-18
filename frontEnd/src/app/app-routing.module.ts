import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalculatorComponent } from './calculator/calculator.component';
import { CarsComponent } from './cars/cars.component';
import { CarDialogComponent } from './car-dialog/car-dialog.component';
import { CarEditDialogComponent } from './car-edit-dialog/car-edit-dialog.component';

const routes: Routes = [
// url avec la componenent
{
  path:"addcar" , component:CarDialogComponent} ,
  {path:"lisofcars" , component:CarsComponent} ,
  {path:"calculator" , component:CalculatorComponent} ,
  {path:"editcar/:id_car" , component:CarEditDialogComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
