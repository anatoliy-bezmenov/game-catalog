import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private authService: AuthService) {}

  get username(): string {
    let parsedUser;
    try {
      parsedUser = JSON.parse(this.authService.getUser())   
    } catch(err) {}
    
    return parsedUser?.name
  }

}
