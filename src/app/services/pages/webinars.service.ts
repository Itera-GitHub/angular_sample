import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ErrorHandlerService } from '../helpers/error-handler.service';
import { AbstractDataService } from '../../basics/abstracts/abstract-data-service';
import { HttpHelperService } from '../helpers/http-helper.service';
import { Webinar } from '../../basics/interfaces/webinar';
import { catchError, tap } from 'rxjs/operators';
import { Observable } from 'rxjs/index';

@Injectable({
  providedIn: 'root'
})
export class WebinarsService extends AbstractDataService<Webinar> {

  constructor(http: HttpClient, httpHelper: HttpHelperService, errorHandler: ErrorHandlerService){

    super(http, httpHelper, errorHandler, '/api/webinars');

  }

	getDetailedData(id, params): Observable<any> {
		return this.http.get<any>(this.apiUrl+'/detailed/'+id, {params: params})
			.pipe(
				tap<any>(),
				catchError(this.errorHandler.handleError())
			);
	};

	getNextWebinar(id, params): Observable<any> {
		return this.http.get<any>(this.apiUrl+'/next/'+id, {params: params})
			.pipe(
				tap<any>(),
				catchError(this.errorHandler.handleError())
			);
	};

	registerOnWebinar(id): Observable<any> {
		return this.http.post<any>(this.apiUrl+'/register/'+id, {}, this.httpHelper.httpOptions)
			.pipe(
				tap<any>(),
				catchError(this.errorHandler.handleError())
			);
	};

}
