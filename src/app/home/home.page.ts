import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonButton, IonRouterLink, IonIcon, IonList, IonCard, IonCardContent, IonInput, IonItem } from '@ionic/angular/standalone';
//Importing MovieService to access API methods.
import { MovieService } from '../services/movie';
//Allows for use of icons in the template
import { addIcons } from 'ionicons';
import { heart } from 'ionicons/icons';
//Button navigation didnt work with just IonRouterLink. routerLink = directive used in templates with [routerLink]
//Router - service for navigation (this.router.navigate)
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButtons, IonButton, IonRouterLink, RouterLink, IonIcon, IonList, IonCard, IonCardContent, IonInput, IonItem]
})
export class HomePage implements OnInit {

  //Store movies returned from API in an array.
  movies: any[] = [];

  //Stores text that user types in the searchbar. Two-way binding with ngModel for real time sync with input field.
  searchQuery: string = '';

  //Label for currently displayed movies. Seperate from searchQuery so the heading matches whats on screen.
  displayedQuery: string = '';

  //Dependency Injection - gives us instances of MovieService and Router.
  //Services injected here, not in imports array.
  constructor(private movieService: MovieService, private router: Router) { 

    addIcons({heart});

  }

  //ngOnInit runs after the page loads, when the template is ready.
  ngOnInit() {
    //Call getTrending(), returns observable. we subscribe to it to get the data.
    //data.results is the array of movies returned.
    this.movieService.getTrending().subscribe((data: any) => {
      this.movies = data.results;
    })
  }

  //navigate to movie details for the clicked movie using Router service.
  //pass the id in the url as a route param. Overview travels along router state - dont have to make another api call.
  goToMovie(id: number, overview: string, title: string, posterPath: string) {
    this.router.navigate(['/movie-details', id], { 
      state: { 
        overview: overview,
        title: title,
        posterPath: posterPath
   }
  });
  }

  //Called when search button is clicked, sends users query to MovieService.searchMovies().
  //Subscribes to observable, replaces movie array with search results.
  onSearch() {

    //Trim once and reuse
    const query = this.searchQuery.trim();

    //If user clicks search with nothing or only spaces, show trending movies.
    if (query === '' ) {
      this.movieService.getTrending().subscribe((data: any) => {
          this.movies = data.results;

          //Reset heading label, empty returns trending.
          this.displayedQuery = '';

      });

      //Send the trimmed query to TMDB
    } else {
      this.movieService.searchMovies(query).subscribe((data: any) => {
        this.movies = data.results;
        //Update heading label - the term that was searched.
        //inside .subscribe() so the heading does not update before the movies are returned.
        this.displayedQuery = query;

    });

    }
  }
}
