
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { BaseService } from 'src/app/services/base/base.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
})
export class MainLayoutComponent implements OnInit {

  constructor(
    private base: BaseService
  ) {}

  ngOnInit(): void {
  }
  onLogOut() {
  }

  onMobileOpenMenu() {
  }
  onWebOpenMenu() {
  }
}
