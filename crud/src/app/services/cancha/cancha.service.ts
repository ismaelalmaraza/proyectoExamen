import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CanchaModel } from '../../models/cancha.model';
import { map, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CanchaService {

  private url = 'https://crud-172ab.firebaseio.com';

  constructor( private http: HttpClient  ) { }

  getCanchas() {
    return this.http.get(`${ this.url }/cancha.json`)
            .pipe(
              map( this.crearArreglo ),
              delay(0)
            );
  }

  private crearArreglo( canchaObj: object ) {

    const canchas: CanchaModel[] = [];
    Object.keys( canchaObj ).forEach( key => {
      const cancha: CanchaModel = canchaObj[key];
      cancha.id = key;
      canchas.push( cancha );
    });
    return canchas;
  }
}
