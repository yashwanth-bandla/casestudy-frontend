import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataSharingService } from '../data-sharing.service';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css'],
})
export class AddproductComponent {
  userId: any = 0;
  user: any;

  productDetails: any = {
    name: '',
    details: '',
    imgsrc: '',
    category: {
      category: '',
    },
    subCategory: {
      name: '',
    },
  };

  addProductUrl: string = 'http://localhost:8080/products/addProduct';
  response: any;
  isProductAdded: boolean = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    private _dataSharingService: DataSharingService
  ) {
    // if (!!localStorage.getItem('token')) {
    //   const navigation = this.router.getCurrentNavigation();
    //   if (navigation != null) {
    //     const state = navigation.extras.state as {user:any };
    //     this.userId = state.user.userId;
    //     this.user = state.user;
    //   }
    // }
  }

  ngOnInit() {
    this._dataSharingService.userSource$.subscribe((res) => {
      this.user = res;
      this.userId = res.userId;
    });
  }

  addProduct() {
    this.http
      .post(this.addProductUrl, this.productDetails)
      .subscribe((response) => {
        this.response = response;
        this.isProductAdded = true;
      });
  }
}
