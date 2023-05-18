import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CarModule } from './car-dialog/car.module';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarServiceService {
  getCarById(id_car: any) {
    console.log(this.url + '/car/' + id_car);
    return this.http.get(this.url + '/car/' + id_car, this.httpOptions);
 }
  // url principal
  url:string = "http://127.0.0.1:5000";

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http:HttpClient) { }


  saveCare(car:CarModule){

    console.log(this.url+"/savecar");

    console.log("car service" + car);

    return this.http.post(this.url+"/savecar" , car , this.httpOptions );

  }
  deleteCar(carId: number) {
    const url = `${this.url}/deletecar/${carId}`;
    return this.http.delete(url, this.httpOptions);
  }
  getAllcars():Observable<CarModule[]>{

     return  this.http.get<CarModule[]>(this.url+"/cars" ,this.httpOptions );



  }
  editCar( mycar:CarModule) {

    const url = `${this.url}/editcar/${mycar.id_car}`;
    return this.http.put(url,mycar,this.httpOptions);
  }





}
