import { Component } from '@angular/core';
import { Game } from 'src/app/types/game';
import { GamesService } from '../game.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-current-game',
  templateUrl: './current-game.component.html',
  styleUrls: ['./current-game.component.css']
})
export class CurrentGameComponent {

  games: Game[] | null = [];
  game = {} as Game;
  gameId: string = '';
  token: string = ''
  id: string = '';

  constructor(private currentGameService: GamesService, private http: HttpClient, private activeRoute: ActivatedRoute,
    private authService: AuthService, private router: Router) {
    this.game = {} as Game;
    this.gameId = activeRoute.snapshot.params['gameId']
  }

  ngOnInit(): void {
    this.fetchGameById(this.gameId)
  }


  fetchGameById(id: string): void {
    const token = this.authService.getToken()

    if (token) {
      this.currentGameService.getGameById(id, token).subscribe((data: Game) => {
        this.game = data;
      })
      return;
    }

    if (!token) {
      this.currentGameService.getGameByIdNoUser(id).subscribe((data: Game) => {
        this.game = data;
      })
      return;
    }
  
  }


  deleteGameById(id: string): void {
    const token = this.authService.getToken()

    this.currentGameService.deleteGameById(id, token).subscribe(() => {
        this.router.navigate(['/games']);
    })
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
