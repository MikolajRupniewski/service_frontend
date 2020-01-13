import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Options } from 'selenium-webdriver/chrome';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})
export class DataComponent implements OnInit {

  userToChange: User;
  isUpdateUserHidden = true;
  userUpdated = false;
  userNotUpdated = false;
  baseUrlGetUser = 'http://127.0.0.1:8080/authenticate/get-user-by-username';
  baseUrlUpdateUser = 'http://127.0.0.1:8080/users/';

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {

    const params: HttpParams = new HttpParams().set('username', localStorage.getItem('username'));
    this.httpClient.get(this.baseUrlGetUser, {
      params,
      observe: 'response'
    }).subscribe(
      (response) => {
        this.userToChange = response.body as User;
        console.log(this.userToChange);
        },
        (error) => {
          console.log(error.status);
          console.log(error.body);
        }
    );
  }

  toggleUpdateUserForm() {
    this.isUpdateUserHidden = !this.isUpdateUserHidden;
  }
  updateUserData(user: User) {
    console.log(user);
    let auth = localStorage.getItem('username');
    auth += ":" + localStorage.getItem('password');
    console.log(auth);
    const headers: HttpHeaders = new HttpHeaders().append('Authorization', 'Basic ' + btoa(auth));
    console.log(headers);
    this.httpClient.put(this.baseUrlUpdateUser + this.userToChange.id, user, {
      headers,
      observe: 'response'
    }).subscribe(
      (response) => {
        this.userToChange = response.body as User;
        console.log(this.userToChange);
      },
      (error) => {
        console.log(error);
      }
    );
  }

}
