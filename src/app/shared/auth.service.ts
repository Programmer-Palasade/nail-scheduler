import { Injectable, OnDestroy, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { Auth, User, user, signInWithPopup, GoogleAuthProvider, signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, confirmPasswordReset } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy {

  private auth = inject(Auth);
  private router = inject(Router);
  private google_provider = new GoogleAuthProvider();

  public user!: User|null;
  private readonly userDisposable: Subscription|undefined;

  public logged_in = false;

  //Temporary View Mode Logic (Prototype Purpose Only)
  public viewMode: string = "Business";

  toggleView(){
    if(this.viewMode == "Business"){
      this.viewMode = "Customer";
    }
    else{
      this.viewMode = "Business";
    }

    this.router.navigate(['home']);
  }

  constructor() {
    this.google_provider.addScope('email');
    this.google_provider.addScope('profile');
    if (this.auth) {
      this.userDisposable = user(this.auth).subscribe(u => {
        this.logged_in = (u != null);
        this.user = u;
        if (!this.logged_in) {
          // logged in stuff here
        }
      });
    }
   }

   ngOnDestroy(): void {
     this.userDisposable?.unsubscribe();
   }

   async login_email(email: string, password: string) {
    return await signInWithEmailAndPassword(this.auth, email, password)
    .catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      alert(errorMessage);
      console.log(error);
    });;
   }

   async login_google() {
    return await signInWithPopup(this.auth, this.google_provider);
   }

   async signup_email(email: string, password: string) {
    return await createUserWithEmailAndPassword(this.auth, email, password)
    .catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      alert(errorMessage);
      console.log(error);
    });
   }

   async logout() {
    return await signOut(this.auth);
   }

   async passwordReset(email: string) {
    return await sendPasswordResetEmail(this.auth, email)
  }
}
