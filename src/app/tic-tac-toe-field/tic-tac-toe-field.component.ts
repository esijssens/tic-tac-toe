import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tic-tac-toe-field',
  templateUrl: './tic-tac-toe-field.component.html',
  styleUrls: ['./tic-tac-toe-field.component.css']
})
export class TicTacToeFieldComponent implements OnInit {
  symbols: string[] = ["x", "o"]
  fieldSize: number = 3;
  
  squares: string[][];
  turnPlayer: number;
  status: string;
  gameActive: boolean;

  constructor() { }

  ngOnInit() {
    this.newGame();
  }

  playMove(index: [number, number]) {    
    if (this.gameActive && !this.squares[index[0]][index[1]]) {
      const symbol: string = this.symbols[this.turnPlayer];
      this.squares[index[0]][index[1]] = symbol;

      // Next players turn
      this.turnPlayer = (this.turnPlayer + 1) % this.symbols.length;
      this.status = `${this.symbols[this.turnPlayer]} turn`
      
      // Check if game has ended
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
    const n = this.fieldSize;

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
      }
    }
  }

  checkBoardFull(): boolean {
    for (let row of this.squares) {
      for (let square of row) {
        if (!square) {
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
    this.squares = new Array();
    for (let i = 0; i < this.fieldSize; i++) {
      this.squares.push(new Array(this.fieldSize));
    }
    this.turnPlayer = 0;
    this.status = `${this.symbols[this.turnPlayer]} turn`
    this.gameActive = true;
  }

}
