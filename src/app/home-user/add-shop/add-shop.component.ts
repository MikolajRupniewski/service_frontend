import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Shop } from 'src/app/models/shops.model';
import { Category } from 'src/app/models/category.model';
import { FormGroup, FormBuilder, Validators, FormArray, Form, FormControl } from '@angular/forms';
import { Service } from 'src/app/models/service.model';
import { User } from 'src/app/models/user.model';
import { GeoLocation } from 'src/app/models/geolocation.model';
import { ServicePlace } from 'src/app/models/serviceplace';
import { Day } from 'src/app/models/day.model';
import { Employee } from 'src/app/models/employee.model';

@Component({
  selector: 'app-add-shop',
  templateUrl: './add-shop.component.html',
  styleUrls: ['./add-shop.component.css']
})
export class AddShopComponent implements OnInit {
  baseUrlGetCategories = 'http://127.0.0.1:8080/category/';
  baseUrlAddNewShop = 'http://127.0.0.1:8080/shops/';
  baseUrlGetUser = 'http://127.0.0.1:8080/authenticate/get-user-by-username';
  baseUrlGetShop = 'http://127.0.0.1:8080/shops/findByUserId/';
  servicePlace = ServicePlace;
  shopNotFound = false;
  categories: Category[];
  user: User;
  shop: Shop;
  shopForm: FormGroup;
  formNotValid = false;
  shopUpdated = false;
  shopNotUpdated = false;

  constructor(private httpClient: HttpClient, private formBuilder: FormBuilder) { }

  ngOnInit() {
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

    const params: HttpParams = new HttpParams().set('username', localStorage.getItem('username'));
    this.httpClient.get(this.baseUrlGetUser, {
      params,
      observe: 'response'
    }).subscribe(
      (response) => {
        this.user = response.body as User;
        console.log(this.user);
        this.getShop();
        },
        (error) => {
          console.log(error.status);
          console.log(error.body);
        }
    );

    this.shopForm = this.formBuilder.group({
      id: [''],
      maxDistance: ['', Validators.required],
      name: ['', Validators.required],
      category: ['', Validators.required],
      services: new FormArray([]),
      geoLocation: this.formBuilder.group({
        longitude: ['', Validators.required],
        latitude: ['', Validators.required]
      }),
      pictures: this.formBuilder.array([
        this.formBuilder.control('')
      ]),
      servicePlace: ['', Validators.required],
      employees: ['', Validators.required],
      employee: new FormArray([])
    });

  }
  get f() { return this.shopForm.controls; }
  get s() { return this.f.services as FormArray; }
  get o() { return this.f.employee as FormArray; }
  get pictures() { return this.shopForm.get('pictures') as FormArray; }

  onChangeEmployees(e) {
    const numberOfEmployees = e.target.value || 0;
    if (this.o.length < numberOfEmployees) {
      for (let i = this.o.length; i < numberOfEmployees; i++) {
        this.o.push(this.formBuilder.group({
          monday: this.formBuilder.group ({
            open: ['', Validators.required],
            close: ['', Validators.required]
          }),
          tuesday: this.formBuilder.group ({
            open: ['', Validators.required],
            close: ['', Validators.required]
          }),
          wednesday: this.formBuilder.group ({
            open: ['', Validators.required],
            close: ['', Validators.required]
          }),
          thursday: this.formBuilder.group ({
            open: ['', Validators.required],
            close: ['', Validators.required]
          }),
          friday: this.formBuilder.group ({
            open: ['', Validators.required],
            close: ['', Validators.required]
          }),
          saturday: this.formBuilder.group ({
            open: ['', Validators.required],
            close: ['', Validators.required]
          }),
          sunday: this.formBuilder.group ({
            open: ['', Validators.required],
            close: ['', Validators.required]
          })
        }));
      }
    } else {
        for (let i = this.o.length; i >= numberOfEmployees; i--) {
          this.o.removeAt(i);
        }
    }
  }


