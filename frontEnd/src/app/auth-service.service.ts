import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserModule } from './login/user.module';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

    constructor(private http: HttpClient) {
    }

    login(email:string, password:string ) {

        return this.http.post<UserModule>('/api/login', {email, password}) ;
            // this is just the HTTP call,
            // we still need to handle the reception of the token

    }
}
