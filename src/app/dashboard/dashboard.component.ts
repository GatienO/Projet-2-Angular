import { Component, OnInit } from '@angular/core';
import { Chart, ChartType, registerables } from 'chart.js';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  
  chart: any;

  constructor(private router: Router) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.createChart();
  }

  createChart(): void {
    this.chart = new Chart("medalsChart", {
      type: 'bar',
      data: {
        labels: ['Pays A', 'Pays B', 'Pays C', 'Pays D'],
        datasets: [
          {
            label: 'Médailles d’Or',
            data: [12, 19, 3, 5],
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
          },
          {
            label: 'Médailles d’Argent',
            data: [8, 14, 6, 9],
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
          },
          {
            label: 'Médailles de Bronze',
            data: [5, 9, 7, 10],
            backgroundColor: 'rgba(255, 206, 86, 0.2)',
            borderColor: 'rgba(255, 206, 86, 1)',
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        },
        onClick: (event, elements) => {
          if (elements && elements.length > 0) {
            const elementIndex = elements[0].index;
            const countryId = this.chart.data.labels[elementIndex].toLowerCase().replace(' ', '-');
            this.router.navigate(['/detail', countryId]);
        }
        }
      }
    });
  }
}
