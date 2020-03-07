import { Component, OnInit } from "@angular/core";
import { AngularFireDatabase, AngularFireList } from "@angular/fire/database";
import { Observable } from "rxjs";
import {
  AngularFireStorage,
  AngularFireStorageReference
} from "@angular/fire/storage";
import * as firebase from "firebase/app";

import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from "@angular/forms";

@Component({
  selector: "app-biker",
  templateUrl: "./biker.component.html",
  styleUrls: ["./biker.component.css"]
})
export class BikerComponent implements OnInit {
  date = new FormControl(new Date());
  serializedDate = new FormControl(new Date().toISOString());

  refPersonal: AngularFireStorageReference;
  isUploadingPersonal = false;
  isUploadPersonalCompleted = false;
  personalUrl: Observable<string>;
  public fname: string;
  public lname: string;
  public personid: string;
  public birthday: string;
  public address: string;
  public phone: string;
  public email: string;
  public emails: string;
  public password: string;

  registersList: any;

  constructor(
    public db: AngularFireDatabase,
    private storage: AngularFireStorage
  ) {
    this.registersList = db.list("registerbiker");
  }

  data = {
    fname: "",
    lname: "",
    personid: "",
    birthday: "",
    address: "",
    phone: "",
    email: "",
    emails: "",
    password: "",
    confirmpassword: ""
  };
  insertregister(uid) {
    this.registersList.set(uid, {
      fname: this.data.fname,
      lname: this.data.lname,
      personid: this.data.personid,
      birthday: this.data.birthday.toString(),
      address: this.data.address,
      phone: this.data.phone,
      email: this.data.email,
      emails: this.data.emails,
      password: this.data.password,
      profileUrl: this.personalUrl
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
        this.personalUrl = url;
        this.isUploadingPersonal = false;
        this.isUploadPersonalCompleted = true;
      });
    });
  }

  doRegister() {
    if (this.data.emails === undefined || this.data.emails === "") {
      alert("Please enter email");
    } else if (this.data.password === undefined || this.data.password === "") {
      alert("Please enter password");
    } else if (
      this.data.confirmpassword === undefined ||
      this.data.confirmpassword === ""
    ) {
      alert("Please enter confirm password");
    } else if (this.data.confirmpassword !== this.data.password) {
      alert("Password not match");
    } else if (this.personalUrl === null || this.personalUrl === undefined) {
      alert("Please choose your profile image");
    } else {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.data.emails, this.data.password)
        .then(response => {
          this.insertregister(response.user.uid);
        })
        .catch(error => {
          alert(error.message);
        });
    }
  }

  ngOnInit() {}
}
