import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private authService: AuthService) {}


  get username(): string {
    let parsedUser;
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
