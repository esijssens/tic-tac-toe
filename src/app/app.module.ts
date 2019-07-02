import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TicTacToeFieldComponent } from './tic-tac-toe-field/tic-tac-toe-field.component';

@NgModule({
  declarations: [
    AppComponent,
    TicTacToeFieldComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
