// import { tryCatch } from 'rxjs/util/tryCatch';
import { Injectable } from '@angular/core';
import { Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import { contentHeaders, apiBaseUrl} from '../components/config/config';

let apiUrl = apiBaseUrl;

/*
  Generated class for the RavenProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class Raven {

  public headers;
  public res;
  public appType;
  
  constructor(public http: Http) {
    this.headers = contentHeaders
  }

  setHeaders(user) {
    if(!this.headers.has('mobile'))
      this.headers.append('mobile', user.mobileNumber);

    if(this.headers.has('mobileNumber'))
        this.headers.delete('mobileNumber')    
    
      this.headers.append('mobileNumber', user.mobileNumber);    
    
    if(!this.headers.has('app-key'))
      this.headers.append('app-key', user.appKey);
  }

  addRaven(user, data) {
    this.setHeaders(user);
    return new Promise((resolve, reject) =>{
      this.http.post(apiBaseUrl + '/raven' + user.mobileNumber + '/app' + this.appType,
      JSON.stringify({data:data}), {headers : this.headers})
  //      .timeout(3000)
        .subscribe(res => {
          this.res = res.json();
          resolve(this.res); 
        }, (err) => {reject(err)}
      )
    });
  }

  updateRaven(user, data, ravenId) {
    this.setHeaders(user);
    if(this.headers.has('raven-id'))
    this.headers.delete('raven-id')    

  this.headers.append('raven-id', ravenId);
    return new Promise((resolve, reject) =>{
      this.http.put(apiBaseUrl + 'raven/' + user.mobile + '/app/' + user.appType, 
      JSON.stringify({data:data}),{headers : this.headers})
     //   .timeout(3000)
        .subscribe(res => {
          this.res = res.json();
          resolve(this.res); 
        }, (err) => {reject(err)}
      )
    });    
  }

  getRaven(user, data) {
    this.setHeaders(user);
    return new Promise((resolve, reject) =>{
      this.http.get(apiBaseUrl + '/raven/' + user.mobileNumber + '/app' + this.appType,
              {headers : this.headers})
   //     .timeout(3000)
        .subscribe(res => {
          this.res = res.json();
          resolve(this.res); 
        }, (err) => {reject(err)}
      )
    });
  }

}
