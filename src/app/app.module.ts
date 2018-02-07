import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav.component';

import imports from './imports';

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
