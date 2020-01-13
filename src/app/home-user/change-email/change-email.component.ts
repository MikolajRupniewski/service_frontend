import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { HttpClient, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-change-email',
  templateUrl: './change-email.component.html',
  styleUrls: ['./change-email.component.css']
})

export class ChangeEmailComponent implements OnInit {
  user: User;
  baseUrlGetUser = 'http://127.0.0.1:8080/authenticate/get-user-by-username';
  baseUrlUpdateEmail = 'http://127.0.0.1:8080/authenticate/update-email/';

  firstEmail: string;
  secondEmail: string;
  EmailNotMatch = false;
  EmailNotUpdated = false;
  EmailUpdated = false;
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
onEmailChanged(model: {current_email: string, secondEmail: string}) {
    console.log(model);
    if (this.user.email === model.current_email && this.EmailNotMatch === false) {
      const params: HttpParams = new HttpParams()
        .set('newEmail', model.secondEmail)
        .set('oldEmail', model.current_email);
      this.httpClient.put(this.baseUrlUpdateEmail + this.user.id, this.user, {
        params,
        observe: 'response'
      }).subscribe(
        (response) => {
          this.user = response.body as User;
          if (this.user === null) {
            this.EmailNotUpdated = true;
          } else {
            this.EmailUpdated = true;
          }
        }
      );
    } else {
      console.log('problem?');
    }
  }
  checkSame(secEmail: string) {
    this.secondEmail = secEmail;
    if (this.secondEmail === this.firstEmail) {
      this.EmailNotMatch = false;
    } else {
      this.EmailNotMatch = true;
    }
  }
}
