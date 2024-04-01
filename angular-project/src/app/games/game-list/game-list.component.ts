import { Component } from '@angular/core';
import { GamesService } from '../game.service';
import { Game } from 'src/app/types/game';


@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css'],
})


export class GameListComponent {

  games: Game[] | null = [];
  game = {} as Game;
  token: string = '';
  isLoading1: boolean = true;
  cnt: number = 0;
  constructor(private gamesService: GamesService) {
  }


  ngOnInit(): void {
    this.fetchGames()
  }

  fetchGames(): void {

    let intervalID = setInterval(() => {
      this.cnt += 10;
    }, 100);
    
    setTimeout(() => {
      this.cnt=0;
      clearInterval(intervalID);
      this.isLoading1 = false;

    }, 1000);
    
      this.gamesService.getGames().subscribe((data) => {
        this.games = data
      });
  }

  fetchGameById(id: string, token: string): void {
    this.gamesService.getGameById(id, token).subscribe((data: Game) => {
      this.game = data;
    })
  }

}
