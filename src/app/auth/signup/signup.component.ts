import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { UserI } from '../../model/user-i';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  //Form Group link avec le html
  signupForm: FormGroup = new FormGroup({});


  //CONSTRUCTEUR
  constructor(private fb: FormBuilder, private signupservice: AuthService, private router: Router) { }

  /*
  {
    "nom":"Gervais",
    "login":"gervais@gmail.com",
    "password":"gervais",
    "role":"ADMIN"
  }
  */

  //NGONINIT
  ngOnInit() {
    this.signupForm = this.fb.group({
      //value = nom, login, password, role
      nom: [""],
      login: [""],
      password: [""],
      role: [""],

    });
  }


  //FONCTION TO SIGNUP
  signup() {

    this.signupservice.signup(this.signupForm.value).subscribe((data: UserI) => {
      console.log(data);
      if (data) {
        this.router.navigateByUrl("/auth/login");
      }

    })
  }













  /* onSignup() {
    debugger;
    
    this.http.post("http://localhost:8080/auth/signup", this.signupObj).subscribe((data:any)=>{

      if (data.result) {
        alert("Inscription réuissie !!!");
        this.router.navigateByUrl("/login");

      } else {
        alert(data.message);
      }
    })
  }
}

export class Signup { 
  nom:string;
  login:string;
  password:string;
  role:string;

  constructor() {
    this.nom = "";
    this.login = "";
    this.password = "";
    this.role = "";
  } */
}
