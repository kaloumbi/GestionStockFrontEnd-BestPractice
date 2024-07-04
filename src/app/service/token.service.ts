import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import  {  jwtDecode  }  from  "jwt-decode" ; 

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private router:Router) {
    
  }

  //pour sauvegarder le token dans le local storage
  saveToken(key: string, token: string) {
    localStorage.setItem(key, token);
    const decodeJwt = jwtDecode(token);
    
    console.log("my decode :", decodeJwt);
    
  }

  //Pour recuperer le token 
  getToken(key: string) {
    return localStorage.getItem(key) || null;
  }

  //la suppression du token dans le local storage pour la deconnextion
  removeToken(key: string, key2:string) {
    localStorage.removeItem(key);
    localStorage.removeItem(key2);
    this.router.navigate(["/auth/login"]);
  }

  
  // Méthode pour vérifier si le token est expiré
  isTokenExpired(expiredToken: string) : boolean {
    const expiry = (JSON.parse(atob(expiredToken.split('.')[1]))).exp;
    return (Math.floor((new Date()).getTime() / 1000)) >= expiry;
  }
}
