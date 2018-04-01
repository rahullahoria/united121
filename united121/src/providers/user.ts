import { tryCatch } from 'rxjs/util/tryCatch';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Component, ElementRef } from '@angular/core';
import { contentHeaders, apiBaseUrl } from '../components/config/config';



declare var Peer: any;

let apiUrl = apiBaseUrl + "users/";



@Injectable()
export class User {

  public res: { status: { code: any, message: any }, data: any };
  public mobile: any;
  public otp: any;
  public headers: any;

  
  constructor(public http: Http) {

    this.headers = contentHeaders;

  }

  public userInfo: any;

  login(data) {
    console.log("login data: ", JSON.stringify(data));
    console.log(this.appType);

    return new Promise((resolve, reject) => {

      if (!this.headers.has('app-type'))
        this.headers.append('app-type', this.appType);
      if (!this.headers.has('mobile'))
        this.headers.append('mobile', data.mobile);
      if (!this.headers.has('password'))
        this.headers.append('password', data.password);

    
        if (!this.headers.has('user-type'))
          this.headers.append('user-type', 'surveyor');
        console.log("inside promise.....", this.appType);
        console.log("this.headers::::::::::::::::::::", JSON.stringify(this.headers));

        this.http.post(apiBaseUrl + 'users/' + data.mobile + "/auth", JSON.stringify(data), { headers: this.headers })
          .subscribe(res => {
            this.res = res.json();
            console.log("SIT login api resp::::", this.res);
            if (this.res.status.code == 200) {
              console.log("this.res: ", JSON.stringify(this.res));
              this.appKey = this.res.data.appKey;
              this.userInfo = this.res.data;
              this.mobile = this.res.data.mobileNumber;
              console.log('app-key', this.appKey);
              resolve(this.res);
            }
            else {
              reject(this.res);
            }

          }, (err) => {
            reject(err);
            console.log("iniside err: ", JSON.stringify(err));
          });
      
    });
  }

appType= "";
appKey = "";

  updateUser(data) {

    console.log("updateUser input data inside:::::::::::::::::::::::::::", JSON.stringify(data), "this.mobile:::::::", this.mobile);
    this.setHeaders();
    return new Promise((resolve, reject) => {
      this.http.put(apiUrl + this.mobile, JSON.stringify(data), { headers: this.headers })
        .subscribe(res => {
          this.res = res.json();
          console.log("response", JSON.stringify(this.res));

          resolve(this.res);

        }, (err) => {
          console.log("response", JSON.stringify(err));
          reject(err);
        });
    });

  }

  auth(data) {
    console.log("auth input data inside:::::::::::::::::::::::::::::::::", JSON.stringify(data));
    if (!this.headers.has('app-type'))
      this.headers.append('app-type', this.appType);

    return new Promise((resolve, reject) => {

      this.http.post(apiUrl, JSON.stringify(data), { headers: this.headers })
        .subscribe(res => {
          this.res = res.json();
          console.log("response", JSON.stringify(this.res));

          resolve(this.res);

        }, (err) => {
          console.log("response", JSON.stringify(err));
          reject(err);
        });
    });

  }

  //post on mobile
  verifyOTP(data) {
    if ((this.mobile + "").length <= 10)
      this.mobile = "91" + data.mobile;
    if (!this.headers.has('app-type'))
      this.headers.append('app-type', this.appType);
    if (this.headers.has('mobile'))
      this.headers.delete('mobile');
    this.headers.append('mobile', this.mobile);

    console.log(apiUrl + this.mobile + '/auth?type=otp', JSON.stringify(data))
    return new Promise((resolve, reject) => {

      this.http.post(apiUrl + this.mobile + '/auth?type=otp', JSON.stringify(data), { headers: this.headers })
        .subscribe(res => {
          console.log("VERIFY OTP ==> ", res, res.json());
          this.res = res.json();
          //this.appKey = this.res.data.appKey;

          //console.log(this.mobile,apiUrl + this.mobile + '/verify-otp');

          resolve(this.res);

        }, (err) => {
          reject(err);
        });
    });
  }


  getUserLocationFromIP(ip) {
    return new Promise((resolve, reject) => {
      this.http.get(
        apiBaseUrl + 'ip_locations/'
      )
        .subscribe(res => {
          this.res = res.json();
          resolve(this.res);
        }, (err) => { reject(err); });
    });
  }

  setHeaders() {
    let temp_mobile = this.mobile + "";
    if (temp_mobile.length <= 10)
      this.mobile = "91" + this.mobile;
    if (!this.headers.has('mobile'))
      this.headers.append('mobile', this.mobile);
    if (!this.headers.has('app-key'))
      this.headers.append('app-key', this.appKey);
    console.log(this.headers);
  }


}
