import { Component, Input, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
// import { faUserCircle } from '@fortawesome/free-regular-svg-icons';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { LoginService } from '../login.service';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import { DataSharingService } from '../data-sharing.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  usericon = faUserCircle;
  carticon = faCartShopping;
  plusicon = faPlusSquare;

  user: any;
  userId: number;
  userName: string;

  isAdmin: boolean;

  constructor(
    private loginservice: LoginService,
    private router: Router,
    private _dataSharingService: DataSharingService
  ) {
    this._dataSharingService.userSource$.subscribe((res) => {
      this.user = res;
      this.userId = res.userId;
      this.userName = res.name;
      if (this.user.role == 'admin') {
        this.isAdmin = true;
      } else {
        this.isAdmin = false;
      }
    });
  }

  ngOnInit() {}
  // ngOnChanges() {
  //   if (this.user.role == 'admin') {
  //     this.isAdmin = true;
  //     console.log('the role is: ' + this.user.role + 'from onchanges');
  //   } else {
  //     this.isAdmin = false;
  //     console.log('the role is: ' + this.user.role + 'from onchanges');
  //   }
  // }

  logOutUser() {
    this.loginservice.logOut();
    this.router.navigate(['/login']);
  }

  goToCart() {
    // const navigationExtras: NavigationExtras = {
    //   state: { user: this.user },
    // };
    this.router.navigate(['/cart']);
  }

  goToHome() {
    // const navigationExtras: NavigationExtras = {
    //   state: { userId: this.userId, user: this.user },
    // };
    this.router.navigate(['/']);
  }

  goToProducts() {
    // const navigationExtras: NavigationExtras = {
    //   state: { userId: this.userId, user: this.user },
    // };
    this.router.navigate(['/products']);
  }
}
