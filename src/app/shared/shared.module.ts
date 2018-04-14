import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SpinnerComponent } from './components/spinner/spinner.component';

import { ElapsedTimePipe } from './pipes/elapsed-time.pipe';
import { TimePipe } from './pipes/time.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ElapsedTimePipe, TimePipe, SpinnerComponent],
  exports: [ElapsedTimePipe, TimePipe, SpinnerComponent]
})
export class SharedModule { }
