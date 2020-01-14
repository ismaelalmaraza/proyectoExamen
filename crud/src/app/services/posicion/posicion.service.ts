import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PosicionModel } from '../../models/posicion.model';
import { map, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PosicionService {

  private url = 'https://crud-172ab.firebaseio.com';

  constructor( private http: HttpClient ) { }

  getPosiciones() {
    return this.http.get(`${ this.url }/posiciones.json`)
            .pipe(
              map( this.crearArreglo ),
              delay(0)
            );
  }

  private crearArreglo( jugadorObj: object ) {

    const posiciones: PosicionModel[] = [];
    Object.keys( jugadorObj ).forEach( key => {
      const posicion: PosicionModel = jugadorObj[key];
      posicion.id = key;
      posiciones.push( posicion );
    });
    return posiciones;
  }

}
