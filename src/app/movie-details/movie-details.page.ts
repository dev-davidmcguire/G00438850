import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonListHeader, IonLabel, IonItem, IonThumbnail, IonIcon, IonButton, IonButtons } from '@ionic/angular/standalone';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../services/movie';
import { addIcons } from 'ionicons';
import { home, heart } from 'ionicons/icons';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.page.html',
  styleUrls: ['./movie-details.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonList, IonListHeader, IonLabel, IonItem, IonThumbnail, IonIcon, IonButton, IonButtons]
})
export class MovieDetailsPage implements OnInit {
  //Hold movie id from URL route param. string | null = param.get() can return null if param is missing.
  movieId: string | null = null;
  overview: string = '';
  //Holds cast and crew arrays from getMovieCredits
  cast: any[] = [];
  crew: any[] = [];

  //Hardcoded - will replace with real localStorage check.
  isFavourite: boolean = false;

  //injected Activated route to read URL params, MovieService to call getMovieCredits.
  constructor(private route: ActivatedRoute, private movieService: MovieService, private router: Router) { 
    addIcons({ home, heart });
  }

  ngOnInit() {
    //Subscribe to route param changes. Fires on load and navigates to same component with different id (one movie to another)
    this.route.paramMap.subscribe(params => {
      this.movieId = params.get('id');
      console.log('Movie id from route param:', this.movieId);

      //Fetch cast and crew when we have the id - Number() converts string id from URL to number API expects.
      this.movieService.getMovieCredits(Number(this.movieId)).subscribe((data: any) => {
        //Save cast/crew arrays to class property so the template can render using *ngFor.
        this.cast = data.cast;
        this.crew = data.crew;
        console.log('Cast Received:', this.cast);
        console.log('Crew Received:', this.crew);
      })
    });

    //Read the overview passed from home page via router state. No second API call needed as Home had it from trending/search.
    this.overview = history.state.overview;
    console.log('Overview from router state:', this.overview);
  }

  goToPerson(personId: number) {
    //Navigate to details page using persons TMDB id as route param
    this.router.navigate(['/details', personId]);
  }

  goToHome() {
    //Navigate to home page.
    this.router.navigate(['/home']);
  }

  goToFavourites() {
    this.router.navigate(['/favourites']);
  }

  toggleFavourite() {
    //Stub. TODO - implement add/removie and localStorage
    console.log('toggleFavourite clicked. isFavourite is currently:', this.isFavourite);
  }

}
