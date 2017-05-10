import { NgModule } from '@angular/core';
import { BrowserStateTransferModule } from '@ngx-universal/state-transfer';

import { AppComponent, AppModule } from './app';

@NgModule({
  imports: [
    BrowserStateTransferModule.forRoot(),
	  AppModule
  ],
  bootstrap: [
	  AppComponent
  ]
})
export class AppBrowserModule {}
