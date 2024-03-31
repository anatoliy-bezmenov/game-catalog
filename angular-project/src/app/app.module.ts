import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { FooterComponent } from './core/footer/footer.component';
import { HeaderComponent } from './core/header/header.component';
import { ErrorComponent } from './error/error.component';
import { GameListComponent } from './games/game-list/game-list.component';
import { CurrentGameComponent } from './games/current-game/current-game.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AddGameComponent } from './games/add-game/add-game.component';
import { SearchComponent } from './games/search/search.component';
import { LogoutComponent } from './user/logout/logout.component';
import { EditGameComponent } from './games/edit-game/edit-game.component';
import { NavbarComponent } from './core/navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    FooterComponent,
    HeaderComponent,
    ErrorComponent,
    GameListComponent,
    CurrentGameComponent,
    AddGameComponent,
    SearchComponent,
    LogoutComponent,
    EditGameComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
