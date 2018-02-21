import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ElapsedTimePipe } from './pipes/elapsed-time.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ElapsedTimePipe],
  exports: [ElapsedTimePipe]
})
export class SharedModule { }
