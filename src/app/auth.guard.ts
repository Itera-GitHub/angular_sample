import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthCustomService } from './services/pages/auth.service';
import { HelperService } from './services/helpers/helper.service';
import { UsersService } from './services/pages/users.service';
import { MetaService } from './services/helpers/meta.service';
import { isPlatformBrowser } from '@angular/common';

@Injectable()
export class AuthGuard implements CanActivate {

	constructor(private auth: AuthCustomService
						, private router: Router
						, private userService: UsersService
						, private helper: HelperService
				    , @Inject(PLATFORM_ID) private platformId: Object
						, private meta: MetaService) {
	}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		if (isPlatformBrowser(this.platformId)) {
			 return this.canActivateBrowser(route, state);
		} else {
			return this.canActivateServer(route, state);
		}
	}

	canActivateBrowser(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		let user = this.auth.getUser();
		let access = route.data['access'] || null;
		let pathUrl = route.data['path'] || null;
		let userRole = this.auth.role();
		let results = false;

		if(access === 'any') {
			results = true;
		} else {
			let path = state.url.replace(/#.*/g, '');
			if(access) path = '/' + access;
			let userRights = this.auth.rights();
			userRights.forEach((role) => {
				if(role.path == path) {
					results = true;
				}
			});
		}
		if(!results) {
			this.auth.goToHome();
		}

		this.meta.addPagesMetaTitle(route);
		this.meta.createCanonicalURL(state.url, route);

		return results;
	}

	canActivateServer(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		this.meta.addPagesMetaTitle(route);
		this.meta.createCanonicalURL(state.url, route);

		return true;
	}

}
