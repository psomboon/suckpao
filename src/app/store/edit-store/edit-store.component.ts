import { Component, OnInit } from "@angular/core";
import { FirebaseService } from "src/app/service/firebase.service";
import { FormControl } from "@angular/forms";
import { AngularFireList, AngularFireDatabase } from "@angular/fire/database";
import {
  AngularFireStorage,
  AngularFireStorageReference
} from "@angular/fire/storage";
import { LocalStorageService } from "src/app/service/local-storage.service";
@Component({
  selector: "app-edit-store",
  templateUrl: "./edit-store.component.html",
  styleUrls: ["./edit-store.component.css"]
})
export class EditStoreComponent implements OnInit {
  constructor(
    private firebaseService: FirebaseService,
    private storage: AngularFireStorage,
    private db: AngularFireDatabase,
    private localStorageService: LocalStorageService
  ) {
    this.registersList = db.list("registerlaundry");
  }
  registersList: AngularFireList<any>;
  fname: string;
  lname: string;
  personid: string;
  birthdate: FormControl;
  phone: string;
  address: string;
  email: string;
  profilePicture: string;

  refPersonal: AngularFireStorageReference;
  isUploadingPersonal = false;
  isUploadPersonalCompleted = false;
  isHavePic = false;

  ngOnInit() {
    this.getData();
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

  edit() {
    this.registersList.update(this.localStorageService.getUId(), {
      fname: this.fname,
      lname: this.lname,
      personid: this.personid,
      birthday: this.birthdate.value,
      phone: this.phone,
      address: this.address,
      email: this.email,
      profilePicture: this.profilePicture
    });
    window.location.reload();
  }

  getData() {
    if (this.firebaseService.laundryAccount === undefined) {
      setTimeout(() => {
        this.getData();
      }, 500);
    } else {
      this.fname = this.firebaseService.laundryAccount.fname;
      this.lname = this.firebaseService.laundryAccount.lname;
      this.personid = this.firebaseService.laundryAccount.personid;
      this.birthdate = new FormControl(
        new Date(this.firebaseService.laundryAccount.birthday)
      );
      this.phone = this.firebaseService.laundryAccount.phone;
      this.address = this.firebaseService.laundryAccount.address;
      this.email = this.firebaseService.laundryAccount.email;
      this.profilePicture = this.firebaseService.laundryAccount.profilePicture;

      if (this.profilePicture !== undefined && this.profilePicture !== "") {
        this.isHavePic = true;
      }
    }
  }
}
