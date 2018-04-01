import { Component, ViewChild } from '@angular/core';
import {App, Platform, Nav} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { NativeStorage } from '@ionic-native/native-storage';
import { User } from '../providers/user';
import { HomePage } from '../pages/home/home';
import { AuthPage } from '../pages/auth/auth';

//import {ListPage} from '../pages/list/list';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;
  pages: Array<{title: string, component: any}>

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,public user: User,private nativeStorage: NativeStorage) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      this.nativeStorage.getItem("user").then(
        data => {
          console.log("user object", JSON.stringify(data));
          if (data && data.mobile) {
            this.user.mobile = data.mobile;
            this.user.appKey = data.appKey;
            this.user.otp = data.otp;
            this.user.userInfo = data.userInfo;
            this.user.appType = data.appType;

            this.goToPage(HomePage);

          } else {

            this.nav.setRoot(AuthPage);
          }
        },
        error => {
          console.error(error);
          this.nav.setRoot(AuthPage);
        }
      );

      this.pages = [
        { title: 'List', component: "logout" }
      ];

    });
  }

  goToPage(page) {

    this.nav.push(page, {
      user: this.user
    })
      .then(() => {
        //console.log("this.user in nativeStorage:::::::::::::::::::::::", this.user);

      });

  }
  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    
    this.nav.setRoot(page.component);
  }
}


