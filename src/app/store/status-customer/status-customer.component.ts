import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject
} from "@angular/fire/database";
import { FirebaseService } from "../../service/firebase.service"
import { LocalStorageService } from 'src/app/service/local-storage.service';
export interface Order {
  orderid: string;
  detail: string;
  laundry: string;
  num: number;
  price: string;
  latitude: string;
  longitude: string;
  status: string;
  store: string;
  userid: string;
  storeid: string;
}

@Component({
  selector: "app-status-customer",
  templateUrl: "./status-customer.component.html",
  styleUrls: ["./status-customer.component.css"]
})
export class StatusCustomerComponent implements OnInit {
  ngOnInit() {}
  orderList: AngularFireList<any>;
  orderSelect: any;
  order = [];

  items: Observable<any[]>;
  users: Observable<any[]>;
  itemsRef: AngularFireList<any>;
  usersRef: AngularFireList<any>;
  constructor(public db: AngularFireDatabase, private firebaseService: FirebaseService, private localStorageService: LocalStorageService) {
    this.orderList = db.list("order");
  
    this.orderList.snapshotChanges().subscribe(actions => {
      actions.forEach(action => {
        let userId = action.key;
        let orderQuery = db.list("order/" + userId);
        orderQuery.snapshotChanges().subscribe(orders => {
          orders.forEach(order => {
            let orderJson = order.payload.toJSON() as Order;
            if (orderJson.status == "wait" && orderJson.storeid == this.localStorageService.getUId()) {
              if (orderJson.laundry == "รีด") {
                orderJson.price = String(orderJson.num * 9);
              } else {
                orderJson.price = String(orderJson.num * 7);
              }
              this.order.push(orderJson);
            }
          });
        });
      });
    });
  }

  status(userid, orderid, price) {
    let orderUpdate = this.db.list(`order/${userid}`)
    orderUpdate.update(orderid, {
      status: "In progress",
      price: price
    });
    location.reload()
  }
}
