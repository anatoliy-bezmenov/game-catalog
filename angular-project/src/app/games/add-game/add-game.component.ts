import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GamesService } from '../game.service';
import { AuthService } from 'src/app/auth.service';
import { Game } from 'src/app/types/game';


@Component({
  selector: 'app-add-game',
  templateUrl: './add-game.component.html',
  styleUrls: ['./add-game.component.css'],
})
export class AddGameComponent implements OnInit {

  reactiveForm!: FormGroup;
  game: Game;

  constructor(private gameService: GamesService, private router: Router, private authService: AuthService) {
    this.game = {} as Game;
  }

  ngOnInit(): void {

    // Redirect user to login page if not logged in
    const token = this.authService.getToken()
    if (!token) {
      this.router.navigate(['/login']);
    }

    this.reactiveForm = new FormGroup({
      name: new FormControl(this.game.name, [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(250),
      ]),
      category: new FormControl(this.game.category, [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(250),
      ]),
      publisher: new FormControl(this.game.publisher, [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(250),
      ]),
      year: new FormControl(this.game. year, [
        Validators.required,
        Validators.min(1900),
        Validators.max(2024),
      ]),
      console: new FormControl(this.game.console, [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(250),
      ]),
      image: new FormControl(this.game.image, [
        Validators.required,
        Validators.pattern(/(https?:\/\/.*\.(?:png|jpg))/),
        Validators.minLength(1),
        Validators.maxLength(250),
      ]),
      description: new FormControl(this.game.description, [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(250),
      ]),
    });
  }

  get name() {
    return this.reactiveForm.get('name')!;
  }

  get category() {
    return this.reactiveForm.get('category')!;
  }

  get publisher() {
    return this.reactiveForm.get('publisher')!;
  }

  get year() {
    return this.reactiveForm.get('year')!;
  }

  get console() {
    return this.reactiveForm.get('console')!;
  }

  get image() {
    return this.reactiveForm.get('image')!;
  }

  get description() {
    return this.reactiveForm.get('description')!;
  }

  public validate(): void {
    
    if (this.reactiveForm.invalid) {
      for (const control of Object.keys(this.reactiveForm.controls)) {
        this.reactiveForm.controls[control].markAsTouched();
      }
      return;
    }

    this.game = this.reactiveForm.value;

  }
  
  onCancel() {
      this.reactiveForm.reset();
  }

  addGame() {
    const token = this.authService.getToken()    
    const gameData = this.reactiveForm.value;

    this.gameService.createGame(gameData, token).subscribe(() => {
      this.router.navigate(['/games']);
    })
  }

}
