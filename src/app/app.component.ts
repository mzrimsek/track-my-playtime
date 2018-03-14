import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from './reducers';
import * as actions from './actions/app.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private store: Store<State>) {
    this.store.dispatch(new actions.InitializeApplication());
  }
}
