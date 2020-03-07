import { Component, OnInit } from '@angular/core';
import * as firebase from "firebase/app";
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css']
})
export class LoginAdminComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    
  }

  email: string;
  password: string;

  login() {
    console.log(this.email, this.password)
    if (this.email === undefined || this.email === "" || this.email === null) {
      alert("Please enter email")
    } else if (this.password === undefined || this.password === "" || this.password === null) {
      alert("Please enter password")
    } else {
      firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(res => {
        alert("Login Successfully!")
        this.router.navigate(["menu-admin"])
      }).catch(err => {
        alert("Can not login, " + err.message)
      })
    }
  }
}
