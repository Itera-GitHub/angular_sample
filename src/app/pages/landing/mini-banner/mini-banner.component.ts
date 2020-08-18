import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-mini-banner',
  templateUrl: './mini-banner.component.html',
  styleUrls: ['./mini-banner.component.scss']
})
export class MiniBannerComponent {

  @Input() title: string;
  @Input() banner: any;
  constructor() {
  }
}
