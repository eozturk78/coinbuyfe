import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Injectable, ViewChild, ElementRef } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { HandleError, HttpErrorHandler } from './http-error-handler.service';
import { map, tap } from 'rxjs/operators';
import { BaseService } from '../base/base.service';

@Injectable({
  providedIn: 'root',
})
export class HttpServiceService {
  handleError: HandleError;
  public baseUrl = this.base.baseUrl;

  @ViewChild('errorMessage') errorMessage!: ElementRef<HTMLDivElement>;

  constructor(
    private http: HttpClient,
    private base: BaseService,
    private httpErrorHandler: HttpErrorHandler
  ) {
    this.handleError = httpErrorHandler.createHandleError('HeroesService');
  }

  post<T>(url: string, params?: any, header?: HttpHeaders): Observable<T> {
    return this.http
      .post<T>(`${this.baseUrl}/${url}`, params, {
        headers: header,
        observe: 'response',
      })
      .pipe(
        map((data: any) => {
          this.base.errorMessage = [];
          this.base.setTokenToStorage(data?.headers?.get('Token'));
          return data.body;
        }),
        catchError(this.handleError<T>(url))
      );
  }

  get<T>(url: string, header?: HttpHeaders): Observable<T> {
    return this.http
      .get<T>(`${this.baseUrl}/${url}`, {
        headers: header,
        observe: 'response',
      })
      .pipe(
        map((data: any) => {
          this.base.errorMessage = [];
          if (data?.errors?.length > 0)
            this.base.errorMessage.push(data.message);
          this.base.setTokenToStorage(data?.headers?.get('Token'));
          return data.body;
        }),
        catchError(this.handleError<T>(url))
      );
  }

  delete<T>(url: string, id?: string): Observable<T> {
    return this.http
      .delete<T>(`${this.baseUrl}/${url}`, { observe: 'response' })
      .pipe(
        map((data: any) => {
          this.base.errorMessage = [];
          this.base.setTokenToStorage(data?.headers?.get('Token'));
          return data.body;
        }),
        catchError(this.handleError<T>(url))
      );
  }
}
