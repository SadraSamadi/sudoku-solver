import {Pipe, PipeTransform} from '@angular/core';
import {UtilityService} from './utility.service';
import {Sudoku} from './types';

@Pipe({
  name: 'toRowCol'
})
export class ToRowColPipe implements PipeTransform {

  public constructor(private utilityService: UtilityService) {
  }

  public transform(sudoku: Sudoku, reg: number, cel: number): number {
    let row = this.utilityService.toRow(reg, cel);
    let col = this.utilityService.toCol(reg, cel);
    return sudoku && sudoku[row][col];
  }

}
