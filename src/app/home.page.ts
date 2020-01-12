import {Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {AlertController, LoadingController} from '@ionic/angular';
import {HttpClient} from '@angular/common/http';
import {UtilityService} from './utility.service';
import {SolverService} from './solver.service';
import {CellComponent} from './cell.component';
import {Conflict, RowCol, Sudoku} from './types';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {

  @ViewChildren(CellComponent)
  public cells: QueryList<CellComponent>;

  public sudoku: Sudoku;

  public solution: Sudoku;

  public selected: RowCol;

  public conflict: Conflict;

  public constructor(public utility: UtilityService,
                     private loading: LoadingController,
                     private alert: AlertController,
                     private solver: SolverService,
                     private http: HttpClient) {
  }

  public ngOnInit(): void {
    this.reset();
  }

  public onSelect(rc: RowCol): void {
    if (this.solution)
      return;
    this.selected = rc;
    this.animate();
  }

  public onChange(value: number): void {
    if (!this.selected)
      return;
    let sudoku = this.utility.copy(this.sudoku);
    sudoku[this.selected.row][this.selected.col] = value;
    this.sudoku = sudoku;
    this.conflict = this.utility.conflict(this.sudoku);
    this.animate();
  }

  public async onSolve(): Promise<void> {
    if (this.conflict || this.solution)
      return;
    let loading = await this.loading.create({message: 'Please wait...'});
    await loading.present();
    await this.solve();
    await loading.dismiss();
  }

  public onReset(): void {
    this.reset();
  }

  private async solve(): Promise<void> {
    this.selected = null;
    try {
      this.solution = await this.solver.solve(this.sudoku);
      this.cells.forEach(cell => !this.sudoku[cell.row][cell.col] && cell.animate());
    } catch (e) {
      let alert = await this.alert.create({header: 'Oops', message: 'Something went wrong!'});
      await alert.present();
    }
  }

  private animate(): void {
    let cell = this.cells.find(cel => cel.row === this.selected.row && cel.col === this.selected.col);
    cell.animate();
  }

  private reset(): void {
    this.selected = null;
    this.solution = null;
    this.conflict = null;
    this.sudoku = this.utility.empty();
    this.http.get<any>('https://sugoku.herokuapp.com/board?difficulty=hard')
      .subscribe(res => this.sudoku = res.board);
  }

}
