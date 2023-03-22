import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  signUpDetails: any = {
    name: '',
    email: '',
    password: '',
    address: {
      street: '',
      city: '',
      state: '',
    },
  };
  signUpUrl = 'http://localhost:8080/signup';
  
  response: any;

  constructor(private http: HttpClient, private router: Router) {}

  signUpUser() {
    this.http.post(this.signUpUrl, this.signUpDetails).subscribe(
      (response) => {
        this.response = response;
        console.log(this.response);
        this.router.navigate(['/login']);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
