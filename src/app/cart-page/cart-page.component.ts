import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../main-page/product.model';
import { User } from '../main-page/user.model';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css'],
})
export class CartPageComponent {
  user: any;
  userId: number;
  totalPrice: number = 0;
  isCartEmpty: boolean = true

  products: any;
  constructor(private http: HttpClient, private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation != null) {
      const state = navigation.extras.state as { user: any };
      this.userId = state.user.userId;
      this.user = state.user;
      if (this.user.cart != null) {
        this.products = this.user.cart.products;
        if(this.products.length != 0){
          this.isCartEmpty = false;
        } else{
          this.isCartEmpty = true;
        }
      }
      this.http
        .get('http://localhost:8080/getProfile/' + this.userId)
        .subscribe((response) => {
          this.user = response;
          if (this.user.cart != null) {
            this.products = this.user.cart.products;
            if(this.products.length != 0){
              this.isCartEmpty = false;
            } else{
              this.isCartEmpty = true;
            }
          }
          this.getTotalPrice();
        });
    } else {
    }
  }
  getTotalPrice() {
    this.totalPrice = 0;
    if (this.user.cart != null) {
      this.products.forEach(
        (element: { quantity: number; product: { price: number } }) => {
          this.totalPrice =
            this.totalPrice + element.quantity * element.product.price;
        }
      );
    }
  }

  increaseQuantity(productId: number) {
    this.http
      .get('http://localhost:8080/cart/' + this.userId + '/add/' + productId)
      .subscribe((response) => {
        this.http
          .get('http://localhost:8080/getProfile/' + this.userId)
          .subscribe((response) => {
            this.user = response;
            console.log(this.user);
            this.products = this.user.cart.products;
            if(this.products.length != 0){
              this.isCartEmpty = false;
            } else{
              this.isCartEmpty = true;
            }
            this.getTotalPrice();
            // location.reload();
          });
      });
  }

  decreaseQuantity(productId: number) {
    this.http
      .get(
        'http://localhost:8080/cart/' +
          this.userId +
          '/reduceQuantity/' +
          productId
      )
      .subscribe((response) => {
        this.http
          .get('http://localhost:8080/getProfile/' + this.userId)
          .subscribe((response) => {
            this.user = response;
            console.log(this.user);
            this.products = this.user.cart.products;
            if(this.products.length != 0){
              this.isCartEmpty = false;
            } else{
              this.isCartEmpty = true;
            }
            this.getTotalPrice();
            // location.reload();
          });
      });
  }
}
