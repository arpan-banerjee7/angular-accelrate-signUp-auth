import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthService } from "../auth-service/auth.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-log-in",
  templateUrl: "./log-in.component.html",
  styleUrls: ["./log-in.component.css"],
})
export class LogInComponent implements OnInit {
  signUpForm: FormGroup;
  isLoading: Boolean = false;
  error: string = null;
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.signUpForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null),
    });
  }
  onSubmit() {
    if (!this.signUpForm.valid) {
      return;
    }
    const email = this.signUpForm.value.email;
    const password = this.signUpForm.value.password;
    //console.log(this.signUpForm.value.userName);
    this.isLoading = true;
    this.authService.login(email, password).subscribe(
      (data) => {
        console.log(data);
        this.isLoading = false;
        this.router.navigate(["/welcome"]);
      },
      (errorMessage: any) => {
        console.log(errorMessage);
        this.error = errorMessage;
        this.isLoading = false;
      }
    );

    this.signUpForm.reset();
  }
}
