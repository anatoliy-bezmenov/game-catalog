import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/user/user.service';
import { GamesService } from '../game.service';
import { AuthService } from 'src/app/auth.service';
import { Game } from 'src/app/types/game';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-edit-game',
  templateUrl: './edit-game.component.html',
  styleUrls: ['./edit-game.component.css']
})
export class EditGameComponent implements OnInit {


  reactiveForm!: FormGroup;
  games: Game[] | null = [];
  game = {} as Game;
  gameId: string = '';


  constructor(private userService: UserService, private gameService: GamesService, private router: Router, private authService: AuthService, private activeRoute: ActivatedRoute
    , private http: HttpClient,) {
    this.game = {} as Game;
    this.gameId = activeRoute.snapshot.params['gameId']
  }

  ngOnInit(): void {

    const token = this.authService.getToken()
    // Redirect guest to login page if not logged in
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
      year: new FormControl(this.game.year, [
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

    this.fetchGameById(this.gameId, token)
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

  fetchGameById(id: string, token: string): void {
    
    this.gameService.getGameById(id, token).subscribe((data: Game) => {
      this.game = data;

      // Redirect user to games page if not owner of game
      if (this.game.isOwner == false) {
        this.router.navigate(['/games']);
      }

      this.populateForm(data)
    })
  }

  populateForm(game: Game): void {
    this.reactiveForm.patchValue({
      name: game.name,
      category: game.category,
      publisher: game.publisher,
      year: game.year,
      console: game.console,
      image: game.image,
      description: game.description,
    })
  }

  saveGame() {
    if (this.reactiveForm.invalid) {
      return;
    }

    const token = this.authService.getToken()
    const id = this.gameId;
    const gameData = this.reactiveForm.value;

    this.gameService.saveGameById(id, gameData, token).subscribe(() => {
      this.router.navigate(['/games']);
    })
  }

}
