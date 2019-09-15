import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ProcessService } from '../../services/process.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers:[ProcessService]
})


export class DashboardComponent implements OnInit {

  title = 'Graficos';
  public idProcessBPM="";
  public hashtagsCounters;

  /* PIE */
  public pieChartLabels:string[] = ["#error", "#info", "#alerta", "#recomendacion"];
  public pieChartData:number[] = [21, 39, 10, 14];
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
    {data: [10, 10, 15, 10, 40], label: '#Errores'},
    {data: [4, 5, 8, 6, 10], label: '#Info'},
    {data: [10, 12, 30, 20, 50], label: '#Alertas'},
    {data: [2, 4, 6, 8, 10], label: '#Recomendaciones'},
   
  ];



  constructor(
  
    private _route: ActivatedRoute,
    private _router: Router,
    private _processService: ProcessService,
  ) {
   
  }

  ngOnInit() {

    console.log("DashboardComponent.componenet ha sido cargado");

    this._route.params.subscribe(params => {
      this.idProcessBPM = params['idProcessBPM'];
      console.log("tabler del proceso:" + this.idProcessBPM);
      this.loadTotalHashtags();

    })
  }

  // events on slice click
  public chartClicked(e:any):void {
    console.log(e);
  }
 
 // event on pie chart slice hover
  public chartHovered(e:any):void {
    console.log(e);
  }

  public loadTotalHashtags(){
    //console.log("el ide leido en la url es " + idProcess);
  this._processService.getProcessHashtagsCount(this.idProcessBPM).subscribe(
    response => {
      if (response.count) {
        //console.log("recupero hashtags");
        //console.log(response.process);
        this.hashtagsCounters = response.count;
        console.log( this.hashtagsCounters);
        this.pieChartData = [this.hashtagsCounters.error,this.hashtagsCounters.info,this.hashtagsCounters.alerta,this.hashtagsCounters.recomendacion];
    
      } else {
        console.log("error cargando total de hashtags" + <any>response);
      }
    },
    error => {
      console.log("error");
      console.log(<any>error);
    }
  )
    return null;
  }

  

}
