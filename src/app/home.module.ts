import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {RouterModule, Routes} from '@angular/router';
import {HomePage} from './home.page';
import {CellComponent} from './cell.component';
import {ToRowColPipe} from './to-row-col.pipe';
import {IsRowColPipe} from './is-row-col.pipe';

const routes: Routes = [
  {
    path: '',
    component: HomePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    HomePage,
    CellComponent,
    ToRowColPipe,
    IsRowColPipe
  ]
})
export class HomePageModule {
}
