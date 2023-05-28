import { Injectable } from '@angular/core';
import { HttpServiceService } from '../http/http-service.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CoinbuyApiService {
  constructor(
    private httpService: HttpServiceService,
    private http: HttpClient
  ) {}

  private baseUrl = 'api';

  getcurrencylist() {
    return this.httpService.get(`${this.baseUrl}/getcurrencylist`);
  }

  price(params: any) {
    return this.httpService.post(`${this.baseUrl}/price`, params);
  }

  create(params: any) {
    return this.httpService.post(`${this.baseUrl}/create`, params);
  }

  getOrder(orderId: string, token: string) {
    return this.httpService.get(`${this.baseUrl}/order?orderId=${orderId}&token=${token}`);
  }



  qrcode(orderId?: string, token?: string) {
    return this.httpService.get(`${this.baseUrl}/qrcode?orderId=${orderId}&token=${token}`);
  }
}
