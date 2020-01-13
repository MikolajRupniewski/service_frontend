import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Options } from 'selenium-webdriver/chrome';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-user',
  templateUrl: './home-user.component.html',
  styleUrls: ['./home-user.component.css']
})
export class HomeUserComponent implements OnInit {

  constructor(private router: Router) {}

  ngOnInit(): void {
    if (localStorage.length < 2) {
      this.router.navigateByUrl('');
    }
  }


}

