import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.page.html',
  styleUrls: ['./movie-details.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class MovieDetailsPage implements OnInit {
  //Hold movie id from URL route param. string | null = param.get() can return null if param is missing.
  movieId: string | null = null;
  overview: string = '';

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    //Subscribe to route param changes. Fires on load and navigates to same component with different id (one movie to another)
    this.route.paramMap.subscribe(params => {
      this.movieId = params.get('id');
      console.log('Movie id from route param:', this.movieId);
    });

    //Read the overview passed from home page via router state. No second API call needed as Home had it from trending/search.
    this.overview = history.state.overview;
    console.log('Overview from router state:', this.overview);
  }

}
