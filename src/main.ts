import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
//No app.config.ts, importing here for now
//Ionic 7.2.0 uses main.ts instead of app.config.ts for app configuration
import { provideHttpClient } from '@angular/common/http';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';

//Starts the application using AppComponent as the root.
bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    //Registers the app routes with preloading for faster navigation
    provideRouter(routes, withPreloading(PreloadAllModules)),
    //Added HttpClient so the MovieService can make api calls
    provideHttpClient(),
  ],
});
