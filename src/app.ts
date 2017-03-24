import { NgModule, Component } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { RouterModule } from '@angular/router'
import { Jsonp, JsonpModule } from '@angular/http';
import 'rxjs/add/operator/map'

@Component({
	selector: 'home-view',
	template: `<h3>{{title}}</h3>`
})
export class HomeView {
  public title: string;

  constructor(http: Jsonp) {
    http.get('https://jsonplaceholder.typicode.com/posts/1?callback=JSONP_CALLBACK')
      .map(res => res.json())
      .subscribe(data => this.title = data.title);
  }
}

@Component({
	selector: 'demo-app',
	template: `
	  <h1>Universal Demo</h1>
	  <a routerLink="/">Home</a>
	  <router-outlet></router-outlet>
	`
})
export class AppComponent {}

@NgModule({
	imports: [
    JsonpModule,
		BrowserModule.withServerTransition({
		  appId: 'universal-demo-app'
		}),
		RouterModule.forRoot([
			{ path: '', component: HomeView, pathMatch: 'full'}
		])
	],
	declarations: [ AppComponent, HomeView ],
	bootstrap: [ AppComponent ]
})
export class AppModule {}
