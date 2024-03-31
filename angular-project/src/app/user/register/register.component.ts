import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/types/user';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {

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
      name: new FormControl(this.user.name, [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(250),
      ]),
      email: new FormControl(this.user.email, [
        Validators.required,
        // Validators.pattern("/@[a-zA-Z0-9]+\.[a-zA-Z0-9]+$/"),
        Validators.minLength(1),
        Validators.maxLength(250),
      ]),
      password: new FormControl(this.user.password, [
        Validators.required,
        Validators.minLength(6),
      ]),
      rePassword: new FormControl(this.user.rePassword, [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  get name() {
    return this.reactiveForm.get('name')!;
  }

  get email() {
    return this.reactiveForm.get('email')!;
  }

  get password() {
    return this.reactiveForm.get('password')!;
  }

  get rePassword() {
    return this.reactiveForm.get('rePassword')!;
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

  public register(): void {
    this.validate()

    this.user = this.reactiveForm.value;

    const formBody = {
      email: this.user.email,
      name: this.user.name,
      password: this.user.password, 
      rePassword: this.user.rePassword,
    }

    this.userService.register(formBody).subscribe((data) => {
      localStorage.setItem(this.TOKEN_KEY, data.token);
      localStorage.setItem(this.USER_KEY, JSON.stringify(data));
      this.userService.token = data.token;
      this.router.navigate(['/']);
    });

  }

}
