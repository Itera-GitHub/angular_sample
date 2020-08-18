import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LandingPageRoutingModule } from "./landing-page-routing.module";
import { ComponentsModule } from "src/app/components/components.module";
import { MaterialModule } from "src/app/material.module";
import { LandingPageComponent } from './landing-page.component';
import { StudyFinderWidgetModule } from '../../components/study-finder-widget/study-finder-widget.module';
import { FooterComponent } from './landing-footer/footer.component';
import { CarouselItemComponent } from './carousel-item/carousel-item.component';
import { MiniBannerComponent } from './mini-banner/mini-banner.component';
import { CarouselComponent } from './carousel/carousel.component';
import { CarouselDirective } from './carousel.directive';
import { SignupBlockComponent } from './signup-block/signup-block.component';
import { CloudinaryModule } from '@cloudinary/angular-5.x';
import { Cloudinary as CloudinaryCore } from 'cloudinary-core';
import { RECAPTCHA_SETTINGS, RecaptchaFormsModule, RecaptchaModule, RecaptchaSettings } from 'ng-recaptcha';
import { LockedModalWindowModule } from '../../components/locked-modal-window/locked-modal-window.module';
import { NewsArticlesModule } from '../../components/news-articles/news-articles.module';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { makeStateKey, StateKey, TransferState } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { Observable } from 'rxjs/Observable';

export function httpTranslateLoader(transferState: TransferState, http: HttpClient) {
	return new TranslateBrowserLoader(transferState, http);
}

export const cloudinaryLib = {
	Cloudinary: CloudinaryCore
};

@NgModule({
  imports: [
    CommonModule,
    LandingPageRoutingModule,
    ComponentsModule,
    MaterialModule,
		StudyFinderWidgetModule,
		RecaptchaModule,
		RecaptchaFormsModule,
		LockedModalWindowModule,
		NewsArticlesModule,
		LazyLoadImageModule,
		ReactiveFormsModule,
		FormsModule,
		TranslateModule.forChild({
			loader: {
				provide: TranslateLoader,
				useFactory: httpTranslateLoader,
				deps: [TransferState, HttpClient]
			}
		}),
		CloudinaryModule.forRoot(cloudinaryLib, { cloud_name: 'name'}),
  ],
  declarations: [
		LandingPageComponent,
		FooterComponent,
		CarouselComponent,
		CarouselDirective,
		CarouselItemComponent,
		MiniBannerComponent,
		SignupBlockComponent,
  ],
  providers: [
		{
			provide: RECAPTCHA_SETTINGS,
			useValue: { siteKey: '6Le-eawUAAAAAHwVQ1IRveYJ32aw-nf-IQochESN' } as RecaptchaSettings,
		},
  ]
})
export class LandingPageModule {}

export class TranslateBrowserLoader implements TranslateLoader {
	constructor(private transferState: TransferState, private http: HttpClient) {
	}

	public getTranslation(lang: string): Observable<any> {
		const key: StateKey<number> = makeStateKey<number>('transfer-translate-'+lang);
		const storedResponse = this.transferState.get<any>(key, null);
		if(storedResponse) {
			return Observable.create(observer => {
				observer.next(storedResponse);
				observer.complete();
			});
		} else {
			return new TranslateHttpLoader(this.http, '/assets/i18n/', '.json').getTranslation(lang);
		}
	}
}
