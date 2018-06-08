import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';

import { CompletionComponent } from './completion.component';
import { CompletedComponent } from './components/completed/completed.component';
import { PlayingComponent } from './components/playing/playing.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [CompletionComponent, CompletedComponent, PlayingComponent]
})
export class CompletionModule { }
