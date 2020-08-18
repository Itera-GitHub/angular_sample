import { NgModule } from '@angular/core';
import { AppModule } from './app.module';
import { ServerModule, ServerTransferStateModule } from '@angular/platform-server';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { Observable } from 'rxjs/Observable';
import { makeStateKey, TransferState, StateKey } from '@angular/platform-browser';
import { AppComponent } from './app.component';

export function translateFactory(transferState: TransferState) {
	return new TranslateUniversalLoader(transferState);
}

@NgModule({
	imports: [
		AppModule,
		ServerModule,
		ServerTransferStateModule,
		TranslateModule.forRoot({
			loader: {
				provide: TranslateLoader,
				useFactory: translateFactory,
				deps: [TransferState]
			}
		})
	],
	bootstrap: [AppComponent],
})
export class AppServerModule {
}

const fs = require('fs');

export class TranslateUniversalLoader implements TranslateLoader {
	constructor(private transferState: TransferState) {
	}

	public getTranslation(lang: string): Observable<any> {
		const key: StateKey<number> = makeStateKey<number>('transfer-translate-'+lang);

		return Observable.create(observer => {
			let json = JSON.parse(fs.readFileSync(`./dist/web-client/browser/assets/i18n/${lang}.json`, 'utf8'));
			this.transferState.set(key, json);
			observer.next(json);
			observer.complete();
		});
	}
}
