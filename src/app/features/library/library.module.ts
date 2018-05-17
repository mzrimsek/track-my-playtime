import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';

import { LibraryComponent } from './library.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [LibraryComponent]
})
export class LibraryModule { }
