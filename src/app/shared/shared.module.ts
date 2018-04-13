import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SpinnerComponent } from './components/spinner/spinner.component';

import { ElapsedTimePipe } from './pipes/elapsed-time.pipe';
import { TotalTimePipe } from './pipes/total-time.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ElapsedTimePipe, TotalTimePipe, SpinnerComponent],
  exports: [ElapsedTimePipe, TotalTimePipe, SpinnerComponent]
})
export class SharedModule { }
