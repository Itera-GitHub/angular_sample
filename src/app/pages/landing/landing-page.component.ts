import { Component, OnInit, ViewChild, OnDestroy, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { MetaService } from '../../services/helpers/meta.service';
import { AnalyticsService } from '../../services/helpers/analytics.service';
import { StudyFinderWidgetComponent } from '../../components/study-finder-widget/study-finder-widget.component';
import { JsonLdService } from '../../services/helpers/json-ld.service';
import { citiesList } from './cities';
import { HeaderButtonsService } from 'src/app/services/helpers/header-buttons.service';
import { bannersList } from 'src/app/basics/data/banner';
import { SystemSettingsService } from '../../services/pages/system-settings.service';
import { WebsiteLanguagesService } from '../../services/helpers/website-languages.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingPageComponent  implements OnInit, OnDestroy {

  productLD;
  banners: any[] = bannersList;
  cities: any[] = citiesList;

  landingData: any = {
    cities_count: 0,
    study_programs_count: 1600,
    universities_count: 0,
    no_tuitions_percent: '',
    freebie_link: '',
    more_articles: [],
  };
	sub: any;
  isLoading: boolean = true;
  metaTagAdded: boolean = false;

  @ViewChild(StudyFinderWidgetComponent) finderWidget: StudyFinderWidgetComponent;

  constructor(private router: Router
              , private jsonLd: JsonLdService
              , private analytics: AnalyticsService
              , private headerButtonService: HeaderButtonsService
              , private systemSettingsService: SystemSettingsService
              , private websiteLanguageService: WebsiteLanguagesService
              , private meta: MetaService) {
    this.productLD = this.jsonLd.productLd;

		this.sub = this.websiteLanguageService.selectedLanguage$.subscribe(
			(selectedLanguage: string) => {
				this.getLandingData();
			});
  }

  ngOnDestroy() {
    this.headerButtonService.setPage(null);
    this.sub.unsubscribe();
  }

  ngOnInit() {
  }

  openWithNoTuition() {
		this.router.navigate(['/studyfinder'], {queryParams: {p: 1, pp: 20, sort: 'application_deadline', dir: 'ASC', t: 0}});
	}

  getLandingData(params: any = {}){
    this.systemSettingsService.getLandingData({params: {language: this.websiteLanguageService.selectedLanguage}}).subscribe((response: any) => {
      this.landingData = response.result;
			this.isLoading = false;
    });
  }

  sendAnalytics(data) {
		this.analytics.triggerEvent({
			event: 'homepageClick',
			action: data.action,
			label: data.label || 'Interaction with Homepage',
		});
  }

  navigateToResults(data) {
		this.analytics.triggerEvent({
			event: 'homepageClick',
			action: 'See Results click',
			label: 'Interaction with Homepage',
		});
		this.router.navigate(['/studyfinder'], {queryParams: this.finderWidget.generateMinifiedParams()});
  }

  getQueryParamsForWidget(e) {
    let params = this.finderWidget.getFormData();
    this.finderWidget.getStudyProgramsCount(params);
  }

}
