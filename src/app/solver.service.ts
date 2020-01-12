import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UtilityService} from './utility.service';
import {map} from 'rxjs/operators';
import {Sudoku} from './types';

@Injectable({
  providedIn: 'root'
})
export class SolverService {

  public constructor(private utility: UtilityService,
                     private http: HttpClient) {
  }

  public solve(sudoku: Sudoku): Promise<Sudoku> {
    return this.http.post<any>('https://sugoku.herokuapp.com/solve', {board: sudoku})
      .pipe(map(res => res.solution))
      .toPromise();
  }

}
