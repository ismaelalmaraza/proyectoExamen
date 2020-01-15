import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JugadoresComponent } from './pages/jugadores/jugadores.component';
import { JugadorComponent } from './pages/jugador/jugador.component';
import { GraphicsComponent } from './pages/graphics/graphics.component';
import { MapsComponent } from './pages/maps/maps.component';
import { MusicComponent } from './pages/music/music.component';
import { ArtistaComponent } from './pages/artista/artista.component';
import { from } from 'rxjs';
const routes: Routes = [

  { path: 'jugadores', component: JugadoresComponent },
  { path: 'jugador/:id', component: JugadorComponent },
  { path: 'graficas', component: GraphicsComponent },
  { path: 'maps', component: MapsComponent },
  { path: 'music', component: MusicComponent },
  { path: 'artist/:id', component: ArtistaComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'jugadores' }
];



@NgModule({
  imports: [
    RouterModule.forRoot( routes )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
