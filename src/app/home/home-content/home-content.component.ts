import { Component } from "@angular/core";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { Observable } from "rxjs";
import { map, shareReplay } from "rxjs/operators";
import { AngularFireDatabase, AngularFireList } from "@angular/fire/database";
import { FirebaseService } from "../../service/firebase.service";
import { LocalStorageService } from "src/app/service/local-storage.service";
import { Router } from '@angular/router';
export interface Order {
  orderid: string;
  detail: string;
  laundry: string;
  num: number;
  price: string;
  place: string;
  status: string;
  store: string;
  userid: string;
  storeid: string;
}
@Component({
  selector: "app-home-content",
  templateUrl: "./home-content.component.html",
  styleUrls: ["./home-content.component.css"]
})
export class HomeContentComponent {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  orderList: AngularFireList<any>;
  newOrder = 0;
  order = [];
  constructor(
    private breakpointObserver: BreakpointObserver,
    public db: AngularFireDatabase,
    private firebaseService: FirebaseService,
    private localStorageService: LocalStorageService,
    private router: Router
  ) {
    this.countNumberNewOrder();
  }
  countNumberNewOrder() {
    this.orderList = this.db.list("order");

    this.orderList.snapshotChanges().subscribe(actions => {
      actions.forEach(action => {
        let userId = action.key;
        let orderQuery = this.db.list("order/" + userId);
        orderQuery.snapshotChanges().subscribe(orders => {
          orders.forEach(order => {
            let orderJson = order.payload.toJSON() as Order;
            if (
              orderJson.status == "wait" &&
              orderJson.storeid == this.localStorageService.getUId()
            ) {
              this.newOrder += 1;
            }
          });
        });
      });
    });
  }
  logout() {
    this.firebaseService.laundryAccount = null
    this.localStorageService.setUId(null)
    this.router.navigate(['login-store'])
  }
}
