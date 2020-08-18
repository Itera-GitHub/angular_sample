import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { WebinarPageRoutingModule } from "./webinar-page-routing.module";
import { WebinarPageComponent } from "./webinar-page.component";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { RecaptchaModule, RecaptchaFormsModule, RECAPTCHA_SETTINGS, RecaptchaSettings } from "ng-recaptcha";
import { RegistrationBlockComponent } from './registration-block/registration-block.component';
import { MaterialModule } from "src/app/material.module";
import { InformationBlockComponent } from './information-block/information-block.component';
import { HostComponent } from './information-block/host/host.component';
import { AboutComponent } from './information-block/about/about.component';
import { WhatLearnComponent } from './information-block/what-learn/what-learn.component';
import { TimerBlockModule } from "src/app/components/timer-block/timer-block.module";
import { ComponentsModule } from "src/app/components/components.module";
import { VideoBlockComponent } from './video-block/video-block.component';
import { PipeModule } from "src/app/pipes/pipe.module";
import { FooterActionsComponent } from './footer-actions/footer-actions.component';
import { makeStateKey, StateKey, TransferState } from '@angular/platform-browser';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { SorryComponent } from './sorry/sorry.component';
import { LockedModalWindowModule } from '../../components/locked-modal-window/locked-modal-window.module';
import { UpcomingWebinarsModule } from '../../components/upcoming-webinars/upcoming-webinars.module';
import { WebinarFaqBlockModule } from '../../components/webinar-faq-block/webinar-faq-block.module';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { CloudinaryModule } from '@cloudinary/angular-5.x';
import { Cloudinary as CloudinaryCore } from 'cloudinary-core';

export const cloudinaryLib = {
	Cloudinary: CloudinaryCore
};

export function httpTranslateLoader(transferState: TransferState, http: HttpClient) {
	return new TranslateBrowserLoader(transferState, http);
}

@NgModule({
  imports: [
    CommonModule,
    WebinarPageRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    MaterialModule,
    TimerBlockModule,
    ComponentsModule,
    PipeModule,
		UpcomingWebinarsModule,
    LockedModalWindowModule,
		WebinarFaqBlockModule,
		LazyLoadImageModule,
		CloudinaryModule.forRoot(cloudinaryLib, { cloud_name: 'name'}),
		TranslateModule.forChild({
			loader: {
				provide: TranslateLoader,
				useFactory: httpTranslateLoader,
				deps: [TransferState, HttpClient]
			},
			extend: true
		}),
  ],
  declarations: [
    WebinarPageComponent,
    RegistrationBlockComponent,
    InformationBlockComponent,
    HostComponent,
    AboutComponent,
    WhatLearnComponent,
    VideoBlockComponent,
    FooterActionsComponent,
    SorryComponent
  ],
  providers: [
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: { siteKey: '6Le-eawUAAAAAHwVQ1IRveYJ32aw-nf-IQochESN' } as RecaptchaSettings,
    },
  ]
})
export class WebinarPageModule {}

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