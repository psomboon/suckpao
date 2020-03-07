import { Component, OnInit } from "@angular/core";
import { AngularFireList, AngularFireDatabase } from "@angular/fire/database";
import { MatDialog } from "@angular/material/dialog";
import { DialogTotalAmountLaundryComponent } from "../../dialog-total-amount-laundry/dialog-total-amount-laundry.component";
import { from } from "rxjs";
import { DialogTotalAmountBikerComponent } from 'src/app/dialog-total-amount-biker/dialog-total-amount-biker.component';

export interface Biker {
  address: string;
  birthday: string;
  email: string;
  fname: string;
  lname: string;
  personid: string;
  phone: string;
  profilePicture: string;
  key: string;
}

@Component({
  selector: "app-total-amount-biker",
  templateUrl: "./total-amount-biker.component.html",
  styleUrls: ["./total-amount-biker.component.css"]
})
export class TotalAmountBikerComponent implements OnInit {
  constructor(private db: AngularFireDatabase, private dialog: MatDialog) {
    this.bikerDB = this.db.list("registerbiker");
    this.bikerDB.snapshotChanges().subscribe(actions => {
      actions.forEach(biker => {
        let temp = biker.payload.toJSON() as Biker;
        temp.key = biker.key;
        this.bikers.push(temp);
      });
    });
  }

  bikerDB: AngularFireList<any>;
  bikers = [];

  ngOnInit() {}
  openDialog(bikerid) {
    const dialogRef = this.dialog.open(DialogTotalAmountBikerComponent, {
      data: {
        bikerid: bikerid
      }
    });
    dialogRef.afterClosed().subscribe(result => {});
  }
}
