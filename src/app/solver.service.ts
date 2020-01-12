import {Injectable} from '@angular/core';
import {UtilityService} from './utility.service';
import {Sudoku} from './types';

@Injectable({
  providedIn: 'root'
})
export class SolverService {

  public constructor(private utility: UtilityService) {
  }

  public async solve(sudoku: Sudoku): Promise<Sudoku> {
    if (this.utility.conflict(sudoku))
      return;
    if (this.solved(sudoku))
      return sudoku;
    for (let i = 1; i <= 9; i++) {
      let next = this.next(sudoku, i);
      let solution = await this.solve(next);
      if (solution)
        return solution;
    }
  }

  private solved(sudoku: Sudoku): boolean {
    for (let i = 0; i < 9; i++)
      for (let j = 0; j < 9; j++)
        if (!sudoku[i][j])
          return false;
    return true;
  }

  private next(sudoku: Sudoku, value: number): Sudoku {
    let next = this.utility.copy(sudoku);
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (!next[i][j]) {
          next[i][j] = value;
          return next;
        }
      }
    }
  }

}
