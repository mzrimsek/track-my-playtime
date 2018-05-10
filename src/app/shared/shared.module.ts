import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';

import { SpinnerComponent } from './components/spinner/spinner.component';

import { ElapsedTimePipe } from './pipes/elapsed-time.pipe';
import { TimePipe } from './pipes/time.pipe';

import { reducers } from './reducers/root.reducer';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('shared', reducers),
  ],
  declarations: [ElapsedTimePipe, TimePipe, SpinnerComponent],
  exports: [ElapsedTimePipe, TimePipe, SpinnerComponent]
})
export class SharedModule { }
