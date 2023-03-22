import { Component, EventEmitter, Output } from '@angular/core';
import { User } from '../main-page/user.model';
import { NavigationExtras, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { LoginService } from '../login.service';
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

  @Output() childToParent = new EventEmitter<number>();

  constructor(
    private http: HttpClient,
    private router: Router,
    private loginService: LoginService
  ) {}

  verifyUser() {
    // console.log(this.loginUserDetails);

    // this.http
    //   .post(this.loginUrl, this.loginUserDetails)
    //   .subscribe((Response) => {
    //     console.log(Response);
    //     this.response = Response;
    //     this.userModel = {
    //       "name": this.response.name,
    //     }
    //     this.router.navigate(['/'])
    //   },err=>{console.log(err)}
    //   );

    this.loginService.generateToken(this.loginUserDetails).subscribe(
      (response: any) => {
        console.log(response.token);
        console.log(response);

        this.loginService.loginUser(response.token);
        console.log(response.id);

        this.userId = response.id;
        console.log('the user id from login component is ' + this.userId);

        // this.childToParent.emit(this.userId);

        const navigationExtras: NavigationExtras = {
          state: { userId: this.userId },
        };
        this.router.navigate(['/'], navigationExtras);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
