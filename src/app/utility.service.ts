import {Injectable} from '@angular/core';
import * as _ from 'lodash';
import {Conflict, Sudoku} from './types';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  public constructor() {
  }

  public range(start: number, end?: number, step?: number): number[] {
    return _.range(start, end, step);
  }

  public empty(): Sudoku {
    let sudoku = [];
    for (let i = 0; i < 9; i++) {
      let row = [];
      for (let j = 0; j < 9; j++)
        row.push(0);
      sudoku.push(row);
    }
    return sudoku;
  }

  public copy(sudoku: Sudoku): Sudoku {
    let copy = [];
    for (let i = 0; i < 9; i++) {
      let row = [];
      for (let j = 0; j < 9; j++) {
        let col = sudoku[i][j];
        row.push(col);
      }
      copy.push(row);
    }
    return copy;
  }

  public conflict(sudoku: Sudoku): Conflict {
    let conflict: Conflict = {
      regs: [],
      rows: [],
      cols: []
    };
    for (let i = 0; i < 9; i++) {
      let regs = new Set<number>();
      let rows = new Set<number>();
      let cols = new Set<number>();
      for (let j = 0; j < 9; j++) {
        let r = this.toRow(i, j);
        let c = this.toCol(i, j);
        let reg = sudoku[r][c];
        if (reg) {
          if (regs.has(reg)) {
            conflict.regs.push(i);
            break;
          }
          regs.add(reg);
        }
      }
      for (let j = 0; j < 9; j++) {
        let row = sudoku[i][j];
        if (row) {
          if (rows.has(row)) {
            conflict.rows.push(i);
            break;
          }
          rows.add(row);
        }
      }
      for (let j = 0; j < 9; j++) {
        let col = sudoku[j][i];
        if (col) {
          if (cols.has(col)) {
            conflict.cols.push(i);
            break;
          }
          cols.add(col);
        }
      }
    }
    return conflict.regs.length || conflict.rows.length || conflict.cols.length ? conflict : null;
  }

  public toRow(reg: number, cel: number): number {
    return 3 * Math.floor(reg / 3) + Math.floor(cel / 3);
  }

  public toCol(reg: number, cel: number): number {
    return 3 * (reg % 3) + cel % 3;
  }

}
