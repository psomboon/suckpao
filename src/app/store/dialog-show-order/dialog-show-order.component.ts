import { Component, OnInit, Inject } from "@angular/core";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from "@angular/material/dialog";
import {
  AngularFireStorage,
  AngularFireStorageReference
} from "@angular/fire/storage";
import { AngularFireList, AngularFireDatabase } from "@angular/fire/database";

export interface Order {
  orderid: string;
  detail: string;
  laundry: string;
  num: number;
  price: number;
  place: string;
  status: string;
  store: string;
  userid: string;
  address: string;
  name: string;
  storeid: string;
  date: string;
}

export interface ReceiveData {
  order: [Order];
  date: Date;
}

@Component({
  selector: "app-dialog-show-order",
  templateUrl: "./dialog-show-order.component.html",
  styleUrls: ["./dialog-show-order.component.css"]
})
export class DialogShowOrderComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DialogShowOrderComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ReceiveData,
    private db: AngularFireDatabase
  ) {
    let date = new Date(this.data.date);
    this.monthYear = this.mapMonth(date.getMonth() + 1) + " " + String(date.getFullYear() + 543)
  }
  monthYear: string;
  ngOnInit() {}

  mapMonth(month) {
    switch (month) {
      case 1:
        return "มกราคม";
      case 2:
        return "กุมภาพันธ์";
      case 3:
        return "มีนาคม";
      case 4:
        return "เมษายน";
      case 5:
        return "พฤษภาคม";
      case 6:
        return "มิถุนายน";
      case 7:
        return "กรกฎาคม";
      case 8:
        return "สิงหาคม";
      case 9:
        return "กันยายน";
      case 10:
        return "ตุลาคม";
      case 11:
        return "พฤศจิกายน";
      case 12:
        return "ธันวาคม";
    }
  }
}
