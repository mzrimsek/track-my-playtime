import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { SharedModule } from '../../shared/shared.module';

import { HeaderComponent } from './components/header/header.component';
import { LibraryComponent } from './library.component';

@NgModule({
  imports: [
    CommonModule,
    NgxDatatableModule,
    SharedModule
  ],
  declarations: [
    LibraryComponent,
    HeaderComponent
  ]
})
export class LibraryModule { }
