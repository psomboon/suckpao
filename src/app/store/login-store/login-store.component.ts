import { Component, OnInit } from "@angular/core";
import { AngularFireList, AngularFireDatabase } from "@angular/fire/database";
import { FirebaseService } from "../../service/firebase.service";
import { from } from "rxjs";
export interface LaundryAccount {
  email: String;
  password: String;
}
@Component({
  selector: "app-login-store",
  templateUrl: "./login-store.component.html",
  styleUrls: ["./login-store.component.css"]
})
export class LoginStoreComponent implements OnInit {
  hide: any;
  employee: Array<any>;
  id: String;
  NewPassword: String;

  username: string;
  password: string;
  laundryAccount: AngularFireList<any>;

  constructor(
    public db: AngularFireDatabase,
    private firebaseService: FirebaseService
  ) {}

  ngOnInit() {}
  login() {
    if (
      this.username === undefined ||
      this.password === undefined ||
      this.password === "" ||
      this.username === ""
    ) {
      alert("Please enter username and password");
    } else {
      this.firebaseService.signInWithEmailAndPassword(
        this.username,
        this.password
      );
    }
  }
}
