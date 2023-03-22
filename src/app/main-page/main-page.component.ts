import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from './product.model';
import { User } from './user.model';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
})
export class MainPageComponent {
  product: Product;
  response: any;
  items: any = [];
  completed: boolean = false;
  // i = 1;
  userId: any = 0;
  user: any;
  userName: string;
  responseList: any;

  constructor(private http: HttpClient, private router: Router) {
    if (!!localStorage.getItem('token')) {
      const navigation = this.router.getCurrentNavigation();
      if (navigation != null) {
        const state = navigation.extras.state as { userId: number };
        this.userId = state.userId;
      }
      console.log('user id is ' + this.userId);

      if (!this.user) {
        this.http
          .get('http://localhost:8080/getProfile/' + this.userId)
          .subscribe((response) => {
            this.user = response;
            this.userName = this.user.name;
            console.log(this.user);
          });
      }
    }
  }

  ngOnInit() {
    // for (let i = 1; i <= 7; i++) {
    //   this.http
    //     .get('http://localhost:8080/products/getById/' + i)
    //     .subscribe((response) => {
    //       this.response = response;

    //       this.items.push(this.response);
    //     });
    // }

    this.http
      .get('http://localhost:8080/products/getAllProducts')
      .subscribe((response) => {
        this.responseList = response;
        console.log(this.responseList);
        
        for (let productone in this.responseList) {
          this.items.push(this.responseList[productone]);
          console.log(this.responseList[productone]);
          
        }
      });
  }
}
