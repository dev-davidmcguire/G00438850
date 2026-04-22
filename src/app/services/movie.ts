import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  
  //TMDB Api key, used in API calls
  private apiKey = '4bd9c0636d66d9e3e86c0be1dc1be680';

  //HttpClient injected using the constructor, this is how services are injected.
  constructor(private http: HttpClient) {}

  //Returns an observable of trending movies, wont get until it is subscribed to.
  getTrending() {
    return this.http.get(`https://api.themoviedb.org/3/trending/movie/day?api_key=${this.apiKey}`);
  }

}
