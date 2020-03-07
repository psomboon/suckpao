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

export interface BikerIncome {
  amountorder: number;
  totalmoney: number;
  bikerid: string;
  date: string;
  key: string;
  income: number;
}

export interface ReceiveDate {
  bikerid: string;
}

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
  bikerid: string;
}
@Component({
  selector: "app-dialog-total-amount-biker",
  templateUrl: "./dialog-total-amount-biker.component.html",
  styleUrls: ["./dialog-total-amount-biker.component.css"]
})
export class DialogTotalAmountBikerComponent implements OnInit {
  acceptOrderList: AngularFireList<any>;
  incomeBikerList: AngularFireList<any>;
  currentDate: string;
  orders = [];
  bikerIncomes = [];
  date = new Date();
  start = new Date(this.date.getFullYear(), this.date.getMonth(), 1);
  end = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0);
  constructor(
    public dialogRef: MatDialogRef<DialogTotalAmountBikerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ReceiveDate,
    private db: AngularFireDatabase
  ) {
    this.acceptOrderList = this.db.list(`acceptOrders/${this.data.bikerid}`);
    this.acceptOrderList.snapshotChanges().subscribe(actions => {
      actions.forEach(orders => {
        let temp = orders.payload.toJSON() as Order;
        if (this.checkRangeDate(temp.date, this.start, this.end)) {
          this.orders.push(temp);
        }
      });
    });
    this.getIncomeBiker();
    this.currentDate =
      this.date.getDay() + " เดือน " + this.getMonthAndYear(this.date);
  }

  ngOnInit() {}

  summary() {
    if (!this.orders.length) {
      alert("ไม่มี order ที่ทำรายการเสร็จสิ้นในเดือนนี้");
    } else {
      let totalmoney = 0;
      let amountorder = 0;
      this.orders.forEach(order => {
        totalmoney += Number(order.price);
        amountorder += 1;
      });
      let isAddIncome = false;
      this.bikerIncomes.forEach(income => {
        if (this.checkRangeDate(income.date, this.start, this.end)) {
          this.incomeBikerList.set(income.key, {
            amountorder: amountorder,
            totalmoney: totalmoney,
            date: String(new Date()),
            bikerid: this.data.bikerid,
            income: amountorder * 40
          });
          isAddIncome = true;
        }
      });
      if (!isAddIncome) {
        this.incomeBikerList.push({
          amountorder: amountorder,
          totalmoney: totalmoney,
          bikerid: this.data.bikerid,
          date: String(new Date()),
          income: amountorder * 40
        });
      }
      this.dialogRef.close();
    }
  }

  checkRangeDate(date, start, end) {
    if (new Date(date) >= new Date(start) && new Date(date) <= new Date(end)) {
      return true;
    }
    return false;
  }

  getMonthAndYear(date) {
    let newDate = new Date(date);
    return (
      this.mapMonth(newDate.getMonth() + 1) +
      " ปี " +
      String(newDate.getFullYear() + 543)
    );
  }

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

  getIncomeBiker() {
    this.incomeBikerList = this.db.list("incomebiker");
    this.incomeBikerList.snapshotChanges().subscribe(actions => {
      actions.forEach(incomeBiker => {
        let temp = incomeBiker.payload.toJSON() as BikerIncome;
        if (temp.bikerid === this.data.bikerid) {
          temp.key = incomeBiker.key;
          this.bikerIncomes.push(temp);
        }
      });
    });
  }
}
