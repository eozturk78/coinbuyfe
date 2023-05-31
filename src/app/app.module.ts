import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ExchangeComponent } from './components/exchange/exchange.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { ComboboxComponent } from './helpers/combobox/combobox.component';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AuthInterceptor } from './services/http/auth-interceptor';
import { HttpErrorHandler } from './services/http/http-error-handler.service';
import { HttpServiceService } from './services/http/http-service.service';
import { FormsModule } from '@angular/forms';
import { QrCodeReaderComponent } from './modals/qr-code-reader/qr-code-reader.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgxScannerQrcodeModule } from 'ngx-scanner-qrcode';


@NgModule({
  declarations: [
    AppComponent,
    ExchangeComponent,
    MainLayoutComponent,
    ComboboxComponent,
    QrCodeReaderComponent
  ],
  imports: [
    BrowserModule,
    ModalModule,
    HttpClientModule,
    NgxScannerQrcodeModule,
    ModalModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    FormsModule,
    AppRoutingModule,
  ],
  providers: [
    HttpServiceService,
    HttpErrorHandler,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}
