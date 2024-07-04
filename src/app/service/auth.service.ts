import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { UserI } from '../model/user-i';
import { TokenService } from './token.service';
import { Observable, map } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

interface Auth
{
  loging: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  //definir l'url du postman
  private AUTH_URL = "http://localhost:8080/auth";

  //pour les verbes postman : post, put, get, delete, pat
  constructor(private http: HttpClient, private tokenService: TokenService) { }

 
  // credentials = {email: "email@example.com", password: "password"}
  login(credentials: Auth): Observable<any>{

    return this.http.post<UserI>(`${this.AUTH_URL}/signin`, credentials).pipe(
      map((response: any) => {
        //console.log("response", response);
        const decode = jwtDecode(response.token);
        //console.log('decode', decode);
        localStorage.setItem("currentUser", JSON.stringify(decode));
        return response;
        

        
      }))
  }

  // credentials = {nom:"Alphonse", email: "email@example.com", password: "password"}
  signup(user: object) {
    return this.http.post<UserI>(`${this.AUTH_URL}/signup`, user);
  }
  
}
