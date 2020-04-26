import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
} from "@angular/forms";
import { AuthService } from "../auth-service/auth.service";

@Component({
  selector: "app-sign-up",
  templateUrl: "./sign-up.component.html",
  styleUrls: ["./sign-up.component.css"],
})
export class SignUpComponent implements OnInit {
  genders = ["Male", "Female"];

  isLoading: Boolean = false;
  error: string = null;
  hasSignedUp: Boolean = false;

  //assigning controls individually so that we can directly reference it in the template
  signUpForm: FormGroup;
  signUpFormGroup: FormGroup;
  formGroup: FormGroup;
  password: AbstractControl;
  confirmPassword: AbstractControl;
  userName: AbstractControl;
  email: AbstractControl;
  dateOfBirth: AbstractControl;
  gender: AbstractControl;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.userName = new FormControl("Arpan", Validators.required);
    this.email = new FormControl(null, [Validators.required, Validators.email]);
    this.dateOfBirth = new FormControl(null, Validators.required);
    this.gender = new FormControl("Male");
    this.password = new FormControl(null, [
      Validators.required,
      Validators.minLength(8),
    ]);
    this.confirmPassword = new FormControl(null, Validators.required);
    this.formGroup = new FormGroup(
      {
        password: this.password,
        confirmPassword: this.confirmPassword,
      },
      {
        validators: this.matchPassword,
      }
    );

    this.signUpForm = new FormGroup({
      userName: this.userName,
      email: this.email,
      dateOfBirth: this.dateOfBirth,
      gender: this.gender,
      passwordGroup: this.formGroup,
    });

    // this.signUpForm = new FormGroup({
    //   userName: new FormControl(null, Validators.required),
    //   email: new FormControl(null, [Validators.required, Validators.email]),
    //   passwordGroup: new FormGroup(
    //     {
    //       password: new FormControl(null, [
    //         Validators.required,
    //         Validators.minLength(8),
    //       ]),
    //       confirmPassword: new FormControl(null, Validators.required),
    //     }{
    //       validator: this.matchPassword
    //   }
    //   ),
    //   dateOfBirth: new FormControl(null, Validators.required),
    //   gender: new FormControl("Male"),
    // });
  }
  onSubmit() {
    if (!this.signUpForm.valid) {
      return;
    }
    const email = this.signUpForm.value.email;
    const password = this.signUpForm.value.passwordGroup.password;
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
    this.hasSignedUp = true;
    console.log(this.hasSignedUp);
    this.signUpForm.reset();
  }

  // matchPassword(
  //   controlGroup: AbstractControl
  // ): { [k: string]: boolean } | null {
  //   const password = controlGroup.get("password");
  //   const confirmPassword = controlGroup.get("confirmPassword");
  //   if (password != confirmPassword) {
  //     return { passwordMismacth: true };
  //   }
  //   return null;
  // }

  matchPassword = (group: FormGroup): { [s: string]: boolean } => {
    return group.value.password === group.value.confirmPassword
      ? null
      : { unmatched: true };
  };
}
