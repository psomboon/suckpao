import { Component, OnInit } from "@angular/core";
import { AngularFireList, AngularFireDatabase } from "@angular/fire/database";
import { MatDialog } from "@angular/material/dialog";
import { DialogTotalAmountLaundryComponent } from "../../dialog-total-amount-laundry/dialog-total-amount-laundry.component"
import { from } from "rxjs";
export interface Income {
  namestore: string;
  addess: string;
  key: string;
  phone: string;
  email: string;
}
@Component({
  selector: "app-total-amount",
  templateUrl: "./total-amount.component.html",
  styleUrls: ["./total-amount.component.css"]
})
export class TotalAmountComponent implements OnInit {
  constructor(private db: AngularFireDatabase, private dialog: MatDialog) {}

  incomeList: AngularFireList<any>;
  incomes = [];
  ngOnInit() {
    this.incomeList = this.db.list("registerlaundry");
    this.incomeList.snapshotChanges().subscribe(actions => {
      actions.forEach(income => {
        let temp = income.payload.toJSON() as Income;
        temp.key = income.key;
        this.incomes.push(temp);
      });
    });
    console.log(this.incomes);
  }
  openDialog(key, namestore) {
    const dialogRef = this.dialog.open(DialogTotalAmountLaundryComponent, {
      data: {
        key: key,
        namestore: namestore
      }
    });
    dialogRef.afterClosed().subscribe(result => {});
  }
}
