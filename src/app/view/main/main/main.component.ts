import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  // * Aqui se guarda la informacion de la ecudacion de los usarios.
  dataEducation: any;
  optionsEducation: any;
  // * Aqui se guarda la informacion de la laterabilidad de los usarios.
  dataLaterality: any;
  optionsLaterality: any;
  // * Aqui se guarda la informacion de si cuenta con alguna discapacidad de los usarios.
  dataDisability: any;
  optionsDisability: any;
  // * Aqui se guarda la informacion del genero de los usarios.
  dataGender: any;
  optionsGender: any;

  constructor() { }

  ngOnInit(): void {
    this.dataEducation = {
      labels: ['Nivel'],
      datasets: [
        {
          label: 'Primaria',
          backgroundColor: '#53e3a6',
          borderColor: '#1E88E5',
          data: [5]
        },
        {
          label: 'Secundaria',
          backgroundColor: '#50a3a2',
          borderColor: '#1E88E5',
          data: [20]
        },
        {
          label: 'Tercer nivel o más.',
          backgroundColor: '#90BE6D',
          borderColor: '#1E88E5',
          data: [10]
        }
      ]
    }

    this.optionsEducation = {
      title: {
        display: true,
        text: 'Nivel Académico',
        fontSize: 16
      },
      legend: {
        position: 'bottom'
      },
      scales: {
        yAxes: [{
          display: true,
          scaleLabel: {
            show: true,
            labelString: 'Value'
          },
          ticks: {
            beginAtZero: true,
            min: 0,
          }
        }]
      }
    };

    this.dataLaterality = {
      labels: ['Laterabilidad'],
      datasets: [
        {
          label: 'Diestro',
          backgroundColor: '#277DA1',
          borderColor: '#1E88E5',
          data: [10]
        },
        {
          label: 'Zurdo',
          backgroundColor: '#F9C74F',
          borderColor: '#1E88E5',
          data: [5]
        }
      ]
    };

    this.optionsLaterality = {
      title: {
        display: true,
        text: 'Laterabilidad',
        fontSize: 16
      },
      legend: {
        position: 'bottom'
      },
      scales: {
        yAxes: [{
          display: true,
          scaleLabel: {
            show: true,
            labelString: 'Value'
          },
          ticks: {
            beginAtZero: true,
            min: 0,
          }
        }]
      }
    };

    this.dataDisability = {
      labels: ['Discapacidad'],
      datasets: [
        {
          label: 'Adquirida',
          backgroundColor: '#F9C74F',
          borderColor: '#1E88E5',
          data: [6]
        },
        {
          label: 'Congénita',
          backgroundColor: '#90BE6D',
          borderColor: '#1E88E5',
          data: [5]
        },
        {
          label: 'Ninguna',
          backgroundColor: '#4D908E',
          borderColor: '#1E88E5',
          data: [10]
        }
      ]
    };

    this.optionsDisability = {
      title: {
        display: true,
        text: 'Discapacidad',
        fontSize: 16
      },
      legend: {
        position: 'bottom'
      },
      scales: {
        yAxes: [{
          display: true,
          scaleLabel: {
            show: true,
            labelString: 'Value'
          },
          ticks: {
            beginAtZero: true,
            min: 0,
          }
        }]
      }
    };

    this.dataGender = {
      labels: ['Género'],
      datasets: [
        {
          label: 'Hombre',
          backgroundColor: '#277DA1',
          borderColor: '#1E88E5',
          data: [10]
        },
        {
          label: 'Mujer',
          backgroundColor: '#F9C74F',
          borderColor: '#1E88E5',
          data: [5]
        }
      ]
    };

    this.optionsGender = {
      title: {
        display: true,
        text: 'Género',
        fontSize: 16
      },
      legend: {
        position: 'bottom'
      },
      scales: {
        yAxes: [{
          display: true,
          scaleLabel: {
            show: true,
            labelString: 'Value'
          },
          ticks: {
            beginAtZero: true,
            min: 0,
          }
        }]
      }
    };
  }

}
