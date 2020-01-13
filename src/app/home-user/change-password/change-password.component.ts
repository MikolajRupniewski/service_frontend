import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { HttpClient, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  user: User;
  baseUrlGetUser = 'http://127.0.0.1:8080/authenticate/get-user-by-username';
  baseUrlUpdatePassword = 'http://127.0.0.1:8080/authenticate/update-password/';

  firstPassword: string;
  secondPassword: string;
  passwordNotMatch = false;
  passwordNotUpdated = false;
  passwordUpdated = false;

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
    const params: HttpParams = new HttpParams().set('username', localStorage.getItem('username'));
    this.httpClient.get(this.baseUrlGetUser, {
      params,
      observe: 'response'
    }).subscribe(
      (response) => {
        this.user = response.body as User;
        console.log(this.user);
        },
        (error) => {
          console.log(error.status);
          console.log(error.body);
        }
    );
  }
  onPasswordChanged(model: {current_password: string, secondPassword: string}) {
    console.log(model);
    if (localStorage.getItem('password') === model.current_password && this.passwordNotMatch === false) {
      const params: HttpParams = new HttpParams()
        .set('newPassword', model.secondPassword)
        .set('oldPassword', localStorage.getItem('password'));
      this.httpClient.put(this.baseUrlUpdatePassword + this.user.id, this.user, {
        params,
        observe: 'response'
      }).subscribe(
        (response) => {
          this.user = response.body as User;
          if (this.user === null) {
            this.passwordNotUpdated = true;
          } else {
            this.passwordUpdated = true;
          }
        }
      );
    } else {
      console.log('problem?');
    }
  }
  checkSame(secEmail: string) {
    this.secondPassword = secEmail;
    if (this.secondPassword === this.firstPassword) {
      this.passwordNotMatch = false;
    } else {
      this.passwordNotMatch = true;
    }
  }
}
