import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalculatorComponent } from './calculator/calculator.component';
import { CarsComponent } from './cars/cars.component';
import { CarDialogComponent } from './car-dialog/car-dialog.component';
import { CarEditDialogComponent } from './car-edit-dialog/car-edit-dialog.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { HommePageComponent } from './homme-page/homme-page.component';

const routes: Routes = [
// url avec la componenent
  {path:"addcar" , component:CarDialogComponent} ,
  { path: 'homme-page', component: HommePageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
  {path:"lisofcars" , component:CarsComponent} ,
  {path:"calculator" , component:CalculatorComponent} ,
  {path:"editcar/:id_car" , component:CarEditDialogComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
