import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ProcessService } from '../../services/process.service';
import { ActivityService } from '../../services/activity.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers:[ProcessService,ActivityService]
})


export class DashboardComponent implements OnInit {

  title = 'Graficos';
  public idProcessBPM="";
  public hashtagsCounters;
  public lsActivities;
  public activitiesMap = new Map();
  public activitiesMapIndex = new Map();

  //indican que se selecciono actividad para ver mensajes
  public showComments = false;
  public activityToShowComments;

  /* PIE */
  public pieChartLabels:string[] = ["#error", "#info", "#alerta", "#recomendacion"];
  public pieChartData:number[] = [0, 0, 0, 0];
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
    {data: [0, 0, 0, 0, 0, 0 ,0,0], label: '#Errores'},
    {data: [0, 0, 0, 0, 0, 0 ,0,0], label: '#Info'},
    {data: [0, 0, 0, 0, 0, 0 ,0,0], label: '#Alertas'},
    {data: [0, 0, 0, 0, 0, 0 ,0,0], label: '#Recomendaciones'},
  ];



  constructor(
  
    private _route: ActivatedRoute,
    private _router: Router,
    private _processService: ProcessService,
    private _activityService: ActivityService,
  ) {
   
  }

  ngOnInit() {

    console.log("DashboardComponent.componenet ha sido cargado");

    this._route.params.subscribe(params => {
      this.idProcessBPM = params['idProcessBPM'];
      console.log("tabler del proceso:" + this.idProcessBPM);
      this.loadTotalHashtags();
      this.loadActivitiesBars();

    })
  }

  // events on slice click
  public chartClicked(e:any):void {
    console.log(e);
    if (e.active.length > 0) {
      const chart = e.active[0]._chart;
      const activePoints = chart.getElementAtEvent(e.event);
      if ( activePoints.length > 0) {
       // get the internal index of slice in pie chart
       const clickedElementIndex = activePoints[0]._index;
       const label = chart.data.labels[clickedElementIndex];
       // get value by index
       const value = chart.data.datasets[0].data[clickedElementIndex];
       console.log(clickedElementIndex, label, value)
       this.activityToShowComments = this.activitiesMapIndex.get(clickedElementIndex);
       this.showComments = false;
       this.showComments = true;
      }
     }
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
        //console.log( this.hashtagsCounters);
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

  public loadActivitiesBars(){
    //console.log("el ide leido en la url es " + idProcess);
    this._processService.getProcessActivities(this.idProcessBPM).subscribe(
      response => {
        if (response.activities) {
          this.lsActivities = response.activities
          let i = 0;
          let arrayOfActiviLabels =this.barChartLabels;
          this.lsActivities.forEach(function(element) {
            arrayOfActiviLabels[i] = element.title;
            i++;
          });
          this.loadActivitiesBarCounters();  //loadActivitiesBarCounters
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


  public loadActivitiesBarCounters(){
    var $this =this;
    let i=0;
    let barChartDataAux = [
      {data: [0, 0, 0, 0, 0, 0, 0, 0], label: '#Errores'},
      {data: [0, 0, 0, 0, 0, 0, 0, 0], label: '#Info'},
      {data: [0, 0, 0, 0, 0, 0, 0, 0], label: '#Alertas'},
      {data: [0, 0, 0, 0, 0, 0, 0, 0], label: '#Recomendaciones'},
    ];

    this.lsActivities.forEach(function(element) {
      //console.log("id actividad" +element.idActivityBPM);
      $this.activitiesMap.set(element.idActivityBPM,i);
      $this.activitiesMapIndex.set(i,element.idActivityBPM); 
      i++; 
    });

    this.lecturaPuntual($this,barChartDataAux,0)
    //espera a la carga de la matriz y la asigna para que se vea en grafico
    setTimeout(function() {
      $this.barChartData  = barChartDataAux; 
    }, 2000);
  }

  public lecturaPuntual( $this ,barChartDataAux,xPos ){
    let xIdActivity = $this.activitiesMapIndex.get(xPos);
    if(xPos<=7){
      $this._activityService.getActivityHashtagsCounters(xIdActivity,xPos).subscribe(
        response => {
          if (response.activityCounters) {
            let idActivityBPM = response.activityCounters.idActivityBPM; 
            let xCounters = response.activityCounters.counters 
            console.log("actividad "+idActivityBPM);
            console.log(xCounters);
            barChartDataAux[0].data[$this.activitiesMap.get(idActivityBPM)] = xCounters.error;
            barChartDataAux[1].data[$this.activitiesMap.get(idActivityBPM)] = xCounters.info;
            barChartDataAux[2].data[$this.activitiesMap.get(idActivityBPM)] = xCounters.alerta;
            barChartDataAux[3].data[$this.activitiesMap.get(idActivityBPM)] = xCounters.recomendacion;
            xPos++
            $this.lecturaPuntual($this,barChartDataAux,xPos);     
         
          } else {
            console.log("error cargando total de hashtags" + <any>response);
          }
        },
        error => {
          console.log("error");
          console.log(<any>error);
        }
      )
      
    }else{
      return;
    }
   
  }

}




