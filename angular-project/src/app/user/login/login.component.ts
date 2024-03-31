import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { User } from 'src/app/types/user';
import { AuthService } from 'src/app/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  reactiveForm!: FormGroup;
  user: User;
  USER_KEY = '[user]';
  TOKEN_KEY = '[token]';

  constructor(private userService: UserService, private router: Router, private authService: AuthService) {
    this.user = {} as User;    
  }

  ngOnInit(): void {

    // Redirect user to home page if already logged in
    const token = this.authService.getToken()
    if (token) {
      this.router.navigate(['/']);
    }

    this.reactiveForm = new FormGroup({
      email: new FormControl(this.user.email, [
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"),
        Validators.minLength(1),
        Validators.maxLength(250),
      ]),
      password: new FormControl(this.user.password, [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  get email() {
    return this.reactiveForm.get('email')!;
  }

  get password() {
    return this.reactiveForm.get('password')!;
  }

  public validate(): void {
    if (this.reactiveForm.invalid) {
      for (const control of Object.keys(this.reactiveForm.controls)) {
        this.reactiveForm.controls[control].markAsTouched();
      }
      return;
    }

    this.user = this.reactiveForm.value;
  }

  public login(): void {
    this.validate()

    this.user = this.reactiveForm.value;

    this.userService.login({email: this.user.email, password: this.user.password}).subscribe((data) => {
      localStorage.setItem(this.TOKEN_KEY, data.token);
      localStorage.setItem(this.USER_KEY, JSON.stringify(data));
      this.router.navigate(['/']);
    });

  }


}
