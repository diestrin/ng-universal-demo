import { NgModule, Component, Input } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'

@Component({
	selector: 'test-component',
	template: `<p>Test</p>`
})
export class TestComponent {
  @Input()
  public test: boolean;
}

@Component({
	selector: 'home-view',
	template: `
    <h3>Home View</h3>
    <test-component [test]="value"></test-component>
  `
})
export class HomeView {
  public value = false;
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
    CommonModule,
		BrowserModule.withServerTransition({
		  appId: 'universal-demo-app'
		}),
		RouterModule.forRoot([
			{ path: '', component: HomeView, pathMatch: 'full'}
		])
	],
	declarations: [ AppComponent, HomeView, TestComponent ],
	bootstrap: [ AppComponent ]
})
export class AppModule {}
