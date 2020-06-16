import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/order.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  baseUrlGetOrders = 'http://127.0.0.1:8080/orders/';
  orders: Order[];
  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
    this.getOrders();
  }

  getOrders() {
    this.httpClient.get(this.baseUrlGetOrders, {
      observe: 'response'
    }).subscribe(
      (response) => {
        this.orders = response.body as Order[];
        console.log(this.orders);
        },
        (error) => {
          console.log(error.status);
          console.log(error.body);
        }
    );
  }

  deleteComment(index: number) {
    if (confirm('Are you sure to delete: ' + this.orders[index].comment)) {
      this.httpClient.delete(this.baseUrlGetOrders  + this.orders[index].id, {
        observe: 'response'
      }).subscribe(
        (response) => this.getOrders(),
        (error) => this.getOrders()
      );
    }
  }
}
