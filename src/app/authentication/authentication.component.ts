import { Component, NgZone, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { User } from '../models/user.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {

  accountCreated = false;
  accountNotCreated = false;
  wrongPassword = false;
  emailNotConfirmed = false;
  isRestoreHidden = true;
  newPasswordSend = false;
  newPasswordNotSend = false;
  baseUrlSignUp = 'http://127.0.0.1:8080/authenticate/register';
  baseUrlSignIn = 'http://127.0.0.1:8080/authenticate/sign-in';
  baseUrlRestorePassword = 'http://127.0.0.1:8080/authenticate/reset-password';


  constructor(private httpClient: HttpClient, private router: Router){}

  ngOnInit() {
    this.resetStatuses();
  }
  resetStatuses() {
    this.accountCreated = false;
    this.accountNotCreated = false;
    this.wrongPassword = false;
    this.emailNotConfirmed = false;
    this.newPasswordNotSend = false;
    this.newPasswordSend = false;
  }
  onCreateUser(userData: User) {
    this.resetStatuses();
    userData.city = '';
    userData.apartmentNumber = '';
    userData.enabled = false;
    userData.firstName = '';
    userData.houseNumber = '';
    userData.lastName = '';
    userData.phoneNumber = '';
    userData.streetName = '';
    userData.zipCode = '';
    return this.httpClient.post(this.baseUrlSignUp, userData, {observe: 'response'})
    .subscribe(
      (response) => {
          if (response.status === 201) {

            this.accountCreated = true;
          }
        },
        (error) => {
          console.log(error);
          this.accountNotCreated = true;
        }
    );
  }

  onSignIn(userData: {username: string, password: string}) {
    this.resetStatuses();
    const params: HttpParams = new HttpParams().set('username', userData.username).set('password', userData.password);
    return this.httpClient.get(this.baseUrlSignIn, {
      params,
      observe: 'response'
    }).subscribe(
      (response) => {
          localStorage.setItem('username', userData.username);
          localStorage.setItem('password', userData.password);
          if (response.status === 200) {
            console.log(response);
            this.router.navigateByUrl('/home-user');

          } else {
            console.log(response);
            this.router.navigateByUrl('home-admin');
          }
        },
        (error) => {
          console.log('reposne: ' + error.status);
          console.log(error);
          if (error.status === 400) {
            this.wrongPassword = true;
          } else {
            this.emailNotConfirmed = true;
          }

        }
    );
  }
  restorePassword() {
    this.isRestoreHidden = !this.isRestoreHidden;
  }

  onPasswordReset(userData: {email: string}) {
    this.resetStatuses();
    const params: HttpParams = new HttpParams().set('email', userData.email);
    return this.httpClient.get(this.baseUrlRestorePassword, {
      params,
      observe: 'response'
    }).subscribe(

      (response) => {
          console.log(response.status);
          if (response.status === 200) {
            console.log(response);
            this.newPasswordSend = true;
          }
        },
        (error) => {
          console.log(error);
          this.newPasswordNotSend = true;
        }
    );
  }
}
