import { Routes } from '@angular/router';

export const routes: Routes = [
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
  {
    path: 'favourites',
    loadComponent: () => import('./favourites/favourites.page').then( m => m.FavouritesPage)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  }
];
