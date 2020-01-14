import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';

import { JugadorModel } from '../../models/jugador.model';
import { JugadorService } from '../../services/jugador/jugador.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-jugador',
  templateUrl: './jugador.component.html',
  styleUrls: ['./jugador.component.css']
})
export class JugadorComponent implements OnInit {

  jugador: JugadorModel = new JugadorModel();


  constructor( private jugadorService: JugadorService,
               private route: ActivatedRoute ) { }

  ngOnInit() {

    const id = this.route.snapshot.paramMap.get('id');

    if ( id !== 'nuevo' ) {

      this.jugadorService.getJugador( id )
        .subscribe( (resp: JugadorModel) => {
          this.jugador = resp;
          this.jugador.id = id;
        });

    }

  }

  guardar( form: NgForm ) {

    if ( form.invalid ) {
      console.log('Formulario no válido');
      return;
    }

    Swal.fire({
      title: 'Espere',
      text: 'Guardando información',
      type: 'info',
      allowOutsideClick: false
    });
    Swal.showLoading();


    let peticion: Observable<any>;

    if ( this.jugador.id ) {
      peticion = this.jugadorService.actualizarJugador( this.jugador );
    } else {
      peticion = this.jugadorService.crearJugador( this.jugador );
    }

    peticion.subscribe( resp => {

      Swal.fire({
        title: this.jugador.nombre,
        text: 'Se actualizó correctamente',
        type: 'success'
      });

    });



  }

}
