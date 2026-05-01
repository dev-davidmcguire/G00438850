import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonImg, IonCardHeader, IonCardTitle, IonCardContent, IonButton } from '@ionic/angular/standalone';
import { MovieService } from '../services/movie';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.page.html',
  styleUrls: ['./favourites.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonCard, IonImg, IonCardHeader, IonCardTitle, IonCardContent, IonButton]
})
export class FavouritesPage implements OnInit {
  //Holds favourite movies read from localStorage. Template loops with ngFor
  favourites: any[] = [];

  //router to navigate to movie details page when details button is clicked
  constructor(private movieService: MovieService, private router: Router) { }

  ngOnInit() {
    //read favourites on page load. Synchronous, no subscribe.
    this.favourites = this.movieService.getFavourites();
    console.log('Favourites loaded:', this.favourites);
  }

  goToMovieDetails(movie: any) {
    //navigate to movie details, pass title, posterpath and overvier via router state, no second API call.
    this.router.navigate(['/movie-details', movie.id], {
      state: {
        title: movie.title,
        posterPath: movie.poster_path,
        overview: movie.overview
      }
    })
  }

}
