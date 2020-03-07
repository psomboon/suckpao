import { Component, OnInit } from "@angular/core";
import { AngularFireDatabase, AngularFireList } from "@angular/fire/database";
import { Observable } from "rxjs";
import { Router } from "@angular/router"
import {
  AngularFireStorage,
  AngularFireStorageReference,
} from "@angular/fire/storage";
import {
  FormControl
} from "@angular/forms";
import * as firebase from "firebase/app";
@Component({
  selector: "app-register-laundry",
  templateUrl: "./register-laundry.component.html",
  styleUrls: ["./register-laundry.component.css"]
})
export class RegisterLaundryComponent implements OnInit {
  refStore: AngularFireStorageReference;
  refPersonal: AngularFireStorageReference;

  latitude = 14.911911099999998;
  longitude = 102.0077748;
  latitudeee: number;
  longitudeee: number;
  locationChosen = false;

  lat: any;
  lng: any;

  profileUrl: Observable<string>;
  storeUrl: Observable<string>;
  isUploadingStore = false;
  isUploadStoreComplete = false;
  isUploadingPersonal = false;
  isUploadPersonalCompleted = false;

  onChoseLocation(event) {
    this.latitude = event.coords.lat;
    this.longitude = event.coords.lng;
    this.locationChosen = true;
  }

  latt: number;
  logt: number;
  date = new FormControl(new Date());
  serializedDate = new FormControl(new Date().toISOString());

  longitudes = this.longitude;
  latitudes = this.latitude;
  public fname: string;
  public lname: string;
  public personid: string;
  public birthday: string;
  public phone: string;
  public address: string;
  public email: string;
  public emails: string;
  public password: string;
  public namestore: string;
  public about: string;
  public time: string;
  public addressstore: string;
  longitudess: number;
  latitudess: number;
  registersList: any;

  constructor(
    public db: AngularFireDatabase,
    private storage: AngularFireStorage,
    private router: Router
  ) {}

  data = {
    fname: "",
    lname: "",
    personid: "",
    birthday: "",
    phone: "",
    address: "",
    email: "",
    emails: "",
    password: "",
    confirmpassword: "",
    namestore: "",
    about: "",
    time: "",
    addressstore: "",
    longitudess: this.longitude,
    latitudess: this.latitude
  };
  insertregister(uid) {
    this.data.longitudess = this.longitude;
    this.data.latitudess = this.latitude;
    this.registersList = this.db.list("registerlaundry");

    this.registersList.set(uid, {
      fname: this.data.fname,
      lname: this.data.lname,
      personid: this.data.personid,
      birthday: this.data.birthday.toString(),
      phone: this.data.phone,
      address: this.data.address,
      email: this.data.email,
      emails: this.data.emails,
      password: this.data.password,
      namestore: this.data.namestore,
      about: this.data.about,
      time: this.data.time,
      addressstore: this.data.addressstore,
      longitudess: this.data.longitudess,
      latitudess: this.data.latitudess,
      profilePicture: this.profileUrl,
      storePicture: this.storeUrl
    });
    alert("Register successfully!");
    this.router.navigate(["home-content", uid])
  }

  ngOnInit() {
    this.fname = "somporn";
  }

  upload(event) {
    this.isUploadingPersonal = true;
    const id = Math.random()
      .toString(36)
      .substring(2);
    this.refPersonal = this.storage.ref("Laundry/" + id);
    this.refPersonal.put(event.target.files[0]).then(() => {
      this.refPersonal.getDownloadURL().subscribe(url => {
        this.profileUrl = url;
        this.isUploadingPersonal = false;
        this.isUploadPersonalCompleted = true;
      });
    });
  }
  uploadStore(event) {
    this.isUploadingStore = true;
    const id = Math.random()
      .toString(36)
      .substring(2);
    this.refStore = this.storage.ref("Laundry/" + id);
    this.refStore.put(event.target.files[0]).then(() => {
      this.refStore.getDownloadURL().subscribe(url => {
        this.storeUrl = url;
        this.isUploadingStore = false;
        this.isUploadStoreComplete = true;
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
    } else {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.data.email, this.data.password)
        .then(response => {
          this.insertregister(response.user.uid);
        })
        .catch(error => {
        });
    }
  }
}
