import { Component, Input, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
// import { faUserCircle } from '@fortawesome/free-regular-svg-icons';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { LoginService } from '../login.service';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  usericon = faUserCircle;
  carticon = faCartShopping;
  plusicon = faPlusSquare;

  @Input('user')
  user: any;

  @Input('userId')
  userId: number;

  isAdmin:boolean ;


  constructor(private loginservice: LoginService, private router: Router) {

  }

  ngOnInit(){
    if(this.user.role=="admin"){
      this.isAdmin=true;
      console.log("the role is: " + this.user.role);
      
    } else{
      this.isAdmin=false;
      console.log("the role is: " + this.user.role);
    }
  }

  logOutUser() {
    this.loginservice.logOut();
    location.reload();
  }

  goToCart() {
    const navigationExtras: NavigationExtras = {
      state: { user: this.user },
    };
    this.router.navigate(['/cart'], navigationExtras);
  }

  goToHome() {
    const navigationExtras: NavigationExtras = {
      state: { userId: this.userId, user: this.user },
    };
    this.router.navigate(['/'], navigationExtras);
  }

  goToProducts() {
    const navigationExtras: NavigationExtras = {
      state: { userId: this.userId, user: this.user },
    };
    this.router.navigate(['/products'], navigationExtras);
  }
}
