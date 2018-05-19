import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { SharedModule } from '../../shared/shared.module';

import { LibraryComponent } from './library.component';

@NgModule({
  imports: [
    CommonModule,
    NgxDatatableModule,
    SharedModule
  ],
  declarations: [LibraryComponent]
})
export class LibraryModule { }
