import { Component, OnInit, Input } from '@angular/core';
import { WebinarHost } from '../../../../basics/interfaces/webinar-host';
import { countries } from '../../../../basics/data/countries';

@Component({
  selector: 'app-host',
  templateUrl: './host.component.html',
  styleUrls: ['./host.component.scss']
})
export class HostComponent implements OnInit {
  @Input() set host(host: WebinarHost){
    if(host) {
      this._host = host;
      this.getCountryImage();
    }
  };
  _host: WebinarHost;
  countryImage: string;
  countries: any = countries;

  constructor() { }

  ngOnInit(): void {
  }

  getCountryImage() {
    if(this.countries[this._host.country]) {
      this.countryImage = this.countries[this._host.country];
    }
  }

}
