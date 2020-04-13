import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthService } from "../auth-service/auth.service";

@Component({
  selector: "app-sign-up",
  templateUrl: "./sign-up.component.html",
  styleUrls: ["./sign-up.component.css"],
})
export class SignUpComponent implements OnInit {
  genders = ["Male", "Female"];
  signUpForm: FormGroup;
  isLoading: Boolean = false;
  error: string = null;
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.signUpForm = new FormGroup({
      userName: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
      ]),
      dateOfBirth: new FormControl(null, Validators.required),
      gender: new FormControl("Male"),
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
    this.authService.signup(email, password).subscribe(
      (data) => {
        console.log(data);
        this.isLoading = false;
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
