import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject
} from "@angular/fire/database";
import { DialogBikerComponent } from "./dialog-biker.component";

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
  address: string;
  phone: string;
  email: string;
  emails: string;
  password: string;
  profileUrl: String;
}

@Component({
  selector: "app-list-biker",
  templateUrl: "./list-biker.component.html",
  styleUrls: ["./list-biker.component.css"]
})
export class ListBikerComponent implements OnInit {
  itemArray = [];
  registersList: AngularFireList<any>;
  registers: any[];

  constructor(public db: AngularFireDatabase, public dialog: MatDialog) {
    this.registersList = db.list("registerbiker");

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
    address,
    phone,
    email,
    emails,
    password,
    profileUrl
  ): void {
    const dialogRef = this.dialog.open(DialogBikerComponent, {
      data: {
        $key: $key,
        fname: fname,
        lname: lname,
        personid: personid,
        birthday: birthday,
        address: address,
        phone: phone,
        email: email,
        emails: emails,
        password: password,
        profileUrl: profileUrl
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
    addressstore,
    phone,
    email,
    emails,
    password
  ) {
  }

  onDelete($key) {
    this.registersList.remove($key);
    this.itemArray = [];
  }
}
