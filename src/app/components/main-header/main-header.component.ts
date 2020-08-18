import { Component, OnInit, HostListener, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthCustomService } from '../../services/pages/auth.service';
import { User } from '../../basics/interfaces/user';
import { UsersService } from '../../services/pages/users.service';
import { WebsiteLanguagesService } from '../../services/helpers/website-languages.service';
import { SystemSettingsService } from '../../services/pages/system-settings.service';
import { Subscription } from 'rxjs';
import { HeaderButtonsService } from 'src/app/services/helpers/header-buttons.service';
import { HeaderButtonsSettings } from 'src/app/basics/interfaces/header-buttons-settings';
import { AnalyticsService } from '../../services/helpers/analytics.service';
import { SearchHistoriesService } from '../../services/pages/search-histories.service';

@Component({
  selector: 'main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss']
})
export class MainHeaderComponent implements OnInit, OnDestroy {
  user: User;
  role: string;
  selectedLanguage: string = 'en';
  preHeaderSettings: any;
  menuPages: any[];
  headerServiceSubscription: Subscription;
  headerButtonsSettings: HeaderButtonsSettings;
  isMobileView: boolean = false;

  constructor(private router: Router
              , private auth: AuthCustomService
              , public systemSettingsService: SystemSettingsService
              , public websiteLanguagesService: WebsiteLanguagesService
              , private userService: UsersService
              , private analytics: AnalyticsService
              , private searchHistoriesService: SearchHistoriesService
              , private headerButtonsService: HeaderButtonsService) {
			this.user = this.auth.getUser();
			this.role = this.auth.role();
			if(this.auth.getAuthorizationToken()) {
				this.updateUserRights();
			}

      this.auth.profileInfo$.subscribe(
      (user: any) => {
        this.user = user;
        this.role = this.auth.role();
        if(user){
          this.updateUserRights();
        }
      });

      this.websiteLanguagesService.selectedLanguage$.subscribe(
      (selectedLanguage: string) => {
        this.selectedLanguage = selectedLanguage;
      });
  }

  ngOnInit() {
    this.getWebsiteSettings();
    this.headerServiceSubscription = this.headerButtonsService.getActivePage().subscribe(value => {
      if(value) {
        this.headerButtonsSettings = value;
      } else {
        this.headerButtonsSettings = {};
      }
    });
		this.checkIsMobile();
  }

	getWebsiteSettings() {
		this.systemSettingsService.getWebsiteStructure().subscribe((response) => {
			if(response.result && response.result.custom_header) {
				this.preHeaderSettings = response.result.custom_header;
			}
			if(response.result && response.result.menu_pages) {
				this.menuPages = this.listToTree(response.result.menu_pages);
			}
    });
	}

  openStudyfinder() {
		this.router.navigate(['/studyfinder']);
  }

  selectLanguage(languageCode) {
		this.websiteLanguagesService.selectLanguage(languageCode);
  }

  updateUserRights() {
    this.userService.getUserRights().subscribe((data)=>{
      if(data.result.user !== null) {
        localStorage.setItem ('rights', JSON.stringify (data.result.rights));
        localStorage.setItem ('role', data.result.role);
        localStorage.setItem ('user', JSON.stringify (data.result.user));
      }
    });
  }

  checkIsMobile() {
    let width = window.innerWidth;
		this.isMobileView =  width < 960;
		return this.isMobileView;
  }

  ngOnDestroy() {
    this.headerServiceSubscription.unsubscribe();
  }

	listToTree(list) {
		let map = {}, node, roots = [], i;
		for (i = 0; i < list.length; i += 1) {
			map[list[i].id] = i;
			list[i].children = [];
		}
		for (i = 0; i < list.length; i += 1) {
			node = list[i];
			if (node.parent_id && list[map[node.parent_id]]) {
				list[map[node.parent_id]].children.push(node);
			} else {
				roots.push(node);
			}
		}
		return roots;
	}

	openWebsite(link) {
    if(this.headerButtonsSettings.programData) {
			this.analytics.triggerProgramEvent('websiteClick', (this.headerButtonsSettings.programData.id+'. '+this.headerButtonsSettings.programData.name), this.headerButtonsSettings.programData);
			if(this.role !== 'guest') {
				this.searchHistoriesService.updateCurrentSearchHistory({study_program_id: this.headerButtonsSettings.programData.id, website_visited: true}).subscribe((response) => {});
			}
    }
		window.open(link, '_blank');
	}

}
