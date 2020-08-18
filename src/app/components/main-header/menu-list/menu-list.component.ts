import { Component, Input, DoCheck } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.scss']
})
export class MenuListComponent implements DoCheck {

  url: string = window.location.href;
  _menuPages: any;
  @Input() set menuPages(menuPages) {
    if(menuPages) {
			this._menuPages = menuPages.filter(page => !page.side_menu_only);
		}
  };
  @Input() role: string;
  @Input() user: any;

  constructor(private router: Router) {
  }

  ngDoCheck() {
    this.url = this.router.url.split('?')[0].split('#')[0];
  }

  isActiveMenuItem(url) {
    return this.url.includes(url);
  }

  isActiveSubMenuItem(subUrls) {
    if(!subUrls) return false;
    let urls = [];
    subUrls.forEach((item) => {
      urls.push(item.url);
    });

    return urls.some(url => this.url.includes(url));
  }

}
