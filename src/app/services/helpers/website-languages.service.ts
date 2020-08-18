import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/index';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { filter, map, switchMap } from 'rxjs/operators';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class WebsiteLanguagesService {

  selectedLanguage: string = 'en';
  systemAllLanguages: string[] = ['en', 'es'];
  parsedLanguages: any[] = [
    {code:'en', icon:'/assets/images/countries/britain.jpg'},
    {code:'es', icon:'/assets/images/countries/spain.jpg'}
  ];

  private languagesSource = new Subject<string>();
  selectedLanguage$ = this.languagesSource.asObservable();

  constructor(private router: Router, private route: ActivatedRoute, public translate: TranslateService, private location: Location) {
  }

  selectLanguage(selectedLanguage) {
    const urlLangPath = selectedLanguage == 'en' ? '' : '/' + selectedLanguage;
    let url = this.location.path().replace('/'+this.selectedLanguage, '');
    this.location.go(urlLangPath + url);
    this.saveLanguage(selectedLanguage);
  }

  saveLanguage(selectedLanguage) {
    this.translate.use(selectedLanguage);
    localStorage.setItem('language', selectedLanguage);
		this.selectedLanguage = selectedLanguage;
    this.languagesSource.next(selectedLanguage);
  }

  setUpWebsiteLanguage (routeLanguages) {
		let currentLanguages = routeLanguages ? routeLanguages : ['en'];
		this.setUpLanguages(currentLanguages);
  }

  setActiveLanguage(language) {
    const lang = this.systemAllLanguages.indexOf(language) == -1 ? 'en' : language;
		this.selectedLanguage = lang;
		this.languagesSource.next(lang);
  }

  setUpLanguages(currentLanguages) {
		this.parsedLanguages = this.parseLanguagesArray(currentLanguages);
  }

  parseLanguagesArray(languages) {
    if(typeof languages == 'object'){
      let parsedLanguages = [];
      languages.map((language)=>{
        if(language == 'en'){
          parsedLanguages.push({code:'en', icon:'/assets/images/countries/britain.jpg'});
        }
        if(language == 'es'){
          parsedLanguages.push({code:'es', icon:'/assets/images/countries/spain.jpg'});
        }
      });
      return parsedLanguages;
    } else {
      return [
        {
          code: 'en', icon:'/assets/images/countries/britain.jpg'
        }
      ]
    }
  }

}