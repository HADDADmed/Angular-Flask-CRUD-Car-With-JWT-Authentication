import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthServiceService } from '../auth-service.service';
import { Router } from '@angular/router';
import { CarServiceService } from '../car-service.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  username = '';
  password = '';

  constructor(private router: Router, private carService: CarServiceService) {
    localStorage.setItem('jwt', '');
  }

  register() {
    let myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    let raw = JSON.stringify({
      username: this.username,
      password: this.password,
    });

    let requestOptions: RequestInit = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };
     console.log("arived to fetch !")
    fetch('http://localhost:5000/registration', requestOptions)
      .then((response) => response.json())
      .then((result) => {
        localStorage.setItem('jwt', result.data.jwt);
        window.location.href = '/lisofcars';
      })
      .catch((error) => console.log('error', error));
  }

  }

