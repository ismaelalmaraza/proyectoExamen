import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JugadoresComponent } from './pages/jugadores/jugadores.component';
import { JugadorComponent } from './pages/jugador/jugador.component';
import { GraphicsComponent } from './pages/graphics/graphics.component';

import { from } from 'rxjs';
const routes: Routes = [

  { path: 'jugadores', component: JugadoresComponent },
  { path: 'jugador/:id', component: JugadorComponent },
  { path: 'graficas', component: GraphicsComponent },
  
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
