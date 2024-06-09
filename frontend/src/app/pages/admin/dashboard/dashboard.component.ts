import { Component } from '@angular/core';
import { DashStatisticsComponent } from '../../../layout/dashboard-layout/dash-statistics/dash-statistics.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    DashStatisticsComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
