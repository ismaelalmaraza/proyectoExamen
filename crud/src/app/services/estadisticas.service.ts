import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EstadisticasModel } from '../models/estadisticas.model';
import { map, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EstadisticasService {
  private url = 'https://crud-172ab.firebaseio.com';

  constructor(private http : HttpClient) { }

  getEstadisticas() {
    return this.http.get(`${ this.url }/estadisticas.json`)
            .pipe(
              map( this.crearArreglo ),
              delay(0)
            );
  }

  private crearArreglo( estObj: object ) {

    const datos: EstadisticasModel[] = [];
    Object.keys( estObj ).forEach( key => {
      const dato: EstadisticasModel = estObj[key];
      dato.id = key;
      datos.push( dato );
    });
    return datos;
  }

}
