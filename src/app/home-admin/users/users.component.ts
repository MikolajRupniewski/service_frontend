import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: User[];
  baseUrlGetUsers = 'http://127.0.0.1:8080/users/';
  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
    let auth = localStorage.getItem('username');
    auth += ":" + localStorage.getItem('password');
    console.log(auth);
    const headers: HttpHeaders = new HttpHeaders().append('Authorization', 'Basic ' + btoa(auth));
    this.httpClient.get(this.baseUrlGetUsers, {
      headers,
      observe: 'response'
    }).subscribe(
      (response) => {
        this.users = response.body as User[];
        console.log(this.users);
        },
        (error) => {
          console.log(error.status);
          console.log(error.body);
        }
    );
  }
  deleteUser(index: number) {
    console.log(this.users[index]);
    if (confirm('Are you sure to delete ' + this.users[index].username)) {
      // TODO
      console.log('Implement delete functionality here');
    }
  }
}
