import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonButton, IonRouterLink, IonIcon, IonList, IonCard, IonCardContent } from '@ionic/angular/standalone';
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
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButtons, IonButton, IonRouterLink, RouterLink, IonIcon, IonList, IonCard, IonCardContent]
})
export class HomePage implements OnInit {

  //Store movies returned from API in an array.
  movies: any[] = [];

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
  //passes movies TMDB id as router param. Matches id: in app.routes.ts
  goToMovie(id: number) {
    this.router.navigate(['/movie-details', id])
  }

}
