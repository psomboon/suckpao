import { Component, OnInit, Inject } from "@angular/core";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from "@angular/material/dialog";
import {FormControl} from '@angular/forms';
import { ListItemClass } from "./list-laundry.component";
import { AngularFireDatabase, AngularFireList } from "@angular/fire/database";
import {
  AngularFireStorage,
  AngularFireStorageReference
} from "@angular/fire/storage";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
@Component({
  selector: "app-dialog-register-laundry",
  templateUrl: "./dialog-register-laundry.component.html",
  styleUrls: ["./dialog-register-laundry.component.css"]
})
export class DialogRegisterLaundryComponent implements OnInit {
  registersList: AngularFireList<any>;
  itemArray = [];

  refPersonal: AngularFireStorageReference;
  isUploadingPersonal = false;
  isUploadPersonalCompleted = false;
  isHavePic = false;

  refStore: AngularFireStorageReference;
  isUploadingStore = false;
  isUploadStoreCompleted = false;
  isHaveStorePic = false;

  fname;
  lname;
  sig;
  birthdate;
  phone;
  address;
  email;
  emails;
  password;
  namestore;
  about;
  time;
  addressstore;
  profilePicture;
  storePicture;


  constructor(
    private storage: AngularFireStorage,
    public dialogRef: MatDialogRef<DialogRegisterLaundryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ListItemClass,
    public db: AngularFireDatabase
  ) {
    this.registersList = db.list("registerlaundry");

    this.fname = this.data.fname; //ฝั่งซ้ายคือตัวที่เซตไว้ข้างบน ฝั่งขวาคือตัวที่รับค่ามาจาก list-laundry.component.ts
    this.lname = this.data.lname;
    this.sig = this.data.personid;
    this.birthdate = new FormControl(new Date(this.data.birthday));
    this.phone = this.data.phone;
    this.address = this.data.address;
    this.email = this.data.email;
    this.emails = this.data.emails;
    this.password = this.data.password;
    this.namestore = this.data.namestore;
    this.about = this.data.about;
    this.time = this.data.time;
    this.addressstore = this.data.addressstore;
    this.profilePicture = this.data.profilePicture;
    this.storePicture = this.data.storePicture;
    if (this.profilePicture !== undefined && this.profilePicture !== "") {
      this.isHavePic = true;
    }

    if (this.storePicture !== undefined && this.storePicture !== "") {
      this.isHaveStorePic = true;
    }
  }

  submit() {
    this.registersList.update(this.data.$key, {
      fname: this.fname,
      lname: this.lname,
      sig: this.sig,
      birthday: this.birthdate.value,
      phone: this.phone,
      address: this.address,
      email: this.email,
      emails: this.emails,
      password: this.password,
      namestore: this.namestore,
      about: this.about,
      time: this.time,
      addressstore: this.addressstore,
      profilePicture: this.profilePicture,
      storePicture: this.storePicture
    });
    window.location.reload();
  }
  uploadPersonal(event) {
    this.isUploadingPersonal = true;
    const id = Math.random()
      .toString(36)
      .substring(2);
    this.refPersonal = this.storage.ref("Laundry/" + id);
    this.refPersonal.put(event.target.files[0]).then(() => {
      this.refPersonal.getDownloadURL().subscribe(url => {
        this.profilePicture = url;
        this.isUploadingPersonal = false;
        this.isUploadPersonalCompleted = true;
      });
    });
  }
  uploadStore(event) {
    this.isUploadingStore = true;
    const id = Math.random().toString(36).substring(2);
    this.refStore = this.storage.ref("Laundry/" + id);
    this.refStore.put(event.target.files[0]).then(() => {
      this.refStore.getDownloadURL().subscribe(url => {
        this.storePicture = url
        this.isUploadingStore = false
        this.isUploadStoreCompleted = true;
      });
    })
  } 
  ngOnInit() {}
}
