import { Component, EventEmitter, Output } from '@angular/core';
import { User } from '../main-page/user.model';
import { NavigationExtras, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { LoginService } from '../login.service';
import { DataSharingService } from '../data-sharing.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  userModel: any = {
    address: {},
    name: '',
    password: '',
    email: '',
    phone: 0,
    userId: '0',
  };
  loginUserDetails: any = {};
  loginUrl = 'http://localhost:8080/login';
  response: any;
  userId: number;
  user: any;
  loginUnsuccessful: boolean = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    private loginService: LoginService,
    private _dataSharingService: DataSharingService
  ) {}

  verifyUser() {
    this.loginService.generateToken(this.loginUserDetails).subscribe(
      (response: any) => {
        console.log(response.token);
        console.log(response);

        this.loginService.loginUser(response.token);

        this.userId = response.id;
        if (!this.user) {
          this.http
            .get('http://localhost:8080/getProfile/' + this.userId)
            .subscribe((response) => {
              this.user = response;
              this._dataSharingService.updateUser(this.user);
              // this.userName = this.user.name;
              // console.log(this.user);
              this.router.navigate(['/']);
            });
        }
        // console.log('the user id from login component is ' + this.userId);

        // const navigationExtras: NavigationExtras = {
        //   state: { userId: this.userId },
        // };
        // this.router.navigate(['/'], navigationExtras);
      },
      (err) => {
        console.log('an error occured');
        this.loginUnsuccessful = true;
      }
    );
  }
}
