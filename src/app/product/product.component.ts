import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { DataSharingService } from '../data-sharing.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent {
  userId: any = 0;
  user: any;
  isAdmin: boolean;

  constructor(
    private http: HttpClient,
    private router: Router,
    private _dataSharingService: DataSharingService
  ) {
    // if (!!localStorage.getItem('token')) {
    //   const navigation = this.router.getCurrentNavigation();
    //   if (navigation != null) {
    //     const state = navigation.extras.state as { userId: number, user:any };
    //     this.userId = state.userId;
    //     this.user = state.user;
    //     if(this.user.role=="admin"){
    //       this.isAdmin = true;
    //     } else{
    //       this.isAdmin = false;
    //     }
    //   }
    // }
  }

  ngOnInit() {
    this._dataSharingService.userSource$.subscribe((res) => {
      this.user = res;
      this.userId = res.userId;
      if (this.user.role == 'admin') {
        this.isAdmin = true;
      } else {
        this.isAdmin = false;
      }
    });
  }

  goToUpdate() {
    // const navigationExtras: NavigationExtras = {
    //   state: { userId: this.userId, user: this.user },
    // };
    this.router.navigate(['/products/update']);
  }

  goToAdd() {
    // const navigationExtras: NavigationExtras = {
    //   state: { userId: this.userId, user: this.user },
    // };
    this.router.navigate(['/products/add']);
  }
}
