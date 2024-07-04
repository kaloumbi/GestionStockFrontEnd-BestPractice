import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserI } from '../../model/user-i';
import { AuthService } from '../../service/auth.service';
import { TokenService } from '../../service/token.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  //charger de linker le html avec le component ts
  loginForm: FormGroup = new FormGroup({});

  constructor(private builder: FormBuilder, private auth: AuthService, private tokenService: TokenService, private router: Router) {
  }

  ngOnInit() {
    this.loginForm = this.builder.group({
      login: ["", Validators.compose([Validators.required, Validators.email])],
      password: ["", Validators.required]
    });
  }

  login() {
  
    console.log(this.loginForm.value);
    this.auth.login(this.loginForm.value).subscribe((userResponse: UserI) => {
      console.log(userResponse);
      if (userResponse) {
        // alert("okk")
        //definir la cle de ton token et recuperer la valeur du token
        this.tokenService.saveToken("auth-token", userResponse.token as string);
        this.tokenService.saveToken("refresh", userResponse.refreshToken as string);
        console.log("pat",userResponse);
        this.router.navigateByUrl("/admin");
      }
    });

    
   
  }
}