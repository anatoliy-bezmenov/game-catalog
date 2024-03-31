import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // Redirect user to home page if not logged in
    const token = this.authService.getToken()
    if (!token) {
      this.router.navigate(['/']);
    }
    this.logout()
  }

  public logout(): void {
    this.authService.removeToken()
  }

}
