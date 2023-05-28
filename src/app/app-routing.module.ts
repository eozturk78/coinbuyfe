import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./components/exchange/exchange.module').then(
            (m) => m.ExchangeModule
          ),
      },
      {
        path: 'order/:orderId/:token',
        loadChildren: () =>
          import('./components/exchange/exchange.module').then(
            (m) => m.ExchangeModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
