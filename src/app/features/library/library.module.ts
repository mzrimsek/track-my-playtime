import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';

import { ListItemComponent } from './components/list-item/list-item.component';
import { LibraryComponent } from './library.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [LibraryComponent, ListItemComponent]
})
export class LibraryModule { }
