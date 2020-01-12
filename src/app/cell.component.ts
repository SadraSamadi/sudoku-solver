import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {UtilityService} from './utility.service';
import {Conflict, RowCol, Sudoku} from './types';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss']
})
export class CellComponent implements OnInit {

  @ViewChild('container', {static: true})
  public containerRef: ElementRef<HTMLDivElement>;

  @Input()
  public sudoku: Sudoku;

  @Input()
  public solution: Sudoku;

  @Input()
  public reg: number;

  @Input()
  public cel: number;

  @Input()
  public selected: RowCol;

  @Input()
  public conflict: Conflict;

  @Output()
  public select = new EventEmitter<RowCol>();

  public get row(): number {
    return this.utility.toRow(this.reg, this.cel);
  }

  public get col(): number {
    return this.utility.toCol(this.reg, this.cel);
  }

  public get sudokuValue(): number {
    return this.sudoku[this.row][this.col];
  }

  public get solutionValue(): number {
    return this.solution && this.solution[this.row][this.col];
  }

  public get isSelected(): boolean {
    return this.selected && this.selected.row === this.row && this.selected.col === this.col;
  }

  public get hasConflict(): boolean {
    if (!this.conflict)
      return false;
    return this.conflict.regs.includes(this.reg) || this.conflict.rows.includes(this.row) || this.conflict.cols.includes(this.col);
  }

  public constructor(private utility: UtilityService) {
  }

  public ngOnInit(): void {
  }

  public animate(): void {
    let container = this.containerRef.nativeElement;
    let classes = ['animated', 'bounceIn', 'fast'];
    container.onanimationend = () => container.classList.remove(...classes);
    container.classList.add(...classes);
  }

  public onSelect(): void {
    this.select.emit({row: this.row, col: this.col});
  }

}
