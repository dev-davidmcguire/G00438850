import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonButtons, IonIcon } from '@ionic/angular/standalone';
import { MovieService } from '../services/movie';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { home, heart } from 'ionicons/icons';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, IonButtons, IonIcon]
})
export class DetailsPage implements OnInit {

  //holds data from getPerson()
  person: any = null;

  //holds data from getPersonMovieCredits
  credits: any[] = [];

  constructor(private movieService: MovieService, 
    private route: ActivatedRoute,
    private router: Router) {
      addIcons({ home, heart });
     }

  ngOnInit() {
    //Subscribe to route param changes, fires on page load and navigation between 2 person pages.
    this.route.paramMap.subscribe(params => {
      const personId = Number(params.get('id'));
      console.log('Person id from route param:', personId);

      //fetches data of a person,(name, dob, biography, etc).
      this.movieService.getPerson(personId).subscribe((data: any) => {
        //saves data from a person so it can be rendered by template
        this.person = data;
      });

      //fetches movie credits of a person.
      this.movieService.getPersonMovieCredits(personId).subscribe((data: any) => {
        //saves cast array, movies a person appeared in.
        this.credits = data.cast;
      });
    });
  }
  goToHome() {
    //Navigate to home page.
    this.router.navigate(['/home']);
  }
  goToFavourites() {
    this.router.navigate(['/favourites']);
  }
}
