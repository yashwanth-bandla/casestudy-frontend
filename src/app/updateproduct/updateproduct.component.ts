import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { DataSharingService } from '../data-sharing.service';

@Component({
  selector: 'app-updateproduct',
  templateUrl: './updateproduct.component.html',
  styleUrls: ['./updateproduct.component.css'],
})
export class UpdateproductComponent {
  userId: any = 0;
  user: any;

  productDetails: any = {
    // name:'',
    // imgsrc:'',
    // category:{
    //   category:''
    // },
    // subCategory:{
    //   name:''
    // }
  };

  updateProductUrl: string = 'http://localhost:8080/products/update';
  response: any;
  isProductUpdated: boolean = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    private _dataSharingService: DataSharingService
  ) {
    // if (!!localStorage.getItem('token')) {
    //   const navigation = this.router.getCurrentNavigation();
    //   if (navigation != null) {
    //     const state = navigation.extras.state as { user: any };
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

  updateProduct() {
    this.http
      .post(this.updateProductUrl, this.productDetails)
      .subscribe((response) => {
        this.isProductUpdated = true;
        
      });
  }
}
