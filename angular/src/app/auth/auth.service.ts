import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { User } from './user';

@Injectable()
export class AuthService {
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  constructor(
    private router: Router,
    private http : HttpClient
  ) {}

  login(user: User) {
    if (user.userName !== '' && user.password !== '' ) {
      this.loggedIn.next(true);
      this.router.navigate(['/']);
    }
  }

  login2(user: User) {
    let validLogin = false;
    let credentials = JSON.stringify(user);
    this.http.post("http://magishrms.herokuapp.com/api/auth/login", credentials, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    }).subscribe(response => {
      let token = (<any>response).token;
      localStorage.setItem("jwt", token);
      validLogin = true;
      this.router.navigate(["/"]);
      return true;
    }, err => {
      //this.invalidLogin = true;
    });

    return validLogin;
  }
  
  logout() {
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }

  logout2() {
    localStorage.removeItem("jwt");
    this.router.navigate(['/login']);
  }
}