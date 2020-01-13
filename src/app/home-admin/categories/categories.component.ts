import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  baseUrlGetCategories = 'http://127.0.0.1:8080/category/';
  categories: Category[];
  constructor(private httpClient: HttpClient) { }

  ngOnInit() {

    this.getCategories();
  }
  deleteCategory(index: number) {
    console.log(this.categories[index]);
    if (confirm('Are you sure to delete ' + this.categories[index].name)) {
      // TODO
      console.log('Implement delete functionality here');
    }
  }
  addCategory(postForm: {name: string}) {
    this.httpClient.post(this.baseUrlGetCategories+"add/", postForm, {
      observe: 'response'
    }).subscribe(
      (response) => {
        this.ngOnInit();
      },
      (error) => {
        console.log(error);
      }
    );
    this.getCategories();
  }
  getCategories() {
    this.httpClient.get(this.baseUrlGetCategories, {
      observe: 'response'
    }).subscribe(
      (response) => {
        this.categories = response.body as Category[];
        console.log(this.categories);
        },
        (error) => {
          console.log(error.status);
          console.log(error.body);
        }
    );
  }
}
