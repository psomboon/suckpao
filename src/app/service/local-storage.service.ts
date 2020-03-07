import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  setUId(uid) {
    localStorage.setItem("uid", uid)
  }

  getUId() {
    return localStorage.getItem("uid")
  }
}
