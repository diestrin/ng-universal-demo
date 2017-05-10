import { ServerModule } from '@angular/platform-server';
import { APP_BOOTSTRAP_LISTENER, ApplicationRef, NgModule, NgModuleRef } from '@angular/core';
import { ServerStateTransferModule, StateTransferService } from '@ngx-universal/state-transfer';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/filter';

import { AppComponent, AppModule } from './app';

export function injectState(stateTransfer: StateTransferService): Function {
  return (moduleRef: NgModuleRef<any>) => {
    const appRef: ApplicationRef = moduleRef.injector.get(ApplicationRef);

    appRef.isStable
      .filter(isStable => isStable)
      .first()
      .subscribe(() => stateTransfer.inject());
  };
}

@NgModule({
  imports: [
	  ServerModule,
    ServerStateTransferModule.forRoot(),
	  AppModule
  ],
  providers: [
    {
      provide: APP_BOOTSTRAP_LISTENER,
      multi: true,
      deps: [StateTransferService],
      useFactory: injectState
    }
  ],
  bootstrap: [
	  AppComponent
  ]
})
export class AppServerModule {}
