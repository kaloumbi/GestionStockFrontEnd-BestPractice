import { UserI } from './../model/user-i';
import { Injectable } from '@angular/core';
import { UrlApi } from '../utils/constants';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private urlUser = UrlApi.urlApiArticleAdmin

  constructor(private http:HttpClient) { }

  getAllUser() {
    return this.http.get<UserI[]>(`${this.urlUser}`);
  }
}
