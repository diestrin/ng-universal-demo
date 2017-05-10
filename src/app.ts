import { HttpModule } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule, Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpTransferModule, HttpTransferService } from '@ngx-universal/state-transfer';
import 'rxjs/add/operator/map';

@Component({
	selector: 'home-view',
	template: `
    <h3>Home View</h3>
    <p>{{ response$ | async }}</p>
  `
})
export class HomeView {
  public response$: Observable<any>;

  constructor(http: HttpTransferService) {
    this.response$ = http
      .get('https://jsonplaceholder.typicode.com/posts/1')
      .map(res => JSON.stringify(res));
  }
}

@Component({
	selector: 'demo-app',
	template: `
	  <h1>Universal Demo</h1>
	  <a routerLink="/">Home</a>
	  <a routerLink="/lazy">Lazy</a>
	  <router-outlet></router-outlet>
	`
})
export class AppComponent {}

@NgModule({
	imports: [
    HttpModule,
    CommonModule,
		BrowserModule.withServerTransition({
		  appId: 'universal-demo-app'
		}),
    HttpTransferModule.forRoot(),
		RouterModule.forRoot([
			{ path: '', component: HomeView, pathMatch: 'full'},
			{ path: 'lazy', loadChildren: './lazy.module#LazyModule'}
		])
	],
	declarations: [ AppComponent, HomeView ]
})
export class AppModule {}
