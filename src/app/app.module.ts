import { BrowserModule, makeStateKey, StateKey, TransferState } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';
import { AuthGuard } from './auth.guard';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserInterceptor } from './browser.interceptor';
import { BrowserTransferStateModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ErrorHandlerService } from './services/helpers/error-handler.service';
import { MainFooterComponent } from './components/main-footer/main-footer.component';
import { MainHeaderComponent } from './components/main-header/main-header.component';
import { CookieService } from 'ngx-cookie-service';
import { AppRoutingModule } from './app-routing.module';
import { WebsiteLanguagesService } from './services/helpers/website-languages.service';
import { MenuListComponent } from './components/main-header/menu-list/menu-list.component';
import { SideNavComponent } from './components/main-header/side-nav/side-nav.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { Observable } from 'rxjs/Observable';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BannersService } from './services/helpers/banners.service';
import { MaterialModule } from './material.module';

export function httpTranslateLoader(transferState: TransferState, http: HttpClient) {
	return new TranslateBrowserLoader(transferState, http);
}

@NgModule({
  declarations: [
    AppComponent,
    MainFooterComponent,
    MainHeaderComponent,
    MenuListComponent,
    SideNavComponent
	],
  imports: [
		LazyLoadImageModule,
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    ToastrModule.forRoot(),
		MaterialModule,
    HttpClientModule,
		BrowserAnimationsModule,
    AppRoutingModule,
		TranslateModule.forRoot({
			loader: {
				provide: TranslateLoader,
				useFactory: httpTranslateLoader,
				deps: [TransferState, HttpClient]
			}
		}),
		BrowserTransferStateModule,
  ],
  providers: [
    AuthGuard,
    ErrorHandlerService,
    CookieService,
    WebsiteLanguagesService,
    BannersService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BrowserInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }

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
