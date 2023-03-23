import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent {
  userId: any = 0;
  user: any;

  productDetails: any = {
    name:'',
    details:'',
    imgsrc:'',
    category:{
      category:''
    },
    subCategory:{
      name:''
    }
  }

  addProductUrl:string = 'http://localhost:8080/products/addProduct';
  response: any;
  didAddProduct:boolean = false;


  constructor(private http: HttpClient, private router: Router) {
    if (!!localStorage.getItem('token')) {
      const navigation = this.router.getCurrentNavigation();
      if (navigation != null) {
        const state = navigation.extras.state as {user:any };
        this.userId = state.user.userId;
        this.user = state.user;
      }
    }
  }

  addProduct(){
    this.http.post(this.addProductUrl,this.productDetails).subscribe(response=>{
      this.response = response;
      this.didAddProduct = true;
    })
  }
}
