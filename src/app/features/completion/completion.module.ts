import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgSelectModule } from '@ng-select/ng-select';
import { StoreModule } from '@ngrx/store';

import { SharedModule } from '../../shared/shared.module';

import { CompletionComponent } from './completion.component';
import { AddPlayingComponent } from './components/add-playing/add-playing.component';
import { CompletedComponent } from './components/completed/completed.component';
import { PlayingComponent } from './components/playing/playing.component';

import { reducers } from './reducers/root.reducer';

@NgModule({
  imports: [
    CommonModule,
    FontAwesomeModule,
    NgSelectModule,
    FormsModule,
    StoreModule.forFeature('completion', reducers),
    SharedModule
  ],
  declarations: [CompletionComponent, CompletedComponent, PlayingComponent, AddPlayingComponent]
})
export class CompletionModule { }
