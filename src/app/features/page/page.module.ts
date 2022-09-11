import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { PageRoutingModule } from './page-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PageComponent } from './page.component';


@NgModule({
  declarations: [
    PageComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    PageRoutingModule,
    FormsModule,
  ]
})
export class PageModule { }
