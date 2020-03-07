import { Component, OnInit } from "@angular/core";
import { AngularFireDatabase, AngularFireList } from "@angular/fire/database";
import { Observable, from } from "rxjs";
import { FirebaseService } from "../../service/firebase.service"
import { LocalStorageService } from 'src/app/service/local-storage.service';

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
  address: string;
  name: string;
  storeid: string;
  date: string
}

export interface User {
  address: string;
  email: string;
  lastname: string;
  name: string;
  profileImageUrl: string;
  uid: string;
  username: string;
}
@Component({
  selector: "app-testfirebase",
  templateUrl: "./testfirebase.component.html",
  styleUrls: ["./testfirebase.component.css"]
})
export class TestfirebaseComponent {
  order = [];
  orderList: AngularFireList<any>;
  userList: AngularFireList<any>;
  user: User;
  date = new Date();
  start = new Date(this.date.getFullYear(), this.date.getMonth(), 1);
  end = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0);
  constructor(public db: AngularFireDatabase, private firebaseService: FirebaseService, private localStorageService: LocalStorageService) {
    this.orderList = db.list("order");

    this.orderList.snapshotChanges().subscribe(actions => {
      actions.forEach(action => {
        let userId = action.key;
        this.userList = db.list(`Users/${userId}`);
        this.userList.snapshotChanges().subscribe(users => {
          let name = ""
          let address = ""
          users.forEach(user => {
            if (user.key === "address") {
              address = String(user.payload.toJSON())
            }
            if (user.key === "name") {
              name = String(user.payload.toJSON())
            }  
          });
          let orderQuery = db.list("order/" + userId);
          orderQuery.snapshotChanges().subscribe(orders => {
            orders.forEach(order => {
              let orderJson = order.payload.toJSON() as Order;

              if (orderJson.status == "In progress" && orderJson.storeid == this.localStorageService.getUId() && this.checkRangeDate(orderJson.date, this.start, this.end)) {
                orderJson.address = address
                orderJson.name = name
                this.order.push(orderJson);
              }
            });
          });
        });
      });
    });
  }

  checkRangeDate(date, start, end) {
    if (new Date(date) >= new Date(start) && new Date(date) <= new Date(end)) {
      return true;
    }
    return false;
  }
}
