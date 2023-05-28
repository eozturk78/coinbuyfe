import {
  ElementRef,
  Injectable,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { BaseService } from '../base/base.service';

/** Type of the handleError function returned by HttpErrorHandler.createHandleError */
export type HandleError = <T>(
  operation?: string,
  result?: T
) => (error: HttpErrorResponse) => Observable<T>;

/** Handles HttpClient errors */
@Injectable()
export class HttpErrorHandler {
  constructor(private base: BaseService) {}

  @ViewChild('appError') target: ElementRef | undefined;

  /** Create curried handleError function that already knows the service name */
  createHandleError =
    (serviceName = '') =>
    <T>(operation = 'operation', result = {} as T) =>
      this.handleError(serviceName, operation, result);

  /**
   * Returns a function that handles Http operation failures.
   * This error handler lets the app continue to run as if no error occurred.
   *
   * @param serviceName = name of the data service that attempted the operation
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  handleError<T>(serviceName = '', operation = 'operation', result = {} as T) {
    return (error: HttpErrorResponse): Observable<T> => {
      if (error.status == 401) {
        this.base.setHandleStorageData('token', null);
        window.location.href = '/';
      }
      var message = '';
      try {
        message = error.error.message;
        console.log(error)
        this.base.successMessage = [];
        this.base.isError = true;
        this.base.errorMessage.push(message);
        alert(message)
      } catch {
        message = 'Something went wrong';
        this.base.errorMessage.push(message);
      }
      // console.log(error);
      // @ts-ignore
      //this.target?.nativeElement?.style.display = 'block';
      // console.log(result);
      throw Error(message);
      //return of(result);
    };
  }
}
