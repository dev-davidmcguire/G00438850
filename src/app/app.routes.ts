import { Routes } from '@angular/router';

export const routes: Routes = [
  //Home page, default landing page
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  //Movie Details page. :id is the movies TMDB id.
  {
    path: 'movie-details/:id',
    loadComponent: () => import('./movie-details/movie-details.page').then( m => m.MovieDetailsPage)
  },
  //Details page. :id is the persons TMDB id.
  {
    path: 'details/:id',
    loadComponent: () => import('./details/details.page').then( m => m.DetailsPage)
  },
  //Favourites page, shows favourited movies
  {
    path: 'favourites',
    loadComponent: () => import('./favourites/favourites.page').then( m => m.FavouritesPage)
  },
   //Automatically redirects to home page if a specific page is not specified
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  }
];
