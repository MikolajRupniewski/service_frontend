import { Component, OnInit } from '@angular/core';
import { Shop } from 'src/app/models/shops.model';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-shops',
  templateUrl: './shops.component.html',
  styleUrls: ['./shops.component.css']
})
export class ShopsComponent implements OnInit {
  shops: Shop[];
  baseUrlGetShops = 'http://127.0.0.1:8080/shops/';
  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
    this.httpClient.get(this.baseUrlGetShops, {
      observe: 'response'
    }).subscribe(
      (response) => {
        this.shops = response.body as Shop[];
        console.log(this.shops);
        },
        (error) => {
          console.log(error.status);
          console.log(error.body);
        }
    );
  }
  deleteShop(index: number) {
    console.log(this.shops[index]);
    if (confirm('Are you sure to delete ' + this.shops[index].name)) {
      // TODO
      console.log('Implement delete functionality here');
    }
  }

}
