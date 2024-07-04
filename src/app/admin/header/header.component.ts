import { UserI } from './../../model/user-i';
import { Component, OnInit } from '@angular/core';
import { TokenService } from '../../service/token.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{

  userInfos: any;

   searchTerms= new Subject<string>()
  constructor(private tokserv: TokenService) { }
  ngOnInit() { 

    // this.userInfos = this.tokserv.getUsers();
    this.userInfos = JSON.parse(localStorage.getItem("currentUser") || "");
    
  }
  
  
    deconnexion() {
    this.tokserv.removeToken("auth-token","refresh")
  }

}
