import { Component, OnInit } from "@angular/core";
import { AngularFireDatabase, AngularFireList } from "@angular/fire/database";
import { MatDialog } from "@angular/material/dialog";
import { FirebaseService } from "../../service/firebase.service";
import { DialogShowOrderComponent } from "../dialog-show-order/dialog-show-order.component";
import { LocalStorageService } from "src/app/service/local-storage.service";
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
  latitude: string;
  longitude: string;
  status: string;
  store: string;
  userid: string;
  date: Date;
  storeid: string;
}
@Component({
  selector: "app-status-money",
  templateUrl: "./status-money.component.html",
  styleUrls: ["./status-money.component.css"]
})
export class StatusMoneyComponent implements OnInit {
  ngOnInit() {}
  orderList: AngularFireList<any>;
  incomeList: AngularFireList<any>;
  order = [];
  incomes = [];
  allOrders = [];
  date = new Date();
  start = new Date(this.date.getFullYear(), this.date.getMonth(), 1);
  end = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0);
  constructor(
    public db: AngularFireDatabase,
    private firebaseService: FirebaseService,
    private localStorageService: LocalStorageService,
    private dialog: MatDialog
  ) {
    this.orderList = db.list("order");
    this.incomeList = this.db.list("Incomelaundry");

    this.orderList.snapshotChanges().subscribe(actions => {
      actions.forEach(action => {
        let userId = action.key;
        let orderQuery = db.list("order/" + userId);
        orderQuery.snapshotChanges().subscribe(orders => {
          orders.forEach(order => {
            let orderJson = order.payload.toJSON() as Order;
            let date = new Date();

            if (this.checkRangeDate(orderJson.date, this.start, this.end)) {
              if (
                orderJson.status === "In progress" &&
                orderJson.storeid === this.localStorageService.getUId()
              ) {
                if (orderJson.laundry === "รีด") {
                  orderJson.price = orderJson.num * 9;
                } else {
                  orderJson.price = orderJson.num * 7;
                }
                this.order.push(orderJson);
              }
            }
            this.allOrders.push(orderJson);
          });
        });
      });
    });

    this.incomeList.snapshotChanges().subscribe(actions => {
      actions.forEach(income => {
        let tempIncome = income.payload.toJSON() as Income;
        if (tempIncome.storeid === localStorageService.getUId()) {
          tempIncome.key = income.key;
          this.incomes.push(tempIncome);
        }
      });
    });
  }
  status(userid, orderid, price) {
    let orderUpdate = this.db.list(`order/${userid}`);
    orderUpdate.update(orderid, {
      status: "finish"
    });

    if (this.incomes.length) {
      this.incomes.forEach(income => {
        if (this.checkRangeDate(income.date, this.start, this.end)) {
          income.amountorder += 1;
          income.totalmoney += Number(price);
          this.incomeList.set(income.key, {
            amountorder: income.amountorder,
            totalmoney: income.totalmoney,
            date: String(new Date()),
            storeid: this.localStorageService.getUId()
          });
        } else {
          this.incomeList.push({
            amountorder: income.amountorder,
            totalmoney: income.totalmoney,
            date: String(new Date()),
            namelaundry: this.firebaseService.laundryAccount.namestore,
            storeid: this.localStorageService.getUId()
          });
        }
      });
    } else {
      this.incomeList.push({
        amountorder: 1,
        totalmoney: price,
        date: String(new Date()),
        namelaundry: this.firebaseService.laundryAccount.namestore,
        storeid: this.localStorageService.getUId()
      });
    }
    location.reload();
  }

  showOrders(date, storeid) {
    let temporder = [];
    this.allOrders.forEach(order => {
      let orderDate = new Date(date);
      let startMonth = new Date(
        orderDate.getFullYear(),
        orderDate.getMonth(),
        1
      );
      let endMonth = new Date(
        orderDate.getFullYear(),
        orderDate.getMonth() + 1,
        0
      );
      if (
        this.checkRangeDate(order.date, startMonth, endMonth) &&
        order.storeid === storeid &&
        order.status === "finish"
      ) {
        temporder.push(order);
      }
    });
    const dialogRef = this.dialog.open(DialogShowOrderComponent, {
      data: {
        order: temporder,
        date: date,
      }
    });
    dialogRef.afterClosed().subscribe(result => {});
  }

  checkRangeDate(date, start, end) {
    if (new Date(date) >= new Date(start) && new Date(date) <= new Date(end)) {
      return true;
    }
    return false;
  }

  getMonthAndYear(date) {
    let newDate = new Date(date)
    return this.mapMonth(newDate.getMonth() + 1) + " ปี " + String(newDate.getFullYear() + 543)

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
}
