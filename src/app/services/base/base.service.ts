import { Injectable, ElementRef } from '@angular/core';
import { LocalstorageService } from '../local-storage-service/storage-service.service';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';

@Injectable({
  providedIn: 'root',
})
export class BaseService {
  publicTable: ElementRef | undefined;
  public isError = false;
  public errorMessage: string[] = [];
  public successMessage: string[] = [];
  private localstorageService = new LocalstorageService();
  page = 1;
  constructor() {}

  public baseUrl = 'https://api.coinbuy.com.tr/public';

  public dateFormat = 'dd.MM.yyyy';
  public dateTimeFormat = 'dd.MM.yyyy HH:mm';
  // -- Double number
  doubleNumberMaskSettings = createNumberMask({
    prefix: '',
    suffix: '',
    thousandsSeparatorSymbol: '',
    decimalLimit: 4,
    allowDecimal: true,
    allowNegative: false,
  });
  public doubleNumber = this.doubleNumberMaskSettings;

  /*parseDateToModel(date: string): NgbDate {
    let dateArray = date.split('-');
    let dateResult: NgbDate = {
      year: parseInt(dateArray[0]),
      month: parseInt(dateArray[1]),
      day: parseInt(dateArray[2]),
      equals: function (other?: NgbDateStruct | null | undefined): boolean {
        throw new Error('Function not implemented.');
      },
      before: function (other?: NgbDateStruct | null | undefined): boolean {
        throw new Error('Function not implemented.');
      },
      after: function (other?: NgbDateStruct | null | undefined): boolean {
        throw new Error('Function not implemented.');
      },
    };
    return dateResult;
  }*/

  parseDateToString(date: Date): string {
    const year = date.getFullYear();
    const day =
      date.getDate().toString().length == 1
        ? '0' + date.getDate()
        : date.getDate();
    const month =
      date.getMonth().toString().length == 1
        ? '0' + (date.getMonth() + 1)
        : date.getMonth() + 1;
    let dateResult: string = day + '/' + month + '/' + year;
    return dateResult;
  }

  parseGetTimeFromDate(date: string): string {
    let dateArray = [];
    if (date.indexOf('T') != -1) dateArray = date.split('T');
    else dateArray = date.split(' ');
    let resultTimeString = dateArray[1].toString().substring(0, 5);
    return resultTimeString;
  }

  /*parseDate(date?: NgbDate): string {
    if (date == null) return '';
    const year = date.year;
    const day = date.day.toString().length == 1 ? '0' + date.day : date.day;
    const month =
      date.month.toString().length == 1 ? '0' + date.month : date.month;
    return `${year}-${month}-${day}`;
  }*/


  // -- Set Data From Local Storage
  setTokenToStorage(token: any) {
    if (token != null) this.localstorageService.setItem('token', token);
  }

  addMinutesToDate(date: Date, minutes: number) {
    return new Date(date.getTime() + minutes * 60000);
  }

  // -- Set Data From Local Storage
  setHandleStorageData(key: any, value: any) {
    this.localstorageService.setItem(key, value);
  }

  // -- Get Data From Local Storage
  getHandleStorageData(key: any) {
    return this.localstorageService.getItem(key) ?? '';
  }

  // -- Get Data From Local Storage
  deleteHandleStorageData(key: any) {
    return this.localstorageService.removeItem(key);
  }

  prepareMobileTable(table?: ElementRef) {
    const tableEl = table?.nativeElement;
    if (tableEl != null) {
      const thEls = tableEl.querySelectorAll('thead th');
      const tdLabels = Array.from(thEls).map((el: any) => el.innerText);
      tableEl.querySelectorAll('tbody tr').forEach((tr: any) => {
        Array.from(tr.children).forEach((td: any, ndx) => {
          td.setAttribute('label', tdLabels[ndx]);
        });
      });
    }
  }

  makeRandom(lengthOfCode: number) {
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
    let text = '';
    for (let i = 0; i < lengthOfCode; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text.toLocaleLowerCase();
  }

  getBaseName(text: String){
    return text.substring(text.lastIndexOf('/')+1);
  }
}
