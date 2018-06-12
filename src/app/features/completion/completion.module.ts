import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgSelectModule } from '@ng-select/ng-select';

import { SharedModule } from '../../shared/shared.module';

import { AddPlayingComponent } from './add-playing/add-playing.component';
import { CompletionComponent } from './completion.component';
import { CompletedComponent } from './components/completed/completed.component';
import { PlayingComponent } from './components/playing/playing.component';

@NgModule({
  imports: [
    CommonModule,
    FontAwesomeModule,
    NgSelectModule,
    FormsModule,
    SharedModule
  ],
  declarations: [CompletionComponent, CompletedComponent, PlayingComponent, AddPlayingComponent]
})
export class CompletionModule { }
