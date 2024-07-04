import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AdminRoutingModule } from './admin-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from "./sidebar/sidebar.component";
import { DataTablesModule } from 'angular-datatables';
import { ArticleDetailComponent } from './article-detail/article-detail.component';

@NgModule({
    declarations: [
        LayoutComponent,
        DashboardComponent,
        ArticleDetailComponent
    ],
    imports: [
        CommonModule,
        AdminRoutingModule,
        FormsModule, ///don't oblied
        ReactiveFormsModule //don't oblied
      ,
        DataTablesModule,
        HeaderComponent,
        SidebarComponent
    ]
})
export class AdminModule { }
