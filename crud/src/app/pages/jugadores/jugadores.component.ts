import { Component, OnInit } from '@angular/core';
import { JugadorService } from '../../services/jugador/jugador.service';
import { JugadorModel } from '../../models/jugador.model';

import { PosicionService } from '../../services/posicion/posicion.service';
import { PosicionModel } from '../../models/posicion.model';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-jugadores',
  templateUrl: './jugadores.component.html',
  styleUrls: ['./jugadores.component.css']
})
export class JugadoresComponent implements OnInit {

  jugadores: JugadorModel[] = [];
  posiciones: PosicionModel[] = [];
  cargando = false;
  titulares:number = 0;
  banca:number = 0;
  totalJugadores:number = 0;

  constructor( private jugadoresService : JugadorService, private posicionService : PosicionService) {

  }

  ngOnInit() {

    
    this.cargarJugadores();
    this.cargarPosciones();
    
  }

  cargarPosciones()
  {
    this.cargando = true;
    this.posicionService.getPosiciones()
      .subscribe( resp => {
        this.posiciones = resp;
        console.log(this.posiciones);
        this.cargando = false;
      })
  }

  cargarJugadores()
  {
    this.cargando = true;
    this.jugadoresService.getJugadores()
      .subscribe( resp => {
        this.jugadores = resp;
        for (var i = 0, len = this.jugadores.length; i < len; i++) {
            if(this.jugadores[i].titular===true)
            {
              this.titulares++;
            }else{
              this.banca++;
            }
          }
          this.totalJugadores = this.titulares + this.banca;
          this.cargando = false;
      });
  }

  borrarJugador( jugador: JugadorModel, i: number ) {
    Swal.fire({
      title: '¿Está seguro?',
      text: `Está seguro que desea borrar a ${ jugador.nombre }`,
      type: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then( resp => {

      if ( resp.value ) {
        this.jugadores.splice(i, 1);
        this.jugadoresService.borrarJugador( jugador.id ).subscribe();
      }

    });
  }

  openDialog(jugador)
  {
    Swal.fire({
      title: "",
      text: jugador.descripcion,

    });
    
  }
}
