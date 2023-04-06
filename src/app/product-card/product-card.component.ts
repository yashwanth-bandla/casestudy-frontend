import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../main-page/product.model';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent implements OnInit {
  product: any;
  userId: number;

  @Input('userId')
  inputUserId: number;

  @Input('product')
  productObj: Product;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.product = {
      name: this.productObj.name,
      details: this.productObj.details,
      price: this.productObj.price,
      imgsrc: this.productObj.imgsrc,
      productId: this.productObj.id,
    };

    this.userId = this.inputUserId;
  }

  addToCart() {
    // console.log(this.product.productId);

    this.http
      .get(
        'http://localhost:8080/cart/' +
          this.userId +
          '/add/' +
          this.product.productId
      )
      .subscribe((response) => {
        // console.log(response);
      });
  }
}
