import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Chart, ChartType, registerables } from 'chart.js';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  countryId: string | null = '';
  countryData: any = null;
  chart: any;

  countries = [
    {
      id: 'Pays A', 
      name: 'Pays A', 
      medals: { gold: 12, silver: 8, bronze: 5 }, 
      participations: 5,
      history: [2, 5, 10, 15, 20]
    },
    {
      id: 'Pays B', 
      name: 'Pays B', 
      medals: { gold: 19, silver: 14, bronze: 9 }, 
      participations: 7,
      history: [3, 10, 15, 25, 30]
    },
    {
      id: 'Pays C', 
      name: 'Pays C', 
      medals: { gold: 3, silver: 6, bronze: 7 }, 
      participations: 3,
      history: [1, 3, 5, 7, 8]
    },
    {
      id: 'Pays D', 
      name: 'Pays D', 
      medals: { gold: 5, silver: 9, bronze: 10 }, 
      participations: 4,
      history: [4, 7, 10, 12, 15]
    }
  ];
  


  constructor(private route: ActivatedRoute) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.countryId = this.route.snapshot.paramMap.get('countryId');
    console.log('Country ID:', this.countryId); // Pour vérifier que l'ID est récupéré

    this.loadCountryData();
    console.log('Country Data:', this.countryData); // Pour vérifier si les données sont trouvées

    if (this.countryData) {
      this.createChart();
    }
  }

  loadCountryData(): void {
    if (this.countryId) {
      const normalizedId = this.countryId.trim().toLowerCase(); // Normaliser le countryId
      this.countryData = this.countries.find(country => country.id.toLowerCase() === normalizedId);
      console.log('Country Data:', this.countryData); // Debug pour vérifier les données trouvées
  
      if (!this.countryData) {
        console.error('Country not found for ID:', this.countryId);
      }
    }
  }
  



  createChart(): void {
    const chartElement = document.getElementById('lineChart') as HTMLCanvasElement;
    if (chartElement) {
      this.chart = new Chart(chartElement, {
        type: 'line' as ChartType,
        data: {
          labels: ['2012', '2014', '2016', '2018', '2020'],
          datasets: [
            {
              label: 'Nombre de médailles aux différentes éditions',
              data: this.countryData.history,
              borderColor: 'rgba(75, 192, 192, 1)',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              fill: true
            }
          ]
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
  }
}
