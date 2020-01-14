import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JugadorModel } from '../../models/jugador.model';
import { map, delay } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class JugadorService {

  private url = 'https://crud-172ab.firebaseio.com';

  constructor( private http: HttpClient ) { }


  crearJugador( jugador: JugadorModel ) {

    return this.http.post(`${ this.url }/jugadores.json`, jugador)
            .pipe(
              map( (resp: any) => {
                jugador.id = resp.name;
                return jugador;
              })
            );

  }

  getJugadores() {
    return this.http.get(`${ this.url }/jugadores.json`)
            .pipe(
              map( this.crearArreglo ),
              delay(0)
            );
  }

  private crearArreglo( jugadorObj: object ) {

    const jugadores: JugadorModel[] = [];
    Object.keys( jugadorObj ).forEach( key => {
      const jugador: JugadorModel = jugadorObj[key];
      jugador.id = key;
      jugadores.push( jugador );
    });
    return jugadores;
  }

  actualizarJugador( jugador: JugadorModel ) {
    const jugadorTemp = {
      ...jugador
    };
    delete jugadorTemp.id;
    return this.http.put(`${ this.url }/jugadores/${ jugador.id }.json`, jugadorTemp);
  }

  getJugador( id: string ) {

    return this.http.get(`${ this.url }/jugadores/${ id }.json`);

  }

  borrarJugador( id: string ) {

    return this.http.delete(`${ this.url }/jugadores/${ id }.json`);

  }

}
