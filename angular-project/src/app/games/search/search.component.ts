import { Component } from '@angular/core';
import { Game } from 'src/app/types/game';
import { GamesService } from '../game.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  games: Game[] | null = [];
  game = {} as Game;
  
  constructor(private gamesService: GamesService) {
  }

  ngOnInit(): void {

    this.fetchGames()
  }

  fetchGames(): void {
    
    this.gamesService.getGames().subscribe((data) => {
      this.games = data
    });
  }

  fetchGameById(id: string, token: string): void {
    this.gamesService.getGameById(id, token).subscribe((data: Game) => {
      this.game = data;
    })
  }

  fetchGameByName(name: string) : void {
    this.gamesService.searchGame(name).subscribe((data) => {
      this.games = data;
    })
  }

}
