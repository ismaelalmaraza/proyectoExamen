import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { JugadorComponent } from './pages/jugador/jugador.component';
import { JugadoresComponent } from './pages/jugadores/jugadores.component';
import { NavbarComponent } from './shared/navbar/navbar.component';

import {MatMenuModule} from '@angular/material/menu';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import { SidebarComponent } from './shared/sidebar/sidebar.component';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { GraphicsComponent } from './pages/graphics/graphics.component';

import { HighchartsChartComponent } from 'highcharts-angular';
import { AgmCoreModule } from '@agm/core';


const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  declarations: [
    AppComponent,
    JugadorComponent,
    JugadoresComponent,
    NavbarComponent,
    SidebarComponent,
    GraphicsComponent,
    HighchartsChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatMenuModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatCardModule,
    PerfectScrollbarModule,
    AgmCoreModule.forRoot({
      apiKey : 'AIzaSyCrlaDjab8t2QLoD3_cZ4x6wgKENrE55Lc',
      libraries: ['places'] 
    })
  ],
  providers: [ {
    provide: PERFECT_SCROLLBAR_CONFIG,
    useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
