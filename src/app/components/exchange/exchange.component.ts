import { QrCodeReaderComponent } from './../../modals/qr-code-reader/qr-code-reader.component';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QRCodeComponent } from 'angularx-qrcode';
import { BsModalService } from 'ngx-bootstrap/modal';
import { CoinbuyApiService } from 'src/app/services/coinbuy-api/coinbuy-api.service';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';
import { Result } from '@zxing/library';

@Component({
  selector: 'app-exchange',
  templateUrl: './exchange.component.html',
  styleUrls: ['./exchange.component.scss'],
})
export class ExchangeComponent implements OnInit {
  constructor(
    private coinBuyService: CoinbuyApiService,
    private router: ActivatedRoute,
    private modalService: BsModalService
  ) {
    this.orderId = this.router.snapshot.params['orderId'];
    this.token = this.router.snapshot.params['token'];
  }

  data!: Array<any>;
  sendChosenItem!: any;
  receiveChosenItem!: any;
  amount?: number;
  result: any;
  destination: any;
  orderType?: string = 'float';
  exchangeInfo?: any;
  orderId?: string;
  token?: string;
  sendFromCurrency: any;
  sendToCurrency: any;
  expirationDate: any;
  startToSendEP = false;
  output: string = '';
  qrData: any;
  ngOnInit(): void {
    if (this.orderId != null && this.token != null) {
      this.coinBuyService
        .getOrder(this.orderId, this.token)
        .subscribe((exchangeInfo: any) => {
          this.exchangeInfo = exchangeInfo;
          console.log(JSON.stringify(exchangeInfo));
          this.getCurrencyList();
          this.findTime();
        });
      this.getQrCode();
    } else {
      this.getCurrencyList();
    }
  }
  getCurrencyList() {
    this.coinBuyService.getcurrencylist().subscribe((currencyList: any) => {
      this.data = currencyList;
      if (this.exchangeInfo != null) {
        this.sendFromCurrency = this.data.filter(
          (x: any) => x.code == this.exchangeInfo.from.code
        )[0];
        this.sendToCurrency = this.data.filter(
          (x: any) => x.code == this.exchangeInfo.to.code
        )[0];
      } else {
        this.sendChosenItem = this.data.filter((x) => x.code == 'USDT')[0];

        this.receiveChosenItem = this.data.filter((x) => x.code == 'BTC')[0];
      }
    });
  }
  qrInfo: any;
  getQrCode() {
    this.coinBuyService
      .qrcode(this.orderId, this.token)
      .subscribe((qrInfo: any) => {
        this.qrInfo = qrInfo;
      });
  }

  getDataDiff(startDate: any, endDate: any) {
    var diff = endDate.getTime() - startDate.getTime();
    var days = Math.floor(diff / (60 * 60 * 24 * 1000));
    var hours = Math.floor(diff / (60 * 60 * 1000)) - days * 24;
    var minutes =
      Math.floor(diff / (60 * 1000)) - (days * 24 * 60 + hours * 60);
    var seconds =
      Math.floor(diff / 1000) -
      (days * 24 * 60 * 60 + hours * 60 * 60 + minutes * 60);
    return { day: days, hour: hours, minute: minutes, second: seconds };
  }
  onSendChooseItem(item: any) {
    this.sendChosenItem = item;
    this.onFindPrice();
  }
  onReceiveChooseItem(item: any) {
    this.receiveChosenItem = item;
    this.onFindPrice();
  }
  onCompleteEnterAmount(amount: number) {
    this.amount = amount;
    this.onFindPrice();
  }
  createdDate: any;
  onFindPrice() {
    console.log(this.amount);
    if (
      this.sendChosenItem != null &&
      this.receiveChosenItem != null &&
      this.amount != null &&
      this.amount?.toString().length > 0
    ) {
      const params = {
        fromCcy: this.sendChosenItem.code,
        toCcy: this.receiveChosenItem.code,
        amount: this.amount,
        type: this.orderType,
      };
      this.coinBuyService.price(params).subscribe((x) => {
        console.log(JSON.stringify(x));
        this.result = x;
      });
    }
  }
  onChangeOrderType(orderType: string) {
    this.orderType = orderType;
    this.onFindPrice();
  }

  onCreate() {
    if (
      this.sendChosenItem != null &&
      this.receiveChosenItem != null &&
      this.amount != null &&
      this.destination != null
    ) {
      const params = {
        fromCcy: this.sendChosenItem.code,
        toCcy: this.receiveChosenItem.code,
        amount: this.amount,
        type: this.orderType,
        destination: this.destination,
      };
      this.startToSendEP = true;
      this.coinBuyService.create(params).subscribe((exchangeInfo: any) => {
        this.startToSendEP = false;
        this.exchangeInfo = exchangeInfo;
        this.orderId = exchangeInfo.id;
        this.token = exchangeInfo.token;
        this.getQrCode();
        this.findTime();
        this.sendFromCurrency = this.data.filter(
          (x: any) => x.code == this.exchangeInfo.from.code
        )[0];
        this.sendToCurrency = this.data.filter(
          (x: any) => x.code == this.exchangeInfo.to.code
        )[0];
      });
    }
  }

  onNewExchange() {
    this.exchangeInfo = null;
  }
  copiedType?: number;
  onCopy(copiedText: string, copiedType: number) {
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = copiedText;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    this.copiedType = copiedType;
    setTimeout(() => {
      this.copiedType = 0;
    }, 1000);
  }

  time: string = '';
  findTime() {
    setInterval(() => {
      this.createdDate = new Date(this.exchangeInfo.time.update * 1000);
      var date2 = new Date(this.exchangeInfo.time.expiration * 1000);
      var diff = this.getDataDiff(new Date(), date2);
      var second =
        diff.second.toString().length > 1 ? diff.second : '0' + diff.second;
      var minute =
        diff.minute.toString().length > 1 ? diff.minute : '0' + diff.minute;
      this.time = minute + ':' + second;
    }, 1000);
  }

  onCheck(qrcode: any) {
    this.qrInfo.forEach((element: any) => {
      element.checked = false;
    });
    qrcode.checked = true;
  }
  isFocusedInput: boolean = false;
  onFocusInput(isFocused: boolean) {
    this.isFocusedInput = isFocused;
  }

  isFocused2Input: boolean = false;
  onFocus2Input(isFocused: boolean) {
    this.isFocusedInput = isFocused;
  }
  onPaste() {
    navigator['clipboard'].readText().then((clipText) => {
      // do something with copied text here
      this.destination = clipText;
    });
  }
  onOpenModal() {
    this.modalService.show(QrCodeReaderComponent, {
      ariaLabelledBy: 'modal-basic-title',
      class: 'mdl-small-size',
      backdrop: 'static',
      keyboard: true,
      initialState: {
        onGetData: (data: any) => {
          this.destination = data;
          this.modalService.hide();
        },
      },
    });
  }

  onGetData(data: any) {
    this.destination = data[0].value;
  }
}
