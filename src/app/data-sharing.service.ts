import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject, ReplaySubject } from 'rxjs';
import { User } from './main-page/user.model';

@Injectable({
  providedIn: 'root',
})
export class DataSharingService {
  private _userSource = new ReplaySubject<User>(1);
  // private _userSource = new BehaviorSubject<User>({});
  // private _userSource = new Subject<User>();
  userSource$ = this._userSource.asObservable();

  constructor() {
    const user = localStorage.getItem('user');
    if (user) {
      this.updateUser(JSON.parse(user));
    }
  }

  updateUser(user: any) {
    const userString = JSON.stringify(user);
    localStorage.setItem('user', userString);
    this._userSource.next(user);
  }
}
