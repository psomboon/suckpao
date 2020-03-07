import { Component, OnInit, Inject } from "@angular/core";
import { Observable } from "rxjs";
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject
} from "@angular/fire/database";
import { DialogRegisterLaundryComponent } from "./dialog-register-laundry.component";

import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from "@angular/material/dialog";

export interface ListItemClass {
  $key: string;
  fname: string;
  lname: string;
  personid: string;
  birthday: string;
  phone: string;
  address: string;
  email: string;
  emails: string;
  password: string;
  namestore: string;
  about: string;
  time: string;
  addressstore: string;
  longitudess: number;
  latitudess: number;
  profilePicture: String;
  storePicture: String;
}

@Component({
  selector: "app-list-laundry",
  templateUrl: "./list-laundry.component.html",
  styleUrls: ["./list-laundry.component.css"]
})
export class ListLaundryComponent implements OnInit {
  itemArray = [];
  registersList: AngularFireList<any>;
  registers: any[];
  constructor(public db: AngularFireDatabase, public dialog: MatDialog) {
    this.registersList = db.list("registerlaundry");

    this.registersList.snapshotChanges().subscribe(action => {
      action.forEach(action => {
        let y = action.payload.toJSON();
        y["$key"] = action.key;
        this.itemArray.push(y as ListItemClass);
      });
    });
  }

  openDialog(
    $key,
    fname,
    lname,
    personid,
    birthday,
    phone,
    address,
    email,
    emails,
    password,
    namestore,
    about,
    time,
    addressstore,
    longitudess,
    latitudess,
    profilePicture,
    storePicture,
  ): void {
    const dialogRef = this.dialog.open(DialogRegisterLaundryComponent, {
      data: {
        $key: $key,
        fname: fname,
        lname: lname,
        personid: personid,
        birthday: birthday,
        phone: phone,
        address: address,
        email: email,
        emails: emails,
        password: password,
        namestore: namestore,
        about: about,
        time: time,
        addressstore: addressstore,
        longitudess: longitudess,
        latitudess: latitudess,
        profilePicture: profilePicture,
        storePicture: storePicture
      }
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  ngOnInit() {}

  onEdit(
    $key,
    fname,
    lname,
    personid,
    birthday,
    phone,
    addressstore,
    email,
    emails,
    password,
    about,
    addressstores,
    longitudess,
    latitudess
  ) {
  }

  onDelete($key) {
    this.registersList.remove($key);
    this.itemArray = [];
  }
}
