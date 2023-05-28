import { BaseService } from 'src/app/services/base/base.service';
import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders
} from '@angular/common/http';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private base: BaseService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authReq = req.clone();
    return next.handle(authReq);
  }
}
