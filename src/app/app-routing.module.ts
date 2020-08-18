import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';
import { AuthGuard } from './auth.guard';

const GUEST_ACCESS = 'guest';
const ANY_ACCESS = 'any';
const LOGIN_ACCESS = 'login';

const routes: Routes = [
  {
    path: 'webinar/:date/:name/:id',
    loadChildren: () => import('./pages/webinar-page/webinar-page.module').then(m => m.WebinarPageModule),
    canActivate: [AuthGuard],
    data: {access: ANY_ACCESS, title: 'Webinar'},
	},
  {
    path: ':language/webinar/:date/:name/:id',
    loadChildren: () => import('./pages/webinar-page/webinar-page.module').then(m => m.WebinarPageModule),
    canActivate: [AuthGuard],
    data: {access: ANY_ACCESS, title: 'Webinar'},
	},
  {
    path: 'about',
    loadChildren: () => import('./pages/about-us-page/about-us-page.module').then(m => m.AboutUsPageModule),
    canActivate: [AuthGuard],
    data: {access: ANY_ACCESS, title: 'About Us'},
  },
  {
    path: '',
		loadChildren: () => import('./pages/landing/landing-page.module').then(m => m.LandingPageModule),
    canActivate: [AuthGuard],
    data: {access: ANY_ACCESS,
           title: 'Title',
           metaDescription: 'Description',
           noFooter: true,
           languages: ['en','es']}
  },
  {
    path: 'es',
		loadChildren: () => import('./pages/landing/landing-page.module').then(m => m.LandingPageModule),
    canActivate: [AuthGuard],
    data: {access: ANY_ACCESS,
           title: 'Title',
           metaDescription: 'Description',
           noFooter: true,
           selectedLanguage: 'es',
           languages: ['en','es']}
  },
  {
    path: '**',
    redirectTo: ''
  }
];

const routerOptions: ExtraOptions = {
  useHash: false,
  anchorScrolling: 'enabled',
  scrollPositionRestoration: 'enabled',
  onSameUrlNavigation: 'reload',
	initialNavigation: 'enabled'
};

@NgModule({
  imports: [
    RouterModule.forRoot(routes, routerOptions)
  ],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }