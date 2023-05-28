import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ExchangeComponent } from './exchange.component';

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: ExchangeComponent },
    ]),
    CommonModule,
  ],
})
export class ExchangeModule {}