  getShop() {
        for (let i = 0; i < this.user.shop.services.length; i++) {
          this.onChangeServices();
        }
        for (let i = 0; i < this.user.shop.pictures.length  - 1; i++) {
          this.addPicture();
        }
        console.log(this.user.shop.employees.length)
        for (let i = 0; i < this.user.shop.employees.length; i++) {
          console.log(i);
          this.addEmployee();
        }
        this.shopForm.reset({
          maxDistance: this.user.shop.maxDistance,
          category: this.user.shop.category.name,
          geoLocation: this.user.shop.geoLocation,
          services: this.user.shop.services as unknown as FormArray,
          pictures: this.user.shop.pictures as unknown as FormArray,
          employee: this.user.shop.employees as unknown as FormArray,
          servicePlace: this.user.shop.servicePlace,
          employees: this.user.shop.employees.length,
          name: this.user.shop.name,
          id: this.user.shop.id
        });
  }
  addEmployee() {
    this.o.push(this.formBuilder.group({
      monday: this.formBuilder.group ({
        open: ['', Validators.required],
        close: ['', Validators.required]
      }),
      tuesday: this.formBuilder.group ({
        open: ['', Validators.required],
        close: ['', Validators.required]
      }),
      wednesday: this.formBuilder.group ({
        open: ['', Validators.required],
        close: ['', Validators.required]
      }),
      thursday: this.formBuilder.group ({
        open: ['', Validators.required],
        close: ['', Validators.required]
      }),
      friday: this.formBuilder.group ({
        open: ['', Validators.required],
        close: ['', Validators.required]
      }),
      saturday: this.formBuilder.group ({
        open: ['', Validators.required],
        close: ['', Validators.required]
      }),
      sunday: this.formBuilder.group ({
        open: ['', Validators.required],
        close: ['', Validators.required]
      })
    }));
  }
  addPicture() {
    this.pictures.push(this.formBuilder.control(''));
  }
  onChangeServices() {
        this.s.push(this.formBuilder.group({
          name: ['', Validators.required],
          durationStr: ['', Validators.required],
          price: ['', Validators.required]
        }));
  }


  onSubmit() {
    this.formNotValid = false;
    this.shopUpdated = false;
    this.shopNotUpdated = false;
    if (this.shopForm.invalid) {
      console.log('nope');
      this.formNotValid = true;
      return;
    }
    console.log(this.shopForm);
    const shop = {} as Shop;
    const cat = {} as Category;
    let services = [] as Service[];
    let location = {} as GeoLocation;
    let pictures = [] as string[];
    let opening = [] as Employee[];
    cat.name = this.shopForm.controls.category.value;
    shop.maxDistance = this.shopForm.controls.maxDistance.value;
    location = this.shopForm.controls.geoLocation.value;
    services = this.shopForm.controls.services.value;
    pictures = this.shopForm.controls.pictures.value;
    opening = this.shopForm.controls.employee.value;
    shop.category = cat;
    shop.users = this.user;
    shop.geoLocation = location;
    shop.pictures = pictures;
    shop.services = services;
    shop.servicePlace = this.shopForm.controls.servicePlace.value;
    shop.id = this.shopForm.controls.id.value;
    shop.name = this.shopForm.controls.name.value;
    shop.employees = opening;
    console.log(shop);
    const params: HttpParams = new HttpParams().set('id', this.user.id.toString());
    return this.httpClient.post(this.baseUrlAddNewShop,  shop, {params, observe: 'response'})
    .subscribe(
      (response) => {
          if (response.status === 201) {
            console.log(response);
            this.shopUpdated = true;
          }
        },
        (error) => {
          console.log(error);
          this.shopNotUpdated = true;
        }
    );


  }
  onReset() {
    this.formNotValid = false;
    this.shopForm.reset();
    this.s.clear();
    this.pictures.clear();
  }
  onClear() {
    this.formNotValid = false;
    this.s.reset();
    this.pictures.reset();
  }

}
