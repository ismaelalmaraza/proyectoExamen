import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MusicService } from '../../services/music/music.service';

@Component({
  selector: 'app-artista',
  templateUrl: './artista.component.html',
  styles: ['./artista.component.css']
})
export class ArtistaComponent {

  artista: any = {};
  topTracks: any[] = [];

  loadingArtist: boolean;

  constructor(private router: ActivatedRoute,
              private spotify: MusicService ) {

    this.loadingArtist = true;

    this.router.params.subscribe( params => {

      this.spotify.getToken().subscribe(
        data => { 
          console.log(data['token_type'] + " " + data['access_token']);
          this.getArtista( params['id'] ,data['token_type'] + " " + data['access_token']);
          this.getTopTracks( params['id'],data['token_type'] + " " + data['access_token'] );
  
      },
        error => { console.log(error);
      } )


    });

  }


  getArtista( id: string ,token : string) {

    this.loadingArtist = true;

    this.spotify.getArtista( id ,token)
          .subscribe( artista => {
            console.log(artista);
            this.artista = artista;

            this.loadingArtist = false;
          });

  }

  getTopTracks( id: string ,token : string) {

    this.spotify.getTopTracks( id,token )
            .subscribe( topTracks => {
              console.log(topTracks);
              this.topTracks = topTracks;
            });

  }


}
