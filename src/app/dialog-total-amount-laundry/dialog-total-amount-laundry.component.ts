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

export interface Income {
  amountorder: number;
  totalmoney: number;
  namelaundry: string;
  date: string;
  storeid: string;
  key: string;
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
}

export interface ReceiveData {
  key: string;
  namestore: string;
}

@Component({
  selector: "app-dialog-total-amount-laundry",
  templateUrl: "./dialog-total-amount-laundry.component.html",
  styleUrls: ["./dialog-total-amount-laundry.component.css"]
})
export class DialogTotalAmountLaundryComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DialogTotalAmountLaundryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ReceiveData,
    private db: AngularFireDatabase
  ) {
    this.incomeList = this.db.list("Incomelaundry");
    this.incomeList.snapshotChanges().subscribe(actions => {
      actions.forEach(income => {
        let temp = income.payload.toJSON() as Income;
        if (temp.storeid === this.data.key) {
          let date = new Date(temp.date);
          temp.key = income.key;
          temp.date =
            this.mapMonth(date.getMonth() + 1) + " ปี " + date.getFullYear();
          this.incomes.push(temp);
        }
      });
    });
    this.getOrder();
    this.currentDate = new Date().toDateString()
  }
  currentDate: string
  incomeList: AngularFireList<any>;
  orderList: AngularFireList<any>;
  incomes = [];
  orders = [];
  ngOnInit() {}

  mapMonth(month) {
    switch (month) {
      case 1:
        return "January";
      case 2:
        return "Februry";
      case 3:
        return "March";
      case 4:
        return "April";
      case 5:
        return "May";
      case 6:
        return "June";
      case 7:
        return "July";
      case 8:
        return "August";
      case 9:
        return "September";
      case 10:
        return "October";
      case 11:
        return "November";
      case 12:
        return "December";
    }
  }
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
      this.incomes.forEach(income => {
        if (this.checkSameMonth(income.date)) {
          this.incomeList.set(income.key, {
            amountorder: amountorder,
            totalmoney: totalmoney,
            namelaundry: this.data.namestore,
            date: String(new Date()),
            storeid: this.data.key
          });
          isAddIncome = true;
        }
      });
      if (!isAddIncome) {
        this.incomeList.push({
          amountorder: amountorder,
          totalmoney: totalmoney,
          namelaundry: this.data.namestore,
          date: String(new Date()),
          storeid: this.data.key
        });
      }
    }
    this.dialogRef.close()
  }

  getOrder() {
    this.orderList = this.db.list("order");

    this.orderList.snapshotChanges().subscribe(actions => {
      actions.forEach(userid => {
        this.db
          .list(`order/${userid.key}`)
          .snapshotChanges()
          .subscribe(orders => {
            orders.forEach(order => {
              let tempOrder = order.payload.toJSON() as Order;
              let currentMonth = new Date().getMonth();
              if (
                tempOrder.storeid === this.data.key &&
                tempOrder.status === "finish" &&
                currentMonth === new Date(tempOrder.date).getMonth()
              ) {
                this.orders.push(tempOrder);
              }
            });
          });
      });
    });
  }
  checkSameMonth(monthIncome) {
    let date = new Date();
    let currentMonth =
      this.mapMonth(date.getMonth() + 1) + " ปี " + date.getFullYear();
    console.log(monthIncome, currentMonth);
    if (monthIncome === currentMonth) return true;
    else return false;
  }
}
