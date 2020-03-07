import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AngularFireDatabase } from "@angular/fire/database";
import { LocalStorageService } from "./local-storage.service";
import * as firebase from "firebase/app";
export interface LaundryAccount {
  email: string;
  uid: string;
  fname: string;
  lname: string;
  personid: string;
  birthday: string;
  phone: string;
  address: string;
  profilePicture: string;
  password: string;
  namestore: string;
}
@Injectable({
  providedIn: "root"
})
export class FirebaseService {
  constructor(
    public db: AngularFireDatabase,
    private router: Router,
    private localStorageService: LocalStorageService
  ) {
    console.log("Calling");
    if (
      (this.localStorageService.getUId() !== undefined ||
        this.localStorageService.getUId() !== null) &&
      this.laundryAccount === undefined
    ) {
      this.getLaundrayAccount();
    }
  }

  laundry = this.db.list("registerlaundry");
  laundryAccount: LaundryAccount;
  signInWithEmailAndPassword(email, password) {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(res => {
        alert("Login successfully!");
        let sub = this.laundry.snapshotChanges().subscribe(actions => {
          actions.forEach(action => {
            let laundry = action.payload.toJSON() as LaundryAccount;
            if (laundry.email === email && password === laundry.password) {
              this.localStorageService.setUId(action.key);
              this.laundryAccount = laundry;
              sub.unsubscribe()
              this.router.navigate(["status-customer"]);
            }
          });
        });
      }).catch(err => {
        alert("Login failed, " + err.message)
      });
  }
  getLaundrayAccount() {
    this.laundry.snapshotChanges().subscribe(actions => {
      actions.forEach(action => {
        let laundry = action.payload.toJSON() as LaundryAccount;
        if (action.key === this.localStorageService.getUId()) {
          this.laundryAccount = laundry;
        }
      });
    });
  }
}
