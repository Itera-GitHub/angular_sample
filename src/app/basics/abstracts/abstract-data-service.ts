import { catchError, tap} from 'rxjs/operators';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { ErrorHandlerService } from '../../services/helpers/error-handler.service';
import { Observable } from 'rxjs/index';
import { debounceTime } from 'rxjs/operators';
import { DataService } from '../interfaces/data-service';
import { HttpHelperService } from '../../services/helpers/http-helper.service';

export abstract class AbstractDataService<T> implements DataService {
  public apiUrl: string;

  protected constructor (  protected http: HttpClient
                         , protected httpHelper: HttpHelperService
                         , protected errorHandler: ErrorHandlerService
                         , apiUrl: string) {
    this.apiUrl = apiUrl;
  }

  getData(params: object = {}, debounce: boolean = false): Observable<T[]> {
    params = Object.assign(params, this.httpHelper.httpOptions);
    return this.http.get<any>(this.apiUrl, params)
      .pipe(
        tap<any>(),
        catchError(this.errorHandler.handleError())
      );
  };

  getDataById(id: number): Observable<T> {
    return this.http.get<T>(this.apiUrl+'/'+id, this.httpHelper.httpOptions)
      .pipe(
        tap<any>(),
        catchError(this.errorHandler.handleError())
      );
  };

  putData(id, data, form): Observable<T[]> {
    return this.http.put<any>(this.apiUrl + '/' + id, data, this.httpHelper.httpOptions)
      .pipe(
        tap<any>(),
        catchError(this.errorHandler.handleError(form))
      );
  }

  postData (data, form): Observable<T[]> {
    return this.http.post<any>(this.apiUrl, data, this.httpHelper.httpOptions)
      .pipe(
        tap<any>(),
        catchError(this.errorHandler.handleError(form))
      );
  }

  deleteRow (id): Observable<T[]> {
    return this.http.delete<any>(this.apiUrl + '/' + id, this.httpHelper.httpOptions)
      .pipe(
        tap<any>(),
        catchError(this.errorHandler.handleError())
      );
  }

  deleteAll (ids): Observable<T[]> {
    return this.http.post<any>(this.apiUrl+'/delete-all', ids, this.httpHelper.httpOptions)
      .pipe(
        tap<any>(),
        catchError(this.errorHandler.handleError())
      );
  }

}

