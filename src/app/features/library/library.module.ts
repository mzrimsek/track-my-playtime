import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { SharedModule } from '../../shared/shared.module';

import { LibraryComponent } from './library.component';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  imports: [
    CommonModule,
    NgxDatatableModule,
    SharedModule
  ],
  declarations: [LibraryComponent, HeaderComponent]
})
export class LibraryModule { }
