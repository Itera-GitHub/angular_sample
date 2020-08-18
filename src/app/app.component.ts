import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { UsersService } from './services/pages/users.service';
import { AnalyticsService } from './services/helpers/analytics.service';
import { AuthCustomService } from './services/pages/auth.service';
import { Meta } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { WebsiteLanguagesService } from './services/helpers/website-languages.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {
  data: any;
  loadingRoute: boolean;
  role: string;
  sessionInitialized: boolean = false;

  constructor(private route: ActivatedRoute
            , private analytics: AnalyticsService
            , private router: Router
            , private meta: Meta
            , private auth: AuthCustomService
            , public translate: TranslateService
            , public websiteLanguages: WebsiteLanguagesService
            , private userService: UsersService) {
    this.role = this.auth.role();
    if(this.auth.getUser()){
      this.userService.addSession().subscribe(()=>{
				this.sessionInitialized = true;
      });
      this.deleteOldStorageVariables();
    }
    this.translate.addLangs(['en', 'es']);
    this.translate.setDefaultLang('en');
  }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd){
        this.data = this.route.snapshot.firstChild.data;
        if(this.sessionInitialized && this.auth.getUser()) {
					this.userService.updatePagesSession().subscribe(() => {});
				}
				this.analytics.triggerPageChange();
				const selectedLanguage = this.data['selectedLanguage'] ? this.data['selectedLanguage'] : 'en';
				this.websiteLanguages.saveLanguage(selectedLanguage);

				this.websiteLanguages.setUpWebsiteLanguage(this.data['languages']);
			}
      if (event instanceof NavigationStart){
        this.saveStartUrl();
      }
    });
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(tag);
  }

  saveStartUrl() {
		localStorage.setItem('previousLocation', this.router.url);
  }

  deleteOldStorageVariables() {
    localStorage.removeItem('previousParPage');
  }
  
  onActivate(component) {
    if (component.clearWidgetOnActivate) {
      localStorage.removeItem('widgetParams');
    }
  }

}
