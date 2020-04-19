import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn$: Observable<boolean>;

  @Output() public sidenavToggle = new EventEmitter();

  constructor(private jwtHelper: JwtHelperService, private authService: AuthService) { }

  ngOnInit() {
    this.isLoggedIn$ = this.authService.isLoggedIn;
  }

  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  }

  onLogout() {
    this.authService.logout();
  }

  logOut() {
    //localStorage.removeItem("jwt");
    this.authService.logout2();
  }
  
  isUserAuthenticated() {
    let token: string = localStorage.getItem("jwt");
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      return true;
    }
    else {
      return false;
    }
  }  
}
