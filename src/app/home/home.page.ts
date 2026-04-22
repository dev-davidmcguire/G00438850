import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
//Importing MovieService to access API methods.
import { MovieService } from '../services/movie';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class HomePage implements OnInit {

  //Store movies returned from API in an array.
  movies: any[] = [];

  //MovieService injected via constructor.
  constructor(private movieService: MovieService) { }

  //ngOnInit runs after the page loads, when the template is ready.
  ngOnInit() {
    //Call getTrending(), returns observable. we subscribe to it to get the data.
    //data.results is the array of movies returned.
    this.movieService.getTrending().subscribe((data: any) => {
      this.movies = data.results;
    })
  }

}
