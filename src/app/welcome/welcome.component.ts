import { Component, OnInit, OnDestroy } from "@angular/core";
import { AuthService } from "../auth-service/auth.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-welcome",
  templateUrl: "./welcome.component.html",
  styleUrls: ["./welcome.component.css"],
})
export class WelcomeComponent implements OnInit, OnDestroy {
  isAuthenticated: Boolean = false;
  //managing custom observables and subscriptions
  private userSub: Subscription;
  constructor(private authService: AuthService) {}

  ngOnInit() {
    /*whenever user logs in/logs out our subject emits
    an observable*/
    this.userSub = this.authService.user.subscribe((user) => {
      /*if there is a user object(means the user is logged in)
       then set it to true(using truthy/falsey values)*/
      this.isAuthenticated = !!user;
    });
  }
  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
  logOut() {
    this.authService.logout();
  }
}
