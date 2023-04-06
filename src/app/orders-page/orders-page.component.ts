import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataSharingService } from '../data-sharing.service';

@Component({
  selector: 'app-orders-page',
  templateUrl: './orders-page.component.html',
  styleUrls: ['./orders-page.component.css'],
})
export class OrdersPageComponent {
  user: any;
  userId: number;

  isOrdersEmpty: boolean = true;

  products: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private _dataSharingService: DataSharingService
  ) {
    this._dataSharingService.userSource$.subscribe((res) => {
      this.userId = res.userId;
    });
  }

  ngOnInit() {
    // this._dataSharingService.userSource$.subscribe((res) => {
    //   this.products = res.orders;
    // });
    this.http
      .get('http://localhost:8080/getProfile/' + this.userId)
      .subscribe((response) => {
        this.user = response;
        this.userId = this.user.id;
        if (this.user.orders != null) {
          this.products = this.user.orders.orderedProducts;
          if (this.products.length != 0) {
            this.isOrdersEmpty = false;
          } else {
            this.isOrdersEmpty = true;
          }
        }
        this._dataSharingService.updateUser(this.user);
      });
  }
}
