import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ErrorHandlerService } from '../helpers/error-handler.service';
import { HttpHelperService } from '../helpers/http-helper.service';
import { catchError, tap } from 'rxjs/operators';
import { Observable } from 'rxjs/index';
import { StudyProgram } from '../../basics/interfaces/study-program';

@Injectable({
  providedIn: 'root'
})
export class SystemSettingsService {

  constructor(private http: HttpClient, private httpHelper: HttpHelperService, private errorHandler: ErrorHandlerService){
  }

	getWebsiteStructure(params: object = {}, debounce: boolean = false): Observable<any> {
		params = Object.assign(params, this.httpHelper.httpOptions);
		return this.http.get<any>('/api/website-structure', params)
			.pipe(
				tap<any>(),
				catchError(this.errorHandler.handleError())
			);
	};

	getLandingData(params: object = {}, debounce: boolean = false): Observable<StudyProgram> {
		return this.http.get<any>('/api/landing-data', params)
			.pipe(
				tap<any>(),
				catchError(this.errorHandler.handleError())
			);
	};

	getMoreArticles(params: object = {}, debounce: boolean = false): Observable<StudyProgram> {
		return this.http.get<any>('/api/more-articles', params)
			.pipe(
				tap<any>(),
				catchError(this.errorHandler.handleError())
			);
	};

	getFreebieLink(params: object = {}, debounce: boolean = false): Observable<StudyProgram> {
		return this.http.get<any>('/api/freebie-link', params)
			.pipe(
				tap<any>(),
				catchError(this.errorHandler.handleError())
			);
	};

	saveUtmParams(data): Observable<any> {
		return this.http.post<any>('/api/save-utm-params', data, this.httpHelper.httpOptions)
			.pipe(
				tap<any>(),
				catchError(this.errorHandler.handleError())
			);
	}

}
