import { Component, OnInit, Inject } from "@angular/core";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from "@angular/material/dialog";
import { ListItemClass } from "./list-biker.component";
import {
  AngularFireDatabase,
  AngularFireList,
} from "@angular/fire/database";
import {
  AngularFireStorage,
  AngularFireStorageReference,
} from "@angular/fire/storage";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
@Component({
  selector: "app-dialog-biker",
  templateUrl: "./dialog-biker.component.html",
  styleUrls: ["./dialog-biker.component.css"]
})
export class DialogBikerComponent implements OnInit {
  registersList: AngularFireList<any>;
  itemArray = [];
  registers: Observable<any[]>;

  refPersonal: AngularFireStorageReference;
  isUploadingPersonal = false;
  isUploadPersonalCompleted = false;
  personalUrl: Observable<string>;

  fname;
  lname;
  personid;
  birthday;
  address;
  phone;
  email;
  emails;
  password;
  profileUrl;
  isHavePic = false;

  constructor(
    private storage: AngularFireStorage,
    public dialogRef: MatDialogRef<DialogBikerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ListItemClass,
    public db: AngularFireDatabase
  ) {
    this.registersList = db.list("registerbiker");
    this.registers = this.registersList
      .snapshotChanges()
      .pipe(
        map(changes =>
          changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
        )
      );

    this.fname = this.data.fname; //ฝั่งซ้ายคือตัวที่เซตไว้ข้างบน ฝั่งขวาคือตัวที่รับค่ามาจาก list-laundry.component.ts
    this.lname = this.data.lname;
    this.personid = this.data.personid;
    this.birthday = this.data.birthday;
    this.address = this.data.address;
    this.phone = this.data.phone;
    this.email = this.data.email;
    this.emails = this.data.emails;
    this.password = this.data.password;
    this.profileUrl = this.data.profileUrl;

    if (this.profileUrl !== undefined && this.profileUrl !== "") {
      this.isHavePic = true;
    }
  }

  submit() {
    this.registersList.update(this.data.$key, {
      fname: this.fname,
      lname: this.lname,
      personid: this.personid,
      birthday: this.birthday,
      address: this.address,
      phone: this.phone,
      email: this.email,
      emails: this.emails,
      password: this.password,
      profileUrl: this.profileUrl
    });
    window.location.reload();
  }

  uploadPersonal(event) {
    this.isUploadingPersonal = true;
    const id = Math.random()
      .toString(36)
      .substring(2);
    this.refPersonal = this.storage.ref("Biker/" + id);
    this.refPersonal.put(event.target.files[0]).then(() => {
      this.refPersonal.getDownloadURL().subscribe(url => {
        this.profileUrl = url;
        this.isUploadingPersonal = false;
        this.isUploadPersonalCompleted = true;
      });
    });
  }

  ngOnInit() {}
}
