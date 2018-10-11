import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CompletionComponent } from './completion.component';

const routes: Routes = [
  {
    path: '',
    component: CompletionComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompletionRoutingModule { }
