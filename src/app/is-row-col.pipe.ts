import {Pipe, PipeTransform} from '@angular/core';
import {UtilityService} from './utility.service';
import {RowCol} from './types';

@Pipe({
  name: 'isRowCol'
})
export class IsRowColPipe implements PipeTransform {

  public constructor(private utilityService: UtilityService) {
  }

  public transform(rc: RowCol, reg: number, cel: number): boolean {
    if (!rc)
      return false;
    let row = this.utilityService.toRow(reg, cel);
    let col = this.utilityService.toCol(reg, cel);
    return rc.row === row && rc.col === col;
  }

}
