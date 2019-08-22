import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  title = 'Graficos';

  /* PIE */
  public pieChartLabels:string[] = ["#error", "#info", "#alerta", "#recomendacion", "#exito"];
  public pieChartData:number[] = [21, 39, 10, 14, 16];
  public pieChartType:string = 'pie';
  public pieChartOptions:any = {'backgroundColor': [
               "#FF6384",
            "#FFCE56",
            "#4BC0C0",
            "#E7E9ED",
            "#36A2EB"
            ]}

  /* Doughnut */
  public doughnutChartLabels = ['Ingresar Solicitud', 'Verificar vigencia de garantía', 'Constatar Falla', 'Evaluar Cobertura', 'Notificar Estado'];
  public doughnutChartData = [120, 150, 180, 90, 10];
  public doughnutChartType = 'doughnut';


  /* Barras */
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  public barChartLabels = ['Ingresar Solicitud', 'Verificar vigencia de garantía', 'Constatar Falla', 'Evaluar Cobertura', 'Notificar Estado'];
  public barChartType = 'horizontalBar';
  public barChartLegend = true;

  public barChartData = [
    {data: [5, 10, 15, 10, 40], label: 'Recomendaciones'},
    {data: [10, 12, 30, 20, 50], label: 'Comentarios'},
   
  ];



  constructor() { }

  ngOnInit() {
  }

  // events on slice click
  public chartClicked(e:any):void {
    console.log(e);
  }
 
 // event on pie chart slice hover
  public chartHovered(e:any):void {
    console.log(e);
  }

}
