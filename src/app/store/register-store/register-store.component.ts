import { Component, OnInit } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import * as firebase from "firebase/app";
import { Router, ActivatedRoute } from "@angular/router";
@Component({
  selector: "app-register-store",
  templateUrl: "./register-store.component.html",
  styleUrls: ["./register-store.component.css"]
})
export class RegisterStoreComponent implements OnInit {
  email: string;
  password: string;
  confirmpassword: string;

  constructor(public afAuth: AngularFireAuth, private router: Router) {}

  ngOnInit() {}

  doRegister() {
    if (this.email === undefined || this.email === "") {
      alert("Please enter email");
    } else if (this.password === undefined || this.password === "") {
      alert("Please enter password");
    } else if (
      this.confirmpassword === undefined ||
      this.confirmpassword === ""
    ) {
      alert("Please enter confirm password");
    } else if (this.confirmpassword !== this.password) {
      alert("Password not match");
    } else {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(response => {
          alert("Register successfully!");
          this.router.navigate(["/register-laundry", response.user.uid]);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
}
