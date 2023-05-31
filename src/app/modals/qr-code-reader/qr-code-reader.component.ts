import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import {
  NgxScannerQrcodeComponent,
  ScannerQRCodeConfig,
} from 'ngx-scanner-qrcode';

import { EventEmitter } from 'stream';

@Component({
  selector: 'app-qr-code-reader',
  templateUrl: './qr-code-reader.component.html',
  styleUrls: ['./qr-code-reader.component.scss'],
})
export class QrCodeReaderComponent implements OnInit, AfterViewInit {
  @Output() data: any;
  @Output() onSaveEmit: EventEmitter | undefined;
  showQRcode = false;
  @ViewChild('action') action!: NgxScannerQrcodeComponent;

  public config: ScannerQRCodeConfig = {
    // fps: 1000,
    vibrate: 0,
    isBeep: false,
    // decode: 'macintosh',
    constraints: {
      video: {
        width: window.innerWidth, // https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia
      },
    },
  };

  constructor(private modalService: BsModalService) {}
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.action.devices.subscribe((x: any) => {
        if (x.length > 1) {
          this.action.playDevice(x[1].deviceId);
        }
      });
      // @ts-ignore
      document.getElementById("qrCode")?.style.display = "block";
      // @ts-ignore
      document.getElementById("description")?.style.display = "none";


    }, 2000);
  }
  ngOnInit(): void {
    document.getElementById('btn')?.click();
  }

  onReady() {
    document.getElementById('btn')?.click();
    this.modalService.hide();
    this.onGetData(this.action.data.value[0].value);
  }

  onGetData(data: any) {
    this.onSaveEmit?.emit(data);
    this.modalService.hide();
  }

  onClose() {
    document.getElementById('btn')?.click();
    this.modalService.hide();
  }
}
