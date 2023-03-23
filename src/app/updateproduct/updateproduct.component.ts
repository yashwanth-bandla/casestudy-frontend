import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-updateproduct',
  templateUrl: './updateproduct.component.html',
  styleUrls: ['./updateproduct.component.css']
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
  }

  updateProductUrl:string = 'http://localhost:8080/products/update';
  response: any;
  didUpdateProduct:boolean = false;



  constructor(private http: HttpClient, private router: Router) {
    if (!!localStorage.getItem('token')) {
      const navigation = this.router.getCurrentNavigation();
      if (navigation != null) {
        const state = navigation.extras.state as { user:any };
        this.userId = state.user.userId;
        this.user = state.user;
      }
    }
  }

  updateProduct(){
    this.http.post(this.updateProductUrl, this.productDetails).subscribe(response=>{
      this.didUpdateProduct = true;
    })
  }

}
