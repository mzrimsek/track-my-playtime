import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CompletionComponent } from './completion.component';
import { CompletedComponent } from './components/completed/completed.component';
import { PlayingComponent } from './components/playing/playing.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [CompletionComponent, CompletedComponent, PlayingComponent]
})
export class CompletionModule { }
