import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './error/error.component';
import { GameListComponent } from './games/game-list/game-list.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { CurrentGameComponent } from './games/current-game/current-game.component';
import { AddGameComponent } from './games/add-game/add-game.component';
import { SearchComponent } from './games/search/search.component';
import { LogoutComponent } from './user/logout/logout.component';
import { EditGameComponent } from './games/edit-game/edit-game.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'games', component: GameListComponent },
  { path: 'games/create', component: AddGameComponent },
  { path: 'games/:gameId/details', component: CurrentGameComponent },
  { path: 'games/:gameId/edit', component: EditGameComponent },
  { path: 'search', component: SearchComponent },
  { path: '**', redirectTo: '/404' },
  { path: '404', component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
