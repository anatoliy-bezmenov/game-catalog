import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Game } from '../types/game';


@Injectable({
    providedIn: 'root',
})
export class GamesService {
    url = 'http://localhost:4000/';

    constructor(private http: HttpClient) { }

    getGames() {
        return this.http.get<Game[]>(this.url + 'games', { headers: { Accept: 'application/json' } });
    }

    getGameById(id: string, token: string) {
        return this.http.get<Game>(this.url + `games/${id}/details`, { headers: { Accept: 'application/json' } })
    }

    searchGame(name: string){
        return this.http.get<Game>(this.url + `search`)
    }


    createGame(gameData: Game, token: string) {
        const headerObject = {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: token,
        }

        return this.http.post<Game>(this.url + 'games/create', gameData,
            {
                headers: headerObject
            }
        );
    }


    saveGameById(id: string, gameData: Game, token: string) {
        const headerObject = {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: token,
        }

        return this.http.post<Game>(this.url + `games/${id}/update`, gameData,
            {
                headers: headerObject
            }
            );
    }
    

    deleteGameById(id: string, token: string) {
        const headerObject = {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: token,
        }

        return this.http.get<Game>(this.url + `games/${id}/delete`,
            {
                headers: headerObject
            }
            );
    }
}