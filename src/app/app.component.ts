import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { DataTablesModule } from 'angular-datatables';
import { CalendarModule } from 'primeng/calendar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, CalendarModule, DataTablesModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'gestionStockFrontend';
  
}
