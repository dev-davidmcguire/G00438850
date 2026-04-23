import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonButton, IonRouterLink, IonIcon } from '@ionic/angular/standalone';
//Importing MovieService to access API methods.
import { MovieService } from '../services/movie';
//Allows for use of icons in the template
import { addIcons } from 'ionicons';
import { heart } from 'ionicons/icons';
//Button navigation didnt work with just IonRouterLink.
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButtons, IonButton, IonRouterLink, RouterLink, IonIcon]
})
export class HomePage implements OnInit {

  //Store movies returned from API in an array.
  movies: any[] = [];

  //MovieService injected via constructor.
  constructor(private movieService: MovieService) { 

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

}
