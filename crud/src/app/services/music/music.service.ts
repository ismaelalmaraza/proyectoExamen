import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, JsonpInterceptor } from '@angular/common/http';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MusicService {

  token;
  constructor(private http: HttpClient) {

    
  }

  getQuery( query: string, token:string ) {
    
    const url = `https://api.spotify.com/v1/${ query }`;

    const headers = new HttpHeaders({
      'Authorization':  token
    });

    return this.http.get(url, { headers });

  }


  getNewReleases(token) {

    return this.getQuery('browse/new-releases?limit=20',token)
              .pipe( map( data => data['albums'].items ));

  }

  getArtista( id: string ,token) {

    return this.getQuery(`artists/${ id }`,token);
                // .pipe( map( data => data['artists'].items));
  }

  getTopTracks( id: string ,token) {

    return this.getQuery(`artists/${ id }/top-tracks?country=us`, token)
                .pipe( map( data => data['tracks']));

  }
/*
  getArtistas( termino: string ) {

    return this.getQuery(`search?q=${ termino }&type=artist&limit=15`)
                .pipe( map( data => data['artists'].items));

  }





*/

  getToken() {
    const url = 'https://apispotifyiaa.herokuapp.com/spotify/b69e4e30137b4237a9d719d128527c8a/54d77827ebd1433689804f7cf2219831';
    return this.http.get(url);
  }
}
