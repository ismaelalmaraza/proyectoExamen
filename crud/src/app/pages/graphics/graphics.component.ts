import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { EstadisticasService } from '../../services/estadisticas/estadisticas.service'
import { EstadisticasModel } from '../../models/estadisticas.model';
import { CloseScrollStrategy } from '@angular/cdk/overlay';

@Component({
  selector: 'app-graphics',
  templateUrl: './graphics.component.html',
  styleUrls: ['./graphics.component.scss']
})
export class GraphicsComponent implements OnInit {
  estadisticas: EstadisticasModel[] = [];
  dataPie: any[] = [];
  highchartsPie = Highcharts;
  chartOptionsPie ;

  highchartsBars = Highcharts;
  chartOptionsBars;

  highchartsLineas = Highcharts;
  chartOptionsLineas;
  constructor( private estadisticasService : EstadisticasService) {

  }

  ngOnInit() {
    this.cargarData(); 
  }

  //----------------------Cargar Datos-------------------------------//
  cargarData()
  {

    this.estadisticasService.getEstadisticas()
      .subscribe( resp => {
        this.estadisticas = resp;
        this.creaDataPie(this.estadisticas);
        this.creaDataBars(this.estadisticas);
        this.creaDataLines(this.estadisticas);
      });
  }
  
  creaDataLines(estadisticas : EstadisticasModel[]){
    let faltas: any[] = [];
    let amonestados: any[] = [];
    let expulsados: any[] = [];
    let juegos: any[] = [];
    for (var i = 0, len = this.estadisticas.length; i < len; i++) {
      faltas.push(this.estadisticas[i].faltas);
      amonestados.push(this.estadisticas[i].amonestados);
      expulsados.push(this.estadisticas[i].expulsados);
      juegos.push(this.estadisticas[i].juego);
    }
    this.crearGraficaLineas(juegos,faltas,expulsados,amonestados);
  }

  creaDataBars(estadisticas : EstadisticasModel[]){
    let cat: any[] = [];
    let gf: any[] = [];
    let gc: any[] = [];
    for (var i = 0, len = this.estadisticas.length; i < len; i++) {
      cat.push(this.estadisticas[i].juego);
      gf.push(this.estadisticas[i].gf);
      gc.push(this.estadisticas[i].gc)
    }
    console.log(cat)
    console.log(gf)
    console.log(gc)
    this.crearGraficaBars(cat,gf,gc);
  }

  creaDataPie(estadisticas : EstadisticasModel[]){
    let ganados = 0;
    let perdidos= 0;
    let empatados= 0;
    for (var i = 0, len = this.estadisticas.length; i < len; i++) {
      if(this.estadisticas[i].gf>this.estadisticas[i].gc)
      {
        ganados++;
      }else if(this.estadisticas[i].gf<this.estadisticas[i].gc){
        perdidos++;
      }else {
        empatados++;
      }
    }
    this.dataPie=[
      ['Perdidos',  perdidos],
      ['Empatados', empatados],
      {
         name: 'Ganados',
         y: ganados,
         sliced: true,
         selected: true
      }
   ];
   console.log(this.dataPie);
   this.creaGraficaPie(this.dataPie)
  }

  
  //----------------------Crear graficas-------------------------------//
  crearGraficaLineas(juegos,faltas,expulsados,amonestados)
  {
    this.highchartsLineas = Highcharts;
    this.chartOptionsLineas = {   
      chart: {
         type: "spline"
      },
      title: {
         text: "Incidencias por Partido"
      },
      subtitle: {
         text: "Gráfica de Faltas, Amonestacines y Expulsiones"
      },
      xAxis:{
         categories:juegos
      },
      yAxis: {          
         title:{
            text:"Número de Incidencias"
         } 
      },
      tooltip: {
         valueSuffix:""
      },
      series: [{
         name: 'Faltas',
         data: faltas
      },
      {
         name: 'Amonestados',
         data: amonestados
      },
      {
         name: 'Expulsados',
         data: expulsados
      }]
   };
  }
  crearGraficaBars(categorias,gf,gc){
    this.highchartsBars = Highcharts;
    this.chartOptionsBars = {   
       chart: {
          type: 'column'
       },
       title: {
          text: 'Estadistica de Goleo'
       },
       subtitle:{
          text: 'Goles anotados y recibidos' 
       },
       xAxis:{
        categories : categorias,
          crosshair: true        
       },     
       yAxis : {
          min: 0,
          title: {
             text: 'Goles'         
          }      
       },
       tooltip : {
          headerFormat: '<span style = "font-size:10px">{point.key}</span><table>',
          pointFormat: '<tr><td style = "color:{series.color};padding:0">{series.name}: </td>' +
             '<td style = "padding:0"><b>{point.y} Goles</b></td></tr>', footerFormat: '</table>', shared: true, useHTML: true
       },
       plotOptions : {
          column: {
             pointPadding: 0.2,
             borderWidth: 0
          }
       },
       series: [{
          name: 'Goles a Favor',
          data: gf
       }, 
       {
          name: 'Goles en Contra',
          data: gc
       }]
    };
  }
  creaGraficaPie(data){
    this.highchartsPie = Highcharts;
        this.chartOptionsPie = {   
           chart : {
              plotBorderWidth: null,
              plotShadow: false
           },
           title : {
              text: 'Estadistica de Partidos'   
           },
           tooltip : {
              pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
           },
           plotOptions : {
              pie: {
                 allowPointSelect: true,
                 cursor: 'pointer',
                 dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage} %',
                    style: {
                       color: 'black'
                    }
                 }
              }
           },
           series : [{
              type: 'pie',
              name: 'Porcentaje',
              data: data
           }]
        };
      
  }
}
