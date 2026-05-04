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

  //Asks TMDB to search for movies matching the text the user typed in.
  //Returns an Observable - the home page subscribes to get the actual results.
  searchMovies(query: string) {
    return this.http.get(`https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${this.apiKey}`);
  }

  //Fetch the cast and crew for a movie by its TMDB id.
  //Returns object with 3 keys: id, cast and crew.
  getMovieCredits(id: number) {
    return this.http.get(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${this.apiKey}`);
  }

  getFavourites(): any[] {
    //localStorage stores strings only - parse JSON array
    const stored = localStorage.getItem('favourites');
    return stored ? JSON.parse(stored) : [];
  }

  isFavourite(id: number): boolean {
    //ask getFavourites() for the stored array, check if any entries match this id.
    return this.getFavourites().some(fav => fav.id === id);
  }

  addFavourite(movie: any): void {
    //read current array, push new movie, write back to localStorage
    const favourites = this.getFavourites();
    favourites.push(movie);
    localStorage.setItem('favourites', JSON.stringify(favourites));
  }

  removeFavourite(id: number): void {
    //read current Array, filter out any entry with matching id, write back result
    const favourites = this.getFavourites().filter(fav => fav.id !== id);
    localStorage.setItem('favourites', JSON.stringify(favourites));
  }

  getPerson(id: number) {
    //Fetches details of a person by TMDB id, returns observable subscribed to by details page.
    return this.http.get(`https://api.themoviedb.org/3/person/${id}?api_key=${this.apiKey}`);
  }

  getPersonMovieCredits(id: number) {
    //Fetches the movie credits for a person, returns observable with an array of movies theyve apperared in.
    return this.http.get(`https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=${this.apiKey}`);
  }

  

}
