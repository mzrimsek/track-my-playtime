import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SpinnerComponent } from './components/spinner/spinner.component';

import { ElapsedTimePipe } from './pipes/elapsed-time.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ElapsedTimePipe, SpinnerComponent],
  exports: [ElapsedTimePipe, SpinnerComponent]
})
export class SharedModule { }
