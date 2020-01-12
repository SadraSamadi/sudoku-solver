export type Sudoku = number[][];

export interface RowCol {

  row: number;

  col: number;

}

export interface RegCel {

  reg: number;

  cel: number;

}

export interface Conflict {

  regs: number[];

  rows: number[];

  cols: number[];

}
