import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs/index';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { isPlatformServer, Location } from '@angular/common';
import { ErrorHandlerService } from '../helpers/error-handler.service';
import { HttpHelperService } from '../helpers/http-helper.service';
import { ToastService } from '../helpers/toast.service';
import { NavigationService } from '../helpers/navigation.service';

@Injectable ({
  providedIn: 'root'
})
export class AuthCustomService {

  private token: string;

  private profileInfoSource = new Subject<string>();
  profileInfo$ = this.profileInfoSource.asObservable();

  updateProfileInfo(profileInfo: any) {
    localStorage.setItem ('user', JSON.stringify (profileInfo));
    this.profileInfoSource.next(profileInfo);
  }

  constructor (private http: HttpClient
              , private httpHelper: HttpHelperService
              , private router: Router
              , private toast: ToastService
              , private location: Location
		          , private navigationService: NavigationService
		          , @Inject(PLATFORM_ID) private platformId: any
              , private errorHandler: ErrorHandlerService) {
    this.token = localStorage.getItem ('auth_token');
  }

  getAuthorizationToken () {
    return this.token;
  }

  updateToken () {
    this.token = localStorage.getItem ('auth_token');
  }

  signupUser (data, navigate = true, showError = true): Observable<any> {
    return this.http.post ('/api/register', data, this.httpHelper.httpOptions)
      .pipe (
        tap ((data: any) =>  {
          this.toast.showSuccess('Successfully signed up');
        }),
        catchError (this.errorHandler.handleError({controls:{}}, '', 'operation', {result: false}, showError))
      );
  }

  login (data, isLockedPopup?: boolean): Observable<any> {
    return this.http.post('/api/login', data, this.httpHelper.httpOptions)
      .pipe (
        tap ((data:any) => {
          this.saveLoginInfo (data);
          let user = this.getUser();
          this.profileInfoSource.next(user);
        }),
        catchError (this.errorHandler.handleError ())
      );
  }

  socialLogin (data, isLockedPopup?: boolean): Observable<any> {
    return this.http.post('/api/social-sign', data, this.httpHelper.httpOptions)
      .pipe (
        tap ((data:any) => {
          if(data.result && data.result.token) {
            this.saveLoginInfo (data);
            let user = this.getUser();
            this.profileInfoSource.next(user);
          }
        }),
        catchError (this.errorHandler.handleError ())
      );
  }

  logout(): Observable<any> {
    return this.http.post('/api/logout', {}, this.httpHelper.httpOptions)
      .pipe (
        tap ((data: any) =>  {
          this.clearLoginInfo();
					this.profileInfoSource.next();
					this.router.navigate (['sign-in']);
        }),
        catchError (this.errorHandler.handleError ())
      );
  }

}
