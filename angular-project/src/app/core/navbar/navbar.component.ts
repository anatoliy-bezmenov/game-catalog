import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(private authService: AuthService) {}

  get username(): string {
    let parsedUser = {name: ''};
    parsedUser = JSON.parse(this.authService.getUser())   
    return parsedUser?.name
  }

  get isLoggedIn(): boolean {
    let isLogged = false;
    let parsedUser;

    try {
      parsedUser = JSON.parse(this.authService.getUser())   
      if (parsedUser && parsedUser.token) {
        isLogged = true;
      }
    } catch(err) {}

    return isLogged;
  }

}
