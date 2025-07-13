import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { provideCloudinaryLoader } from '@angular/common';
import { routes } from './app/app.routes';
import { NgSelectModule } from '@ng-select/ng-select';



bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideRouter(routes),
    importProvidersFrom(
      NgSelectModule,    // ng-select
      FormsModule        // Para ngModel[]
    ),
    provideCloudinaryLoader('https://res.cloudinary.com/TU_CLOUD_NAME')
  ],
}).catch(err => console.error(err));
