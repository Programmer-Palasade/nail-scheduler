import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideNativeDateAdapter } from '@angular/material/core';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(), provideFirebaseApp(() => initializeApp({"projectId":"nail-scheduler-b173e","appId":"1:809173400999:web:0f958130d2ef37f22fca82","storageBucket":"nail-scheduler-b173e.appspot.com","apiKey":"AIzaSyAAGUV--LqHlwL6b72Z11BWmbV4Wv_jUOk","authDomain":"nail-scheduler-b173e.firebaseapp.com","messagingSenderId":"809173400999"})), provideAuth(() => getAuth()), provideFirestore(() => getFirestore()), provideAnimationsAsync(), provideNativeDateAdapter()]
};
