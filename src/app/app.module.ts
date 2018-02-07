import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import imports from './imports';
import { NavComponent } from './components/nav/nav.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent
  ],
  imports,
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
