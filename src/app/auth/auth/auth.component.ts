import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: "app-signin",
  templateUrl: "./auth.component.html",
  styleUrls: ["./auth.component.scss", "../../styles/dialog.scss"]
})
export class AuthComponent implements OnInit {
  userForm: FormGroup;
  email: FormControl;
  password: FormControl;
  error: string;

  constructor(private router: Router, private auth: AuthService) {}

  ngOnInit() {
    this.createFormControls();
    this.createForm();
  }

  createFormControls() {
    this.email = new FormControl("", [
      Validators.required,
      Validators.pattern("[^ @]*@[^ @]*")
    ]);
    this.password = new FormControl("", [
      Validators.required,
      Validators.minLength(8)
    ]);
  }

  createForm() {
    this.userForm = new FormGroup({
      email: this.email,
      password: this.password
    });
    this.userForm.valueChanges.subscribe(str => {
      this.error = "";
    });
  }

  signInWithGoogle() {
    this.error = "";
    this.auth
      .signInWithGoogle()
      .then(() => this.afterSignIn())
      .catch(error => {
        console.log(error);
        this.error = error;
      });
  }

  signInWithEmail() {
    this.auth
      .signInRegular(
        this.userForm.value["email"],
        this.userForm.value["password"]
      )
      .then(() => this.afterSignIn())
      .catch(error => {
        this.error = error;
      });
  }

  signUp() {
    this.auth
      .emailSignUp(
        this.userForm.value["email"],
        this.userForm.value["password"]
      )
      .then(() => this.afterSignIn())
      .catch(error => {
        this.error = error;
      });
  }

  login() {
    this.signInWithEmail();
  }

  register() {
    this.signUp();
  }

  private afterSignIn() {
    this.router.navigate(["main"]);
  }
}
