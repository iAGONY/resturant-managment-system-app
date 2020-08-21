import { Component, OnInit } from '@angular/core';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  title = 'RESTURANT MANAGMENT SYSTEM';

  dashboardData: any;

  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.dashboardService.count().
      subscribe(response => {

        this.dashboardData = response;
      },
        errorResponse => {

        });
  }

} 
