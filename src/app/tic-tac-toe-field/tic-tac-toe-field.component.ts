import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tic-tac-toe-field',
  templateUrl: './tic-tac-toe-field.component.html',
  styleUrls: ['./tic-tac-toe-field.component.css']
})
export class TicTacToeFieldComponent implements OnInit {

  squares: string[][];
  turnX: boolean;
  status: string;
  gameActive: boolean;

  constructor() { }

  ngOnInit() {
    this.newGame();
  }

  playMove(index: [number, number]) {
    if (this.gameActive && this.squares[index[0]][index[1]] === "") {
      let symbol: string = this.turnX ? "x" : "o";
      this.squares[index[0]][index[1]] = symbol;
      this.turnX = !this.turnX;
      this.status = `${this.turnX ? "x" : "o"} turn`
      if (this.checkWin(index, symbol)) {
        this.declareWinner(symbol);
      } else if (this.checkBoardFull()) {
        this.status = "Draw";
        this.gameActive = false;
      }
    }
  }

  checkWin(index: [number, number], symbol: string): boolean {
    const x = index[0];
    const y = index[1];
    const n = 3;

    // check colomn
    for (let i = 0; i < n; i++) {
      if (this.squares[x][i] !== symbol) {
        break;
      }
      if (i === n - 1) {
        return true;
      }
    }

    // check row
    for (let i = 0; i < n; i++) {
      if (this.squares[i][y] !== symbol) {
        break;
      }
      if (i === n - 1) {
        return true;
      }
    }

    // check diagonal
    for (let i = 0; i < n; i++) {
      if (this.squares[i][i] !== symbol) {
        break;
      }
      if (i === n - 1) {
        return true;

      }
    }

    // check anti diagonal
    for (let i = 0; i < n; i++) {
      if (this.squares[i][n - 1 - i] !== symbol) {
        break;
      }
      if (i === n - 1) {
        return true;
        return;
      }
    }
  }

  checkBoardFull(): boolean {
    for (let row of this.squares) {
      for (let square of row) {
        if (square === "") {
          return false;
        }
      }
    }
    return true;
  }

  declareWinner(symbol: string) {
    this.status = `${symbol} wins`
    this.gameActive = false;
  }

  newGame() {
    this.squares = [["", "", ""], ["", "", ""], ["", "", ""]];
    this.status = "x turn";
    this.turnX = true;
    this.gameActive = true;
  }

}
