import { AfterViewInit, Component, OnInit, Inject, PLATFORM_ID, OnDestroy } from '@angular/core';
import { CountdownService } from 'src/app/services/helpers/countdown.service';
import { WebinarFaqsService } from 'src/app/services/pages/webinar-faqs.service';
import { WebinarFaq } from 'src/app/basics/interfaces/webinar-faq';
import { WebinarsService } from 'src/app/services/pages/webinars.service';
import { Webinar } from 'src/app/basics/interfaces/webinar';
import { MetaService } from 'src/app/services/helpers/meta.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { WebinarHost } from '../../basics/interfaces/webinar-host';
import * as moment from 'moment';
import { languages } from '../../basics/data/languages';
import { WebsiteLanguagesService } from '../../services/helpers/website-languages.service';
import { ToastService } from '../../services/helpers/toast.service';
import * as momentTz from 'moment-timezone';
import {isPlatformBrowser} from "@angular/common";

@Component({
  selector: 'app-webinar-page',
  templateUrl: './webinar-page.component.html',
  styleUrls: ['./webinar-page.component.scss'],
	providers: [CountdownService]
})
export class WebinarPageComponent implements AfterViewInit, OnInit, OnDestroy {

  languages: any = languages;
  webinarData: Webinar;
  webinarIsActive: boolean = true;
  mainHost: WebinarHost;
  time: any;
  faqs: WebinarFaq[] = [];
  blocksData: any[] = [];
  userDate: any;
	navigationSubscription: any;
	subscription: any;
  userTimezone: string;
	languageCode: string = '';
  isLoading: boolean = true;
  constructor(private countdownService: CountdownService
            , private route: ActivatedRoute
            , private router: Router
            , private toast: ToastService
		        , private languagesService: WebsiteLanguagesService
            , private webinarFaqsService: WebinarFaqsService
            , private webinarService: WebinarsService
            , private metaService: MetaService
            , @Inject(PLATFORM_ID) private platformId: Object) {
		this.initializeWebinar();
	}

  ngOnInit() {

  }

  ngOnDestroy() {
		if(this.navigationSubscription) {
			this.navigationSubscription.unsubscribe();
		}
  }

  initializeWebinar() {
		this.isLoading = true;
		let id = +this.route.snapshot.paramMap.get ('id');
		this.userTimezone = moment.tz.guess();
		this.getWebinarData(id, true);
		this.time = this.countdownService.updatedTimeValue;
	}

  ngAfterViewInit() {
  
  }

  getWebinarData(id, initialLoad = false) {
		if(initialLoad) {
			this.languageCode = this.route.snapshot.paramMap.get('language') || 'en';
		}
    this.webinarService.getDetailedData(id, {language: this.languageCode}).subscribe((response:any) => {
      if(response.ok === false) {
        this.router.navigate(['/']);
      } else {
				this.webinarData = response.result.webinar;

				this.setTime();

				this.webinarIsActive = response.result.is_active;
				if(!this.webinarData) {
					this.isLoading = false;
					this.navigationSubscription = this.router.events.subscribe((e: any) => {
						if (e instanceof NavigationEnd) {
							this.initializeWebinar();
						}
					});
					return;
				}

				this.languagesService.setUpLanguages(this.webinarData.active_languages);
				this.languagesService.setActiveLanguage(this.languageCode);
				this.languagesService.saveLanguage(this.languageCode);
				if(initialLoad) {
					this.subscribeLanguageChange();
				}
				this.mainHost = this.webinarData.hosts.filter(host => host.is_main_host)[0];
				this.metaService.setMetaInformation(this.webinarData.meta_title, this.webinarData.meta_description);

				this.getFaqs();
      }
    });
  }

  setTime() {
		let webinarDate = new Date(this.webinarData.datetime.replace(/-/g, "/"));
		this.userDate = moment(webinarDate).format('dddd, DD MMMM YYYY, hh:mm A');
		if(isPlatformBrowser(this.platformId)) {
			let userLocalDate = momentTz(webinarDate).tz(this.userTimezone);
			this.countdownService.startCounting(userLocalDate);
			this.userDate = userLocalDate.format('dddd, DD MMMM YYYY, hh:mm A');
		}
	}

	subscribeLanguageChange() {
		this.subscription = this.languagesService.selectedLanguage$.subscribe(
			(selectedLanguage: string) => {
				if(this.languageCode != selectedLanguage) {
					this.languageCode = selectedLanguage;
					this.getWebinarData(this.webinarData.id);
				}
			});
	}

  getFaqs() {
    return this.webinarFaqsService.getData({params: {language: this.languagesService.selectedLanguage}}).subscribe((response:any) => {
      this.faqs = response.data;
      this.isLoading = false;
    });
  }

  register() {
		this.isLoading = true;
  	this.webinarService.registerOnWebinar(this.webinarData.id).subscribe((response: any) => {
			this.isLoading = false;
  		if(response.ok === false){
			} else {
  			this.toast.showSuccess('Successfully registered!');
  			this.router.navigate(['/webinar-thank-you/'+this.webinarData.id+'/'+response.result.registrant.zoom_registrant_id]);
			}
		});
	}

}
