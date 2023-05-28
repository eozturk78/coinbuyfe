import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { createNumberMask } from 'text-mask-addons';

@Component({
  selector: 'app-combobox',
  templateUrl: './combobox.component.html',
  styleUrls: ['./combobox.component.scss'],
})
export class ComboboxComponent implements OnInit {
  @Input() data: Array<any> | undefined;
  @Input() isAmountDisabled?: boolean;
  @Input() result: any;
  @Input() resultAmount: number | undefined;
  @Input() defaultItem: any | undefined;
  @Input() defaultValue: any | undefined;

  @Output() onEmitChooseItem = new EventEmitter();
  @Output() onCompletedEnterAmount = new EventEmitter();
  @Output() onFocusInput = new EventEmitter();

  @ViewChild('amountElement') amountElement?: ElementRef;
  @ViewChild('searchElement') searchElement?: ElementRef;

  chosenItem: any;
  isOpenList: boolean = false;
  searchText?: string;
  amount?: number;

  moneyMaskSettings = createNumberMask({
    prefix: '',
    suffix: '',
    decimalLimit: 40,
    thousandsSeparatorSymbol: '',
    decimalSymbol: '.',
    allowDecimal: true,
    allowNegative: true,
  });

  constructor(private eRef: ElementRef) {}

  @HostListener('document:click', ['$event'])
  clickout(event: any) {
    if (event.target.tagName.toString().toLowerCase() != 'input')
      if (this.eRef.nativeElement.contains(event.target)) {
        this.isOpenList = true;
        setTimeout(() => {
          this.searchElement?.nativeElement.focus();
        });
      } else {
        this.isOpenList = false;
      }
  }

  ngOnInit(): void {
    this.chosenItem = this.defaultItem;
    if (this.defaultValue != null) {
      this.resultAmount = this.defaultValue;
      this.onChangeAmunt();
    }
  }

  onChooseItem(item: any) {
    this.isOpenList = false;
    this.onEmitChooseItem.emit(item);
    setTimeout(() => {
      this.amountElement?.nativeElement.focus();
    });
    this.chosenItem = item;
  }

  onOpenList() {
    //this.isOpenList = true;
  }

  onSearchItem() {
    return this.searchText != null && this.searchText?.length > 0
      ? this.data
          ?.filter(
            (x: any) =>
              x.name
                .toLocaleLowerCase()
                .indexOf(this.searchText?.toLocaleLowerCase()) > -1 ||
              x.code
                .toLocaleLowerCase()
                .indexOf(this.searchText?.toLocaleLowerCase()) > -1
          )
          .sort((a, b) => b.priority - a.priority)
      : this.data?.sort((a, b) => b.priority - a.priority);
  }

  onChangeAmunt() {
    setTimeout(() => {
      this.onCompletedEnterAmount.emit(this.amountElement?.nativeElement.value);
    }, 1000);
  }

  onFocus() {
    this.onFocusInput.emit(true);
  }
  onBlur() {
    this.onFocusInput.emit(false);
  }
}
