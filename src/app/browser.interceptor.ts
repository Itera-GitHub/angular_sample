import { HttpInterceptor, HttpRequest, HttpEvent, HttpResponse } from '@angular/common/http';
import { HttpHandler } from '@angular/common/http';
import { Injectable, Inject, PLATFORM_ID } from "@angular/core";
import { AuthCustomService } from './services/pages/auth.service';
import { HelperService } from './services/helpers/helper.service';
import { Observable, of } from 'rxjs';
import { environment } from '../environments/environment';
import { StateKey, TransferState, makeStateKey } from '@angular/platform-browser';
import { isPlatformServer } from '@angular/common';
import { tap } from 'rxjs/operators';

@Injectable()
export class BrowserInterceptor implements HttpInterceptor {

  private notCachingUrls: string[] = ['/api/rights', '/api/users/personal-info'];
  public webUrl: string = environment.apiUrl;

  constructor(private auth: AuthCustomService
              , public helper: HelperService
							, private transferState: TransferState
							, @Inject(PLATFORM_ID) private platformId: any) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if(!req.url.includes('/api')){
      return next.handle(req);
    }

    let authReq = req.clone({});
    if(req.url.includes('/api')){
      authReq = req.clone({url: this.webUrl + req.url});
    }

		const authToken = localStorage.getItem('auth_token');
    if(authToken && !isPlatformServer(this.platformId)){
      authReq = req.clone({
        url: this.webUrl+req.url,
        headers: req.headers.set('Authorization', `Bearer ${authToken}`),
      });
    }

		if (authReq.method !== 'GET') {
			return next.handle(authReq);
		}

		const getParams = this.generateQueryParamsString(req);
		const key: StateKey<string> = makeStateKey<string>(req.url+getParams);

		if (isPlatformServer(this.platformId)) {
			return next.handle(authReq).pipe(tap((event) => {
				this.transferState.set(key, (<HttpResponse<any>> event).body);
			}));
		} else {
			const storedResponse = this.transferState.get<any>(key, null);
			const regex = /api\/study-programs\/program-detailed\/[1-9]+/g;
			if (storedResponse && !(req.url.match(regex) && authToken) && this.notCachingUrls.indexOf(req.url) == -1) {
				const response = new HttpResponse({body: storedResponse, status: 200});
				this.transferState.remove(key);
				return of(response);
			} else {
				return next.handle(authReq);
			}
		}
  }

  generateQueryParamsString(req: HttpRequest<any>) {
  	const allParams = req.params.toString();
  	return allParams ? '?'+allParams : '';
	}

}